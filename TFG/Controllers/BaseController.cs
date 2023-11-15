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
            HttpContext.Items[key] = value;
        }

        protected object GetGlobalVariable(string key)
        {
            return HttpContext.Items[key];
        }

        public string GetUsername()
        {
            return (string)HttpContext.Items["user"];
        }
    }
}