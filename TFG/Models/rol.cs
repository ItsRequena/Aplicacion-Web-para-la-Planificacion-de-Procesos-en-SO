using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TFG.Models
{
    [Table("rol")]
    public class rol
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}