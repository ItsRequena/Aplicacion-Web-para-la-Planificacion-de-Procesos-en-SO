using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TFG.Models
{
    [Table("user")]
    public class user
    {
        public int id { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
            
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Rol { get; set; }
        public DateTime LastConexion { get; set; }
        public int Active { get; set; }

    }
}