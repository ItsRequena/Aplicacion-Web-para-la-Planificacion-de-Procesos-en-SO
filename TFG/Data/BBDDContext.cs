using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TFG.Models;

namespace TFG.Data
{
    public class BBDDContext : DbContext
    {
        public BBDDContext(string connectionString) : base(connectionString)
        {
        }

        public DbSet<user> user { get; set; }
        public DbSet<rol> rol { get; set; }
        public DbSet<procesos> procesos { get; set; }
        public DbSet<heuristicas> heuristicas { get; set; }
        public DbSet<ejercicios> ejercicios { get; set; }
    }
}