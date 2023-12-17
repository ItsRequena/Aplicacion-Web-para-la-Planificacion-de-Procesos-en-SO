using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Services.Description;
using TFG.Data;
using TFG.Models;

namespace TFG.Controllers
{
    public class EjerciciosController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult obtenerEjercicios()
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {
                    var ejercicios = context.ejercicios.Select(e => new
                    {
                        Id = e.id,
                        NumProcesos = e.numProcesos,
                        HeuristicasId = e.heuristicaId,
                        Subido = e.uploadedBy
                    }).ToList();
                    if (ejercicios == null)
                    {
                        return Json("1", JsonRequestBehavior.AllowGet);
                    }
                    return Json(ejercicios, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json("2", JsonRequestBehavior.AllowGet);
            }
        }

        public string ObtenerHeuristica(int heuristicaId)
        {
            var heuristica = "";
            switch (heuristicaId)
            {
                case 1:
                    heuristica = "FCFS";
                    break;
                case 2:
                    heuristica = "SJFcooperativo";
                    break;
                case 3:
                    heuristica = "SJFapropiativo";
                    break;
                case 4:
                    heuristica = "RR";
                    break;
                default:
                    break;
            }
            return heuristica;
        }


        public ActionResult ResolverEjercicioSeleccionado()
        {
            int ejercicioId = GetEjercicioId();
            return ResolverEjercicio(ejercicioId);
        }

        public ActionResult ResolverEjercicio(int ejercicioId)
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {
                    var ejercicios = context.ejercicios.Where(e => e.id == ejercicioId).FirstOrDefault();
                    var procesos = context.procesos.Where(p => p.ejercicioId == ejercicioId).ToList();

                    if (ejercicios == null)
                    {
                        return Json("1", JsonRequestBehavior.AllowGet);
                    }
                    return Json(new { ejercicios = ejercicios, procesos = procesos }, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json("2", JsonRequestBehavior.AllowGet);
            }

        }

        public void MostrarEjercicio(int ejercicioId)
        {
            SetGlobalVariable("ejercicioId", ejercicioId);
        }

    }
}
