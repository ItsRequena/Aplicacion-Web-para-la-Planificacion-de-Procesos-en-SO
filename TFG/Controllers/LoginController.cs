using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TFG.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult index()
        {
            return View("~/Views/Login/Login.cshtml");
        }

        public ActionResult Login(string userName, string password)
        {
            //proceso de login...

            return View("~/Views/Login/Login.cshtml");
        }


        public ActionResult Register()
        {

            return View("~/Views/Login/Register.cshtml");
        }


        public ActionResult RegisterUser(string nombre, string apellidos, string userName, string correo, string password)
        {


            return View("~/Views/Login/Register.cshtml");
        }

        public ActionResult Menu()
        {
            return View("~/Views/Menu/Menu.cshtml");
        }

        public ActionResult Ejercicios()
        {
            return View("~/Views/Menu/Ejercicio.cshtml");
        }
    }
}