using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TFG.Controllers
{
    public class MenuController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public Boolean FCFS(List<int> tllegada, List<List<int>> listaProcesos)
        {
            // Creamos e inicializamos el array de espera
            int[] espera = new int[tllegada.Count()];
            for(int i=0; i<tllegada.Count(); i++)
            {
                espera[i] = 0;
            }

            // Creamos e inicializamos el array de rafagas
            int[] nRafaga = new int[tllegada.Count()];
            for(int i=0; i<tllegada.Count(); i++)
            {
                nRafaga[i] = 0;
            }

            // Creamos e inicializamos el array de estados y la variable de enEjecucion
            int[] estado = new int[tllegada.Count()];
            int enEjecucion = -1;
            int LastEjecucion = -1;
            bool inicio = false;
            for(int i=0; i<tllegada.Count(); i++)
            {
                if (tllegada[i] == 0 && !inicio)
                {
                    estado[i] = 0;
                    enEjecucion = i;
                    inicio = true;
                }
                else if (tllegada[i] == 0 && inicio)
                {
                    estado[i] = 1;
                }
                else
                {
                    estado[i] = -1;
                }
            }

            // Creamos e inicalizamos las variables para la planificacion
            int tiempo = 0;
            bool fin = false;
            Dictionary<int, List<string>> solucion = new Dictionary<int, List<string>>();
            for(int i=0; i<tllegada.Count(); i++){
                //List<string> est = new List<string>();
                //est.Add(getEstado(estado[i]));
                solucion.Add(i, new List<string>());
            }


            while (!fin)
            {
                // PLANIFICACION
                 
                //1. Guardamos el estado actual de la planificacion
                if(tiempo != 0)
                {
                    for (int i = 0; i < tllegada.Count(); i++)
                    {
                        List<string> est = solucion[i];
                        if(est.Count() == 0)
                        {
                            est.Add(getEstado(estado[i]));
                        }
                        else if (est[est.Count()-1] != "T")
                        {
                            est.Add(getEstado(estado[i]));
                        }
                    }
                }
                //2. Actualizamos estado del proceso en ejecución
                LastEjecucion = enEjecucion;
                if(enEjecucion != -1)
                {
                    int rafagaProcesoEjecucion = nRafaga[enEjecucion];
                    List<int> rafagasEjecucion = listaProcesos[enEjecucion];
                    int rafagaEjecucion = Convert.ToInt32(rafagasEjecucion[rafagaProcesoEjecucion]);
                    if (rafagaEjecucion == 0)
                    {
                        nRafaga[enEjecucion] += 1;
                        if(nRafaga[enEjecucion] < rafagasEjecucion.Count() - 1)
                        {
                            estado[enEjecucion] = 2;
                            rafagasEjecucion[nRafaga[enEjecucion]] -= 10;
                        }
                        else
                        {
                            estado[enEjecucion] = 3;
                        }
                        enEjecucion = -1;
                    }
                    else
                    {
                        rafagasEjecucion[nRafaga[enEjecucion]] -= 10;
                    }
                }

                //3. Actualizamos array de espera, array de llegada y array de rafagas
                var actualizarEjecucion = -1;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    if (i != enEjecucion && LastEjecucion != i)
                    {
                        // proceso que aun no ha llegado
                        if (estado[i] == -1)
                        {
                            if (tllegada[i] == 0)
                            {
                                if ( enEjecucion == -1 ) // el proceso que se estaba ejecutando ha terminado
                                {
                                    int max = mayorEspera(espera);
                                    if (max == espera[i])
                                    {
                                        int rafagaProceso = nRafaga[i];
                                        List<int> rafagas = listaProcesos[i];
                                        int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                                        actualizarEjecucion = i;
                                        estado[i] = 0;
                                        rafagas[rafagaProceso] -= 10;
                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                        espera[i] += 10;
                                    }

                                }
                                else
                                {
                                    estado[i] = 1;
                                    espera[i] += 10;
                                }
                            }
                            else
                            {
                                tllegada[i] -= 10;
                            }
                        }
                        // proceso en ejecucion
                        else if (estado[i] == 0)
                        {
                            int rafagaProceso = nRafaga[i];
                            List<int> rafagas = listaProcesos[i];
                            int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                            // comprobamos si ha terminado la duracion de la rafaga
                            if (rafaga == 0)
                            {
                                nRafaga[i] += 1;
                                estado[i] = 2;
                                rafagas[nRafaga[i]] -= 10;
                            }
                            else
                            {
                                rafagas[rafagaProceso] -= 10;
                            }
                        }
                        // proceso en espera (listo)
                        else if (estado[i] == 1)
                        {
                            int rafagaProceso = nRafaga[i];
                            List<int> rafagas = listaProcesos[i];
                            int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                            if (enEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                            {
                                int max = mayorEspera(espera);
                                if (max == espera[i])
                                {
                                    estado[i] = 0;
                                    espera[i] = 0;
                                    actualizarEjecucion = i;
                                    if (nRafaga[i] != 0)
                                    {
                                        nRafaga[i] += 1;
                                        rafagas[nRafaga[i]] -= 10;
                                    }
                                }
                                else
                                {
                                    espera[i] += 10;
                                }

                            }
                            else
                            {
                                espera[i] += 10;
                            }
                        }
                        // proceso en disco
                        else if (estado[i] == 2)
                        {
                            int rafagaProceso = nRafaga[i];
                            List<int> rafagas = listaProcesos[i];
                            int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                            if (rafaga == 0)
                            {
                                //ultima rafaga
                                if (rafagaProceso == rafagas.Count())
                                {
                                    estado[i] = 3; // proceso terminado
                                }
                                else
                                {
                                    if (enEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                                    {
                                        int max = mayorEspera(espera);
                                        if (max == 0)
                                        {
                                            nRafaga[i] += 1;
                                            actualizarEjecucion = i;
                                            estado[i] = 0;
                                            espera[i] = 0;
                                            rafagas[nRafaga[i]] -= 10;
                                        }
                                        else
                                        {
                                            estado[i] = 1;
                                            espera[i] += 10;
                                        }

                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                        espera[i] += 10;
                                    }
                                }
                            }
                            else
                            {
                                rafagas[rafagaProceso] -= 10;
                            }
                        }
                    }
                }

                // actualizamos el valor enEjecucion
                if(actualizarEjecucion != -1)
                {
                    enEjecucion = actualizarEjecucion;
                }
                // 4. Comprobar si todos los procesos han terminado
                var comprobacion = true;
                for (int i=0; i<tllegada.Count(); i++)
                {
                    if(estado[i] != 3)
                    {
                        comprobacion = false;
                        break;
                    }
                }
                fin = comprobacion;
                tiempo += 1;
            }



            return true;
        }


        public string getEstado(int estado)
        {
            string valor = "";
            switch (estado)
            {
                case -1:
                    valor = "-";
                    break;
                case 0:
                    valor = "E";
                    break;
                case 1:
                    valor = "L";
                    break;
                case 2:
                    valor = "D";
                    break;
                case 3:
                    valor = "T";
                    break;

            }
            return valor;
        }

        public int mayorEspera(int[] esperas)
        {
            int max = 0;
            foreach (int i in esperas) 
            { 
                if(i> max) max = i;
            }
            return max;
        }

    }
}
