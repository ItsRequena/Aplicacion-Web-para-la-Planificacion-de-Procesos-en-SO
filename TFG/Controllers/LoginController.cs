using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TFG.Data;
using TFG.Models;

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

    }
}