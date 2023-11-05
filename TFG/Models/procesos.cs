using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TFG.Models
{
    [Table("procesos")]
    public class procesos
    {
        public int id { get; set; }
        public int ejercicioId { get; set; }
        public int tiempoLlegada { get; set; }
        public int rafaga { get; set; }

    }
}