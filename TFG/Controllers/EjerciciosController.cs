using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
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

                    var procesos = context.procesos.Select(p => new
                    {
                        EjercicioId = p.ejercicioId,
                        tiempoLlegada = p.tiempoLlegada,
                        rafaga = p.rafaga
                    }).ToList();

                    return Json( new { ejercicios = ejercicios, procesos = procesos }, JsonRequestBehavior.AllowGet);
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

        public ActionResult GuardarEjercicio(int heuristicaId, List<int> tllegadas, List<string> rafagas, int cuanto)
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {

                    //Revisión ejercicio
                    var ejercicioExistente = context.ejercicios.Where(u => u.numProcesos == tllegadas.Count() && u.heuristicaId == heuristicaId && u.cuanto == cuanto).FirstOrDefault();
                    if (ejercicioExistente != null)
                    {
                        bool existe = true;
                        for (int i = 0; i < tllegadas.Count; i++)
                        {
                            int tiempoLlegada = tllegadas[i];
                            string rafaga = rafagas[i];
                            var procesosExistente = context.procesos.Where(u => u.ejercicioId == ejercicioExistente.id && u.tiempoLlegada == tiempoLlegada && u.rafaga == rafaga).FirstOrDefault();
                            if (procesosExistente == null)
                            {
                                existe = false;
                                break;
                            }
                        }
                        if (existe)
                        {
                            return Json("1", JsonRequestBehavior.AllowGet);
                        }
                    }

                    var ejercicio = new ejercicios()
                    {
                        numProcesos = tllegadas.Count(),
                        heuristicaId = heuristicaId,
                        cuanto = cuanto,
                        profesor = 1,
                        uploadedBy = GetUsername(),
                    };
                    context.ejercicios.Add(ejercicio);
                    context.SaveChanges();

                    int idAsignado = ejercicio.id;

                    for (int i=0; i<tllegadas.Count; i++)
                    {
                        var proceso = new procesos()
                        {
                            ejercicioId = idAsignado,
                            tiempoLlegada = tllegadas[i],
                            rafaga = rafagas[i]
                        };
                        context.procesos.Add(proceso);
                        context.SaveChanges();
                    }

                    return Json("0", JsonRequestBehavior.AllowGet);
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

        public ActionResult EliminarEjercicio(int ejercicioId)
        {
            try
            {
                using (var context = new BBDDContext("mySqlConnection"))
                {
                    var procesos = context.procesos.Where(p => p.ejercicioId == ejercicioId).ToList();
                    foreach(var proceso in procesos)
                    {
                        context.procesos.Remove(proceso);
                        context.SaveChanges();
                    }

                    var ejercicio = context.ejercicios.Where(e => e.id == ejercicioId).FirstOrDefault();
                    context.ejercicios.Remove(ejercicio);
                    context.SaveChanges();

                    return Json("0", JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json("2", JsonRequestBehavior.AllowGet);
            }
        }

    }
}
