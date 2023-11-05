using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TFG.Models
{
    public class BBDD
    {

        //Método para guardar cadena de conexión (Del Web.config) en un objeto llamado cn de tipo MySqlConnection
        public MySqlConnection getConnection()
        {
            MySqlConnection cn = new MySqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["mySqlConnection"].ConnectionString.ToString());
            return cn;
        }

    }
}