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
    public class BaseController : Controller
    {
        protected void SetGlobalVariable(string key, object value)
        {
            Session[key] = value;
        }

        protected object GetGlobalVariable(string key)
        {
            return HttpContext.Items[key];
        }

        public string GetUsername()
        {
            string key = "user";
            if (Session[key] != null)
            {
                return Session[key].ToString();
            }
            else
            {
                return null;
            }
        }


        #region REDIRECCIONES
        public ActionResult index()
        {
            return View("~/Views/Login/Login.cshtml");
        }
        public ActionResult Register()
        {
            return View("~/Views/Login/Register.cshtml");
        }
        #region HEURISTICAS
        public ActionResult Heuristicas()
        {
            return View("~/Views/Heuristicas/Heuristicas.cshtml");
        }
        public ActionResult FCFS()
        {
            return View("~/Views/Heuristicas/FCFS.cshtml");
        }
        public ActionResult SJF()
        {
            return View("~/Views/Heuristicas/SJF.cshtml");
        }
        public ActionResult RR()
        {
            return View("~/Views/Heuristicas/RR.cshtml");
        }
        #endregion
        public ActionResult Introduccion()
        {
            return View("~/Views/Menu/Introduccion.cshtml");
        }

        public ActionResult MenuPrincipal()
        {
            return View("~/Views/Menu/Index.cshtml");
        }

        public ActionResult Ejercicios()
        {
            return View("~/Views/Menu/Ejercicios.cshtml");
        }

        public ActionResult Menu()
        {
            return View("~/Views/Menu/Menu.cshtml");
        }
        #endregion
    }
}