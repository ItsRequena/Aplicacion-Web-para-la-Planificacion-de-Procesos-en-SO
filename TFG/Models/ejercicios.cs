using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TFG.Models
{
    [Table("ejercicios")]
    public class ejercicios
    {
        public int id { get; set; }
        public int numProcesos { get; set; }
        public int heuristicaId { get; set; }
            
        public int? cuanto { get; set; }
        public int profesor { get; set; }
        public string uploadedBy { get; set; }

    }
}