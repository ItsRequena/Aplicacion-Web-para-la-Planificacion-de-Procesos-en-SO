using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using TFG.Data;
using TFG.Models;
using System.Configuration;

namespace TFG.Controllers
{
    public class LoginController :  BaseController
    {
        public ActionResult Login(string userName, string password)
        {
            using (var context = new BBDDContext("mySqlConnection"))
            {
                string encryptPassword = Encrypt.GetSHA256(password);
                var user = context.user.Where(u => u.UserName == userName && u.Password == encryptPassword).FirstOrDefault();
                if (user == null)
                {
                    return Json("1", JsonRequestBehavior.AllowGet);
                }
                SetGlobalVariable("user", user.UserName);
                SetGlobalVariable("profesor", user.Rol != 1);
                return Json("0", JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult RegisterUser(string nombre, string apellidos, string userName, string correo, string password)
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {
                    var user = context.user.Where(u => u.UserName == userName).FirstOrDefault();
                    if (user != null)
                    {
                        return Json("1", JsonRequestBehavior.AllowGet);
                    }
                    var userEmail = context.user.Where(u => u.Email == correo).FirstOrDefault();
                    if (userEmail != null)
                    {
                        return Json("2", JsonRequestBehavior.AllowGet);
                    }

                    user nuevoUsuario = new user()
                    {
                        Nombre = nombre,
                        Apellidos = apellidos,
                        UserName = userName,
                        Email = correo,
                        Password = Encrypt.GetSHA256(password),
                        Rol = 1,
                        LastConexion = DateTime.Now,
                        Active = 1
                    };
                    context.user.Add(nuevoUsuario);
                    context.SaveChanges();
                }

                return Json("0", JsonRequestBehavior.AllowGet);
            }
            catch 
            {
                return Json("3", JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult CambiarPassword(string userName, string password, string newpassword)
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {

                    string encryptPassword = Encrypt.GetSHA256(password);
                    var user = context.user.Where(u => u.UserName == userName && u.Password == encryptPassword).FirstOrDefault();
                    if (user == null)
                    {
                        return Json("1", JsonRequestBehavior.AllowGet);
                    }
                    user.Password = Encrypt.GetSHA256(newpassword);
                    context.SaveChanges();
                }

                return Json("0", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("3", JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult RecuperarPassword(string userName, string email)
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {

                    var user = context.user.Where(u => u.UserName == userName && u.Email == email).FirstOrDefault();
                    if (user == null)
                    {
                        return Json("1", JsonRequestBehavior.AllowGet);
                    }

                    string nuevaContraseña = GenerateRandomPassword();

                    if (!SendEmail(email, nuevaContraseña))
                    {
                        return Json("3", JsonRequestBehavior.AllowGet);
                    }

                    user.Password = Encrypt.GetSHA256(nuevaContraseña);
                    context.SaveChanges();
                }

                return Json("0", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("3", JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult AsignarRolProfesor(string userName)
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {

                    var user = context.user.Where(u => u.UserName == userName).FirstOrDefault();
                    if (user == null)
                    {
                        return Json("1", JsonRequestBehavior.AllowGet);
                    }
                    user.Rol = 2;
                    context.SaveChanges();
                }

                return Json("0", JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json("3", JsonRequestBehavior.AllowGet);
            }

        }

        private static string GenerateRandomPassword()
        {
            Random random = new Random();

            int minLength = 8;
            int maxLength = 16;
            int length = random.Next(minLength, maxLength + 1);

            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!$%^&()_+-=[]|:',.?";
            StringBuilder password = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(chars.Length);
                password.Append(chars[index]);
            }

            return password.ToString();
        }
    
        private static bool SendEmail(string to, string password)
        {

            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {
                    var user = context.user.Where(u => u.UserName == "botCorreo").FirstOrDefault();

                    string subject = "Recuperación contraseña URJC procesos";

                    string body = "<p>Para recuperar la contraseña de tu cuenta, por favor accede a la aplicación con tu usuario junto con la contraseña adjuntada:</p>    <ul>        <li><strong>Contraseña:</strong> " + password + "</li>    </ul>   <p>Posteriormente, una vez dentro de la aplicación web, desde tu nombre de usuario en la opción 'Cambiar contraseña', puedes cambiar la contraseña.</p>";

                    string emailFrom = user.Email;
                    

                    SmtpClient client = new SmtpClient();
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.EnableSsl = true;
                    client.Host = "smtp.office365.com";
                    client.Port = 587;

                    System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["correo"].ToString(), ConfigurationManager.AppSettings["password"].ToString());
                    client.UseDefaultCredentials = false;
                    client.Credentials = credentials;

                    MailMessage msg = new MailMessage();
                    msg.From = new MailAddress(ConfigurationManager.AppSettings["correo"].ToString());
                    msg.Bcc.Add(new MailAddress(to));
                    msg.Subject = subject;
                    msg.IsBodyHtml = true;
                    msg.Body = body;

                    try
                    {
                        // Envío del correo
                        client.Send(msg);
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
            catch
            {
                return false;
            }
        }
    }
}