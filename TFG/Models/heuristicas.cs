using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TFG.Models
{
    [Table("heuristicas")]
    public class heuristicas
    {
        public int id { get; set; }
        public string heuristica { get; set; }
    }
}