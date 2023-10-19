using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Services.Description;

namespace TFG.Controllers
{
    public class MenuController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FCFS(List<int> tllegada, List<List<int>> listaProcesos)
        {
            // ESTO ES PARA LOS TIEMPO DE ESPERA
            List<int> tllegadaINICIAL = new List<int>();
            for (int i = 0; i < tllegada.Count; i++)
            {
                tllegadaINICIAL.Add(tllegada[i]);
            }


            // Creamos e inicializamos el array de espera
            int[] espera = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                espera[i] = 0;
            }

            // Creamos e inicializamos el array de rafagas
            int[] nRafaga = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                nRafaga[i] = 0;
            }

            // Creamos e inicializamos el array de estados y la variable de enEjecucion
            int[] estado = new int[tllegada.Count()];
            int enEjecucion = -1;
            int LastEjecucion = -1;
            bool inicio = false;
            for (int i = 0; i < tllegada.Count(); i++)
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
            for (int i = 0; i < tllegada.Count(); i++)
            {
                //List<string> est = new List<string>();
                //est.Add(getEstado(estado[i]));
                solucion.Add(i, new List<string>());
            }


            while (!fin)
            {
                // PLANIFICACION

                //1. Guardamos el estado actual de la planificacion
                if (tiempo != 0)
                {
                    for (int i = 0; i < tllegada.Count(); i++)
                    {
                        List<string> est = solucion[i];
                        if (est.Count() == 0)
                        {
                            est.Add(getEstado(estado[i]));
                        }
                        else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                        {
                            est.Add("-");
                        }
                        else
                        {
                            est.Add(getEstado(estado[i]));
                        }
                    }
                }
                //2. Actualizamos estado del proceso en ejecución
                LastEjecucion = enEjecucion;
                if (enEjecucion != -1)
                {
                    int rafagaProcesoEjecucion = nRafaga[enEjecucion];
                    List<int> rafagasEjecucion = listaProcesos[enEjecucion];
                    int rafagaEjecucion = Convert.ToInt32(rafagasEjecucion[rafagaProcesoEjecucion]);
                    if (rafagaEjecucion == 0)
                    {
                        nRafaga[enEjecucion] += 1;
                        if (nRafaga[enEjecucion] < rafagasEjecucion.Count() - 1)
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
                int[] actualizarEspera = new int[tllegada.Count()];
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    actualizarEspera[i] = 0;
                }
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
                                if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
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
                                        actualizarEspera[i] = 1;
                                        //espera[i] += 10;
                                    }

                                }
                                else
                                {
                                    estado[i] = 1;
                                    actualizarEspera[i] = 1;
                                    //espera[i] += 10;
                                }
                            }
                            else
                            {
                                tllegada[i] -= 10;
                            }
                        }
                        // proceso en espera (listo)
                        else if (estado[i] == 1)
                        {
                            int rafagaProceso = nRafaga[i];
                            List<int> rafagas = listaProcesos[i];
                            int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                            if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                            {
                                int max = mayorEspera(espera);
                                if (max == espera[i])
                                {
                                    estado[i] = 0;
                                    //espera[i] = 0;
                                    actualizarEspera[i] = 2;
                                    actualizarEjecucion = i;
                                    if (nRafaga[i] != 0)
                                    {
                                        nRafaga[i] += 1;
                                        rafagas[nRafaga[i]] -= 10;
                                    }
                                    else
                                    {
                                        rafagas[rafagaProceso] -= 10;
                                    }
                                }
                                else
                                {
                                    //espera[i] += 10;
                                    actualizarEspera[i] = 1;

                                }

                            }
                            else
                            {
                                //espera[i] += 10;
                                actualizarEspera[i] = 1;
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
                                    if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                                    {
                                        int max = mayorEspera(espera);
                                        if (max == 0)
                                        {
                                            nRafaga[i] += 1;
                                            actualizarEjecucion = i;
                                            estado[i] = 0;
                                            //espera[i] = 0;
                                            actualizarEspera[i] = 2;
                                            rafagas[nRafaga[i]] -= 10;
                                        }
                                        else
                                        {
                                            estado[i] = 1;
                                            //espera[i] += 10;
                                            actualizarEspera[i] = 1;
                                        }

                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                        //espera[i] += 10;
                                        actualizarEspera[i] = 2;
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
                if (actualizarEjecucion != -1)
                {
                    enEjecucion = actualizarEjecucion;
                }

                // actualizamos array de espera
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    switch (actualizarEspera[i])
                    {
                        case 0:
                            break;
                        case 1:
                            espera[i] += 10;
                            break;
                        case 2:
                            // 0
                            espera[i] = 0;
                            break;
                    }
                }


                // 4. Comprobar si todos los procesos han terminado
                var comprobacion = true;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    if (estado[i] != 3)
                    {
                        comprobacion = false;
                        break;
                    }
                }
                fin = comprobacion;
                tiempo += 1;
            }

            // Añadir ultimo estado
            for (int i = 0; i < tllegada.Count(); i++)
            {
                List<string> est = solucion[i];
                if (est.Count() == 0)
                {
                    est.Add(getEstado(estado[i]));
                }
                else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                {
                    est.Add("-");
                }
                else
                {
                    est.Add(getEstado(estado[i]));
                }
            }


            for (int i = 0; i < tllegada.Count(); i++)
            {
                double x = getTiempoMedio("L", tllegadaINICIAL[i], solucion[i]);
                double y = getTiempoMedio("E", tllegadaINICIAL[i], solucion[i]);
            }

            // Crea un nuevo objeto JSON que sea serializable
            var objetoSerializable = new Dictionary<string, List<string>>();
            foreach (var kvp in solucion)
            {
                objetoSerializable[kvp.Key.ToString()] = kvp.Value;
            }

            // Serializa el objeto a JSON
            //string data = JsonConvert.SerializeObject(objetoSerializable);

            return Json(objetoSerializable, JsonRequestBehavior.AllowGet);

            //return solucion;
        }


        public Dictionary<int, List<string>> SJFcooperativo(List<int> tllegada, List<List<int>> listaProcesos)
        {
            // ESTO ES PARA LOS TIEMPO DE ESPERA
            List<int> tllegadaINICIAL = new List<int>();
            for (int i = 0; i < tllegada.Count; i++)
            {
                tllegadaINICIAL.Add(tllegada[i]);
            }


            // Creamos e inicializamos el array de espera
            int[] espera = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                espera[i] = 0;
            }

            // Creamos e inicializamos el array de rafagas
            int[] nRafaga = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                nRafaga[i] = 0;
            }

            // Creamos e inicializamos el array de estados y la variable de enEjecucion
            int[] estado = new int[tllegada.Count()];
            int enEjecucion = -1;
            int LastEjecucion = -1;


            int minRafaga = 100000;
            for (int i = 0; i < tllegada.Count(); i++)
            {
                if (tllegada[i] == 0 && minRafaga > listaProcesos[i][0])
                {
                    //estado[i] = 0;
                    if (enEjecucion != -1)
                    {
                        estado[enEjecucion] = 1;
                    }
                    estado[i] = 0;
                    enEjecucion = i;
                    minRafaga = listaProcesos[i][0];
                }
                else if (tllegada[i] == 0 && minRafaga < listaProcesos[i][0])
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
            for (int i = 0; i < tllegada.Count(); i++)
            {
                //List<string> est = new List<string>();
                //est.Add(getEstado(estado[i]));
                solucion.Add(i, new List<string>());
            }


            while (!fin)
            {
                // PLANIFICACION

                //1. Guardamos el estado actual de la planificacion
                if (tiempo != 0)
                {
                    for (int i = 0; i < tllegada.Count(); i++)
                    {
                        List<string> est = solucion[i];
                        if (est.Count() == 0)
                        {
                            est.Add(getEstado(estado[i]));
                        }
                        else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                        {
                            est.Add("-");
                        }
                        else
                        {
                            est.Add(getEstado(estado[i]));
                        }
                    }
                }

                // Calculamos la rafaga mas corta de CPU 
                int minCPU = shortestCPU(0, tllegada, nRafaga, estado, listaProcesos);

                //2. Actualizamos estado del proceso en ejecución
                LastEjecucion = enEjecucion;
                if (enEjecucion != -1)
                {
                    int rafagaProcesoEjecucion = nRafaga[enEjecucion];
                    List<int> rafagasEjecucion = listaProcesos[enEjecucion];
                    int rafagaEjecucion = Convert.ToInt32(rafagasEjecucion[rafagaProcesoEjecucion]);
                    if (rafagaEjecucion == 0)
                    {
                        nRafaga[enEjecucion] += 1;
                        if (nRafaga[enEjecucion] < rafagasEjecucion.Count() - 1)
                        {
                            estado[enEjecucion] = 2;
                            rafagasEjecucion[nRafaga[enEjecucion]] -= 10;
                            //actualizarDisco[enEjecucion] = true;
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


                var actualizarEjecucion = -1;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    // No esta en ejecucion ni acaba de terminar la ejecucion
                    if (i != enEjecucion && LastEjecucion != i)
                    {
                        // proceso que aun no ha llegado
                        if (estado[i] == -1)
                        {
                            if (tllegada[i] == 0)
                            {
                                if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                                {
                                    int rafagaProceso = nRafaga[i];
                                    List<int> rafagas = listaProcesos[i];
                                    int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                                    int cpu = Convert.ToInt32(rafagas[rafagaProceso]);
                                    if (cpu == minCPU)
                                    {
                                        actualizarEjecucion = i;
                                        estado[i] = 0;
                                        rafagas[rafagaProceso] -= 10;
                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                    }

                                }
                                else
                                {
                                    estado[i] = 1;
                                }
                            }
                            else
                            {
                                tllegada[i] -= 10;
                            }
                        }
                        // proceso en espera (listo)
                        else if (estado[i] == 1)
                        {
                            int rafagaProceso = nRafaga[i] != 0 ? nRafaga[i] + 1 : nRafaga[i];
                            List<int> rafagas = listaProcesos[i];
                            int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                            if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                            {
                                int cpu = Convert.ToInt32(rafagas[rafagaProceso]);
                                if (cpu == minCPU)
                                {
                                    estado[i] = 0;
                                    actualizarEjecucion = i;
                                    if (nRafaga[i] != 0)
                                    {
                                        nRafaga[i] += 1;
                                        rafagas[nRafaga[i]] -= 10;
                                    }
                                    else
                                    {
                                        rafagas[rafagaProceso] -= 10;
                                    }
                                }

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
                                    if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                                    {
                                        int cpu = Convert.ToInt32(rafagas[rafagaProceso + 1]);
                                        if (cpu == minCPU)
                                        {
                                            nRafaga[i] += 1;
                                            actualizarEjecucion = i;
                                            estado[i] = 0;
                                            rafagas[nRafaga[i]] -= 10;
                                        }
                                        else
                                        {
                                            estado[i] = 1;
                                        }

                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                    }
                                }
                            }
                            else
                            {
                                rafagas[rafagaProceso] -= 10;
                                //actualizarDisco[i] = true;
                            }
                        }
                    }
                }

                // actualizamos el valor enEjecucion
                if (actualizarEjecucion != -1)
                {
                    enEjecucion = actualizarEjecucion;
                }

                // 4. Comprobar si todos los procesos han terminado
                var comprobacion = true;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    if (estado[i] != 3)
                    {
                        comprobacion = false;
                        break;
                    }
                }
                fin = comprobacion;
                tiempo += 1;
            }

            // Añadir ultimo estado
            for (int i = 0; i < tllegada.Count(); i++)
            {
                List<string> est = solucion[i];
                if (est.Count() == 0)
                {
                    est.Add(getEstado(estado[i]));
                }
                else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                {
                    est.Add("-");
                }
                else
                {
                    est.Add(getEstado(estado[i]));
                }
            }


            for (int i = 0; i < tllegada.Count(); i++)
            {
                double x = getTiempoMedio("L", tllegadaINICIAL[i], solucion[i]);
                double y = getTiempoMedio("E", tllegadaINICIAL[i], solucion[i]);
            }

            return solucion;
        }


        public Dictionary<int, List<string>> SJFapropiativo(List<int> tllegada, List<List<int>> listaProcesos)

        {
            // ESTO ES PARA LOS TIEMPO DE ESPERA
            List<int> tllegadaINICIAL = new List<int>();
            for (int i = 0; i < tllegada.Count; i++)
            {
                tllegadaINICIAL.Add(tllegada[i]);
            }


            // Creamos e inicializamos el array de espera
            int[] espera = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                espera[i] = 0;
            }

            // Creamos e inicializamos el array de rafagas
            int[] nRafaga = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                nRafaga[i] = 0;
            }

            // Creamos e inicializamos el array de estados y la variable de enEjecucion
            int[] estado = new int[tllegada.Count()];
            int enEjecucion = -1;
            int LastEjecucion = -1;


            int minRafaga = 100000;
            for (int i = 0; i < tllegada.Count(); i++)
            {
                if (tllegada[i] == 0 && minRafaga > listaProcesos[i][0])
                {
                    //estado[i] = 0;
                    if (enEjecucion != -1)
                    {
                        estado[enEjecucion] = 1;
                    }
                    estado[i] = 0;
                    enEjecucion = i;
                    minRafaga = listaProcesos[i][0];
                }
                else if (tllegada[i] == 0 && minRafaga < listaProcesos[i][0])
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
            for (int i = 0; i < tllegada.Count(); i++)
            {
                solucion.Add(i, new List<string>());
            }


            while (!fin)
            {
                // PLANIFICACION

                //1. Guardamos el estado actual de la planificacion
                if (tiempo != 0)
                {
                    for (int i = 0; i < tllegada.Count(); i++)
                    {
                        List<string> est = solucion[i];
                        if (est.Count() == 0)
                        {
                            est.Add(getEstado(estado[i]));
                        }
                        else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                        {
                            est.Add("-");
                        }
                        else
                        {
                            est.Add(getEstado(estado[i]));
                        }
                    }
                }

                // Calculamos la rafaga mas corta de CPU 
                int minCPU = shortestCPU(1, tllegada, nRafaga, estado, listaProcesos);

                //2. Actualizamos estado del proceso en ejecución
                LastEjecucion = enEjecucion;
                if (enEjecucion != -1)
                {
                    int rafagaProcesoEjecucion = nRafaga[enEjecucion];
                    List<int> rafagasEjecucion = listaProcesos[enEjecucion];
                    int rafagaEjecucion = Convert.ToInt32(rafagasEjecucion[rafagaProcesoEjecucion]);
                    if (rafagaEjecucion == 0)
                    {
                        nRafaga[enEjecucion] += 1;
                        if (nRafaga[enEjecucion] < rafagasEjecucion.Count() - 1)
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
                        // Comprobamos si la rafaga de ejecucion actual es menor que el resto
                        if(rafagaEjecucion > minCPU)
                        {
                            estado[enEjecucion] = 1;
                            enEjecucion = -1;
                        }
                        else
                        {
                            rafagasEjecucion[nRafaga[enEjecucion]] -= 10;
                        }
                    }
                }


                var actualizarEjecucion = -1;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    // No esta en ejecucion ni acaba de terminar la ejecucion
                    if (i != enEjecucion && LastEjecucion != i)
                    {
                        // proceso que aun no ha llegado
                        if (estado[i] == -1)
                        {
                            if (tllegada[i] == 0)
                            {
                                if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                                {
                                    int rafagaProceso = nRafaga[i];
                                    List<int> rafagas = listaProcesos[i];
                                    int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                                    int cpu = Convert.ToInt32(rafagas[rafagaProceso]);
                                    if (cpu == minCPU)
                                    {
                                        actualizarEjecucion = i;
                                        estado[i] = 0;
                                        rafagas[rafagaProceso] -= 10;
                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                    }

                                }
                                else
                                {
                                    estado[i] = 1;
                                }
                            }
                            else
                            {
                                tllegada[i] -= 10;
                            }
                        }
                        // proceso en espera (listo)
                        else if (estado[i] == 1)
                        {
                            int rafagaProceso = (nRafaga[i] != 0 && nRafaga[i] % 2 != 0) ? nRafaga[i] + 1 : nRafaga[i];
                            List<int> rafagas = listaProcesos[i];
                            int rafaga = Convert.ToInt32(rafagas[rafagaProceso]);
                            if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                            {
                                int cpu = Convert.ToInt32(rafagas[rafagaProceso]);
                                if (cpu == minCPU)
                                {
                                    estado[i] = 0;
                                    actualizarEjecucion = i;
                                    if (nRafaga[i] != 0)
                                    {
                                        if(nRafaga[i] != 0 && nRafaga[i] % 2 != 0)
                                        {
                                            nRafaga[i] += 1;
                                        }
                                        rafagas[nRafaga[i]] -= 10;
                                    }
                                    else
                                    {
                                        rafagas[rafagaProceso] -= 10;
                                    }
                                }

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
                                    if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                                    {
                                        int cpu = Convert.ToInt32(rafagas[rafagaProceso + 1]);
                                        if (cpu == minCPU)
                                        {
                                            nRafaga[i] += 1;
                                            actualizarEjecucion = i;
                                            estado[i] = 0;
                                            rafagas[nRafaga[i]] -= 10;
                                        }
                                        else
                                        {
                                            estado[i] = 1;
                                        }

                                    }
                                    else
                                    {
                                        estado[i] = 1;
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
                if (actualizarEjecucion != -1)
                {
                    enEjecucion = actualizarEjecucion;
                }

                // 4. Comprobar si todos los procesos han terminado
                var comprobacion = true;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    if (estado[i] != 3)
                    {
                        comprobacion = false;
                        break;
                    }
                }
                fin = comprobacion;
                tiempo += 1;
            }

            // Añadir ultimo estado
            for (int i = 0; i < tllegada.Count(); i++)
            {
                List<string> est = solucion[i];
                if (est.Count() == 0)
                {
                    est.Add(getEstado(estado[i]));
                }
                else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                {
                    est.Add("-");
                }
                else
                {
                    est.Add(getEstado(estado[i]));
                }
            }


            for (int i = 0; i < tllegada.Count(); i++)
            {
                double x = getTiempoMedio("L", tllegadaINICIAL[i], solucion[i]);
                double y = getTiempoMedio("E", tllegadaINICIAL[i], solucion[i]);
            }

            return solucion;
        }


        public Dictionary<int, List<string>> RR(int cuanto, List<int> tllegada, List<List<int>> listaProcesos)
        {
            // ESTO ES PARA LOS TIEMPO DE ESPERA
            List<int> tllegadaINICIAL = new List<int>();
            for (int i = 0; i < tllegada.Count; i++)
            {
                tllegadaINICIAL.Add(tllegada[i]);
            }


            // Creamos e inicializamos el array de espera
            int[] espera = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                espera[i] = 0;
            }

            // Creamos e inicializamos el array de rafagas
            int[] nRafaga = new int[tllegada.Count()];
            for (int i = 0; i < tllegada.Count(); i++)
            {
                nRafaga[i] = 0;
            }

            // Creamos la cola para las preferencias en proceso
            Queue<int> colaPreferencia = new Queue<int>();
            HashSet<int> estaEnCola = new HashSet<int>();

            int processCuanto = 0;
            bool[] firstEjecuted = new bool[tllegada.Count()];
            for(int i=0; i<tllegada.Count(); i++)
            {
                firstEjecuted[i] = false;
            }

            // Creamos e inicializamos el array de estados y la variable de enEjecucion
            int[] estado = new int[tllegada.Count()];

            int enEjecucion = -1;
            int LastEjecucion = -1;
            bool inicio = false;
            for (int i = 0; i < tllegada.Count(); i++)
            {
                if (tllegada[i] == 0)
                {
                    if (!inicio)
                    {
                        estado[i] = 0;
                        firstEjecuted[i] = true;
                        enEjecucion = i;
                        inicio = true;
                    }
                    else
                    {
                        estado[i] = 1;
                        estaEnCola.Add(i);
                        colaPreferencia.Enqueue(i);
                    }
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
            for (int i = 0; i < tllegada.Count(); i++)
            {
                solucion.Add(i, new List<string>());
            }


            while (!fin)
            {
                // PLANIFICACION

                //1. Guardamos el estado actual de la planificacion
                if (tiempo != 0)
                {
                    for (int i = 0; i < tllegada.Count(); i++)
                    {
                        List<string> est = solucion[i];
                        if (est.Count() == 0)
                        {
                            est.Add(getEstado(estado[i]));
                        }
                        else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                        {
                            est.Add("-");
                        }
                        else
                        {
                            est.Add(getEstado(estado[i]));
                        }
                    }
                }


                //2. Actualizamos estado del proceso en ejecución
                var actualizarCola = -1;
                LastEjecucion = enEjecucion;
                if (enEjecucion != -1)
                {
                    int rafagaProcesoEjecucion = nRafaga[enEjecucion];
                    List<int> rafagasEjecucion = listaProcesos[enEjecucion];
                    int rafagaEjecucion = Convert.ToInt32(rafagasEjecucion[rafagaProcesoEjecucion]);
                    firstEjecuted[enEjecucion] = true;
                    if (processCuanto == cuanto && rafagaEjecucion>0) // se ha llegado el procesamiento maximo
                    {
                        estado[enEjecucion] = 1;
                        processCuanto = 0;
                        //if (ejecutedAll(firstEjecuted))
                        //{
                        actualizarCola = enEjecucion;
                            //colaPreferencia.Enqueue(enEjecucion);
                        //}
                        enEjecucion = -1;
                    }
                    else
                    {
                        if (rafagaEjecucion == 0)
                        {
                            nRafaga[enEjecucion] += 1;
                            if (nRafaga[enEjecucion] < rafagasEjecucion.Count() - 1)
                            {
                                estado[enEjecucion] = 2;
                                rafagasEjecucion[nRafaga[enEjecucion]] -= 10;
                            }
                            else
                            {
                                estado[enEjecucion] = 3;
                            }
                            processCuanto = 0;
                            enEjecucion = -1;
                        }
                        else
                        {
                            processCuanto += 10;
                            rafagasEjecucion[nRafaga[enEjecucion]] -= 10;
                         
                        }
                    }
                }

                var actualizarEjecucion = -1;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    // No esta en ejecucion ni acaba de terminar la ejecucion
                    if (i != enEjecucion && LastEjecucion != i)
                    {
                        // proceso que aun no ha llegado
                        if (estado[i] == -1)
                        {
                            if (tllegada[i] == 0)
                            {
                                if (enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
                                {
                                    if (!ejecutedAll(firstEjecuted))
                                    {
                                        HashSet<int> conjuntoProcesos = stillNotEjecuted(estado, firstEjecuted, tllegada, espera);
                                        if (conjuntoProcesos.Contains(i))
                                        {
                                            int rafagaProceso = nRafaga[i];
                                            List<int> rafagas = listaProcesos[i];
                                            actualizarEjecucion = i;
                                            estado[i] = 0;
                                            firstEjecuted[i] = true;
                                            rafagas[rafagaProceso] -= 10;
                                            processCuanto += 10;
                                        }
                                        else
                                        {
                                            estado[i] = 1;
                                            espera[i] += 10;
                                        }
                                    }
                                    else
                                    {
                                        if (colaPreferencia.Count() == 0)
                                        {
                                            int rafagaProceso = nRafaga[i];
                                            List<int> rafagas = listaProcesos[i];
                                            actualizarEjecucion = i;
                                            estado[i] = 0;
                                            //firstEjecuted[i] = true;
                                            rafagas[rafagaProceso] -= 10;
                                            processCuanto += 10;
                                        }
                                        else
                                        {
                                            estado[i] = 1;
                                            estaEnCola.Add(i);
                                            colaPreferencia.Enqueue(i);
                                        }
                                    }
                                }
                                else
                                {
                                    estado[i] = 1;
                                    //estaEnCola.Add(i);
                                    //colaPreferencia.Enqueue(i);
                                    espera[i] += 10;
                                }
                                
                            }
                            else
                            {
                                tllegada[i] -= 10;
                            }
                        }
                        // proceso en espera (listo)
                        else if (estado[i] == 1)
                        {
                            int rafagaProceso = (nRafaga[i] != 0 && nRafaga[i] % 2 != 0) ? nRafaga[i] + 1 : nRafaga[i];
                            List<int> rafagas = listaProcesos[i];

                            if (enEjecucion == -1 && actualizarEjecucion == -1)// el proceso que se estaba ejecutando ha terminado
                            {

                                if (!ejecutedAll(firstEjecuted))
                                {
                                    HashSet<int> conjuntoProcesos = stillNotEjecuted(estado, firstEjecuted, tllegada, espera);
                                    if (conjuntoProcesos.Contains(i) || conjuntoProcesos.Count() == 0)
                                    {
                                        actualizarEjecucion = i;
                                        estado[i] = 0;
                                        firstEjecuted[i] = true;
                                        rafagas[rafagaProceso] -= 10;
                                        processCuanto += 10;
                                    }
                                    else
                                    {
                                        espera[i] += 10;
                                    }
                                }
                                else
                                {
                                    // obtenemos el proceso con preferencia
                                    bool preferencia = colaPreferencia.Count() == 0 ? true : colaPreferencia.Peek() == i;

                                    if (preferencia)
                                    {
                                        if (colaPreferencia.Count() != 0)
                                        {
                                            estaEnCola.Remove(i);
                                            colaPreferencia.Dequeue();
                                        }
                                        actualizarEjecucion = i;
                                        estado[i] = 0;
                                        //firstEjecuted[i] = true;
                                        if (nRafaga[i] != 0)
                                        {
                                            if (nRafaga[i] != 0 && nRafaga[i] % 2 != 0)
                                            {
                                                nRafaga[i] += 1;
                                            }
                                            rafagas[nRafaga[i]] -= 10;
                                        }
                                        else
                                        {
                                            rafagas[rafagaProceso] -= 10;
                                        }
                                        //rafagas[rafagaProceso] -= 10;
                                        processCuanto += 10;
                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                        if (!estaEnCola.Contains(i))
                                        {
                                            estaEnCola.Add(i);
                                            colaPreferencia.Enqueue(i);
                                        }
                                    }
                                }

                            }
                            else
                            {
                                if (!estaEnCola.Contains(i) && ejecutedAll(firstEjecuted))
                                {
                                    estaEnCola.Add(i);
                                    colaPreferencia.Enqueue(i);
                                }
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
                                    if (enEjecucion == -1 && actualizarEjecucion == -1)
                                    {

                                        if (!ejecutedAll(firstEjecuted))
                                        {
                                            HashSet<int> conjuntoProcesos = stillNotEjecuted(estado, firstEjecuted, tllegada, espera);
                                            if (conjuntoProcesos.Contains(i) || conjuntoProcesos.Count() == 0)
                                            {
                                                actualizarEjecucion = i;
                                                estado[i] = 0;
                                                firstEjecuted[i] = true;
                                                rafagas[rafagaProceso] -= 10;
                                                processCuanto += 10;
                                            }
                                            else
                                            {
                                                estado[i] = 1;
                                                estaEnCola.Add(i);
                                                colaPreferencia.Enqueue(i);
                                            }
                                        }
                                        else
                                        {
                                            if (colaPreferencia.Count() == 0)
                                            {
                                                actualizarEjecucion = i;
                                                estado[i] = 0;
                                                nRafaga[i]++;
                                                //firstEjecuted[i] = true;
                                                rafagas[nRafaga[i]] -= 10;
                                                processCuanto += 10;
                                            }
                                            else
                                            {
                                                estado[i] = 1;
                                                estaEnCola.Add(i);
                                                colaPreferencia.Enqueue(i);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                        if (ejecutedAll(firstEjecuted))
                                        {
                                            estaEnCola.Add(i);
                                            colaPreferencia.Enqueue(i);
                                        }
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
                if (actualizarEjecucion != -1)
                {
                    enEjecucion = actualizarEjecucion;
                }

                // actualizar cola
                if(actualizarCola != -1)
                {
                    if (!estaEnCola.Contains(actualizarCola))
                    {
                        estaEnCola.Add(actualizarCola);
                        colaPreferencia.Enqueue(actualizarCola);
                    }
                }

                // 4. Comprobar si todos los procesos han terminado
                var comprobacion = true;
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    if (estado[i] != 3)
                    {
                        comprobacion = false;
                        break;
                    }
                }
                fin = comprobacion;
                tiempo += 1;
            }

            // Añadir ultimo estado
            for (int i = 0; i < tllegada.Count(); i++)
            {
                List<string> est = solucion[i];
                if (est.Count() == 0)
                {
                    est.Add(getEstado(estado[i]));
                }
                else if (est[est.Count() - 1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3))
                {
                    est.Add("-");
                }
                else
                {
                    est.Add(getEstado(estado[i]));
                }
            }


            for (int i = 0; i < tllegada.Count(); i++)
            {
                double x = getTiempoMedio("L", tllegadaINICIAL[i], solucion[i]);
                double y = getTiempoMedio("E", tllegadaINICIAL[i], solucion[i]);
            }

            return solucion;
        }

        // Funcion para obtener el tiempo medio de espera/ejecucion de un proceso
        public double getTiempoMedio(string estado, int tllegada, List<string> rafagas)
        {
            double tiempo = 0;
            int lastPos = 0;
            for (int i = 0; i < rafagas.Count(); i++)
            {
                if (rafagas[i] == estado)
                {
                    lastPos = i + 1;
                }
            }
            if (lastPos == 0 && tllegada == 0)
            {
                tiempo = 0;
            }
            else if (lastPos != 0 && tllegada != 0)
            {
                if (lastPos * 10 < tllegada)
                {
                    tiempo = 0;
                }
                else
                {
                    tiempo = lastPos * 10 - tllegada;
                }
            }
            else if (lastPos == 0 && tllegada != 0)
            {
                tiempo = tllegada;
            }
            else if (lastPos != 0 && tllegada == 0)
            {
                tiempo = lastPos * 10;
            }
            return tiempo;
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
                if (i > max) max = i;
            }
            return max;
        }

        public int shortestCPU(int type,List<int> tllegada, int[] nRafagas, int[] estados, List<List<int>> listaProcesos)
        {
            int min = 1000000;
            if (type == 0) // SJF cooperativo
            {
                for (int i = 0; i < estados.Count(); i++)
                {
                    if (estados[i] == 1) // en espera 
                    {
                        List<int> rafagas = listaProcesos[i];
                        int cpu = nRafagas[i] != 0 ? rafagas[nRafagas[i] + 1] : rafagas[nRafagas[i]];
                        if (cpu < min) min = cpu;
                    }
                    else if (estados[i] == -1 && tllegada[i] == 0)// no ha llegado pero llega en esta rafaga
                    {
                        List<int> rafagas = listaProcesos[i];
                        int cpu = rafagas[nRafagas[i]];
                        if (cpu < min) min = cpu;
                    }
                    else if (estados[i] == 2) // en disco pero termina en esta rafaga
                    {
                        List<int> rafagas = listaProcesos[i];
                        int disco = rafagas[nRafagas[i]];
                        if (disco == 0)
                        {
                            int cpu = rafagas[nRafagas[i] + 1]; // la siguiente rafaga a la actual
                            min = cpu;
                        }

                    }
                }
            }
            else if(type == 1) // SJF apropiativo
            {
                for (int i = 0; i < estados.Count(); i++)
                {
                    if(estados[i] == 0) // en ejecución
                    {
                        List<int> rafagas = listaProcesos[i];
                        int cpu = rafagas[nRafagas[i]];
                        if (cpu < min && cpu != 0) min = cpu;
                    }
                    if (estados[i] == 1) // en espera 
                    {
                        List<int> rafagas = listaProcesos[i];
                        int cpu = (nRafagas[i] != 0 && nRafagas[i] % 2 != 0) ? rafagas[nRafagas[i] + 1] : rafagas[nRafagas[i]];
                        if (cpu < min) min = cpu;
                    }
                    else if (estados[i] == -1 && tllegada[i] == 0)// no ha llegado pero llega en esta rafaga
                    {
                        List<int> rafagas = listaProcesos[i];
                        int cpu = rafagas[nRafagas[i]];
                        if (cpu < min) min = cpu;
                    }
                    else if (estados[i] == 2) // en disco pero termina en esta rafaga
                    {
                        List<int> rafagas = listaProcesos[i];
                        int disco = rafagas[nRafagas[i]];
                        if (disco == 0)
                        {
                            int cpu = rafagas[nRafagas[i] + 1]; // la siguiente rafaga a la actual
                            if (cpu < min) min = cpu;
                        }

                    }
                }
            }
            return min;
        }

        public bool ejecutedAll(bool[] ejecuted)
        {
            foreach(bool i in ejecuted)
            {
                if (!i) return false;
            }
            return true;
        }

        public bool ejecutedOthers(bool[] ejecuted, int u)
        {
            for(int i=0; i<ejecuted.Length; i++)
            {
                if (i != u)
                {
                    if (!ejecuted[i]) return false;
                }
            }
            return true;
        }

        public HashSet<int> stillNotEjecuted(int[] estados, bool[] ejecuted, List<int> tllegada, int[] espera)
        {
            HashSet<int> noEjecutadosEspera = new HashSet<int>();
            List<int> noEjecutados = new List<int>();
            int[] esperas = new int[estados.Length];

            int contador = 0;
            for (int i = 0; i < estados.Length; i++)
            {
                if (estados[i] == 1 && !ejecuted[i]) // listo
                {
                    noEjecutados.Add(i);
                    esperas[i] = espera[i];
                    contador++;
                }
                if (estados[i] == -1 && tllegada[i] == 0 && !ejecuted[i]) // no ha llegado
                {
                    noEjecutados.Add(i);
                    esperas[i] = espera[i];
                    contador++;
                }
            }
            int maxEspera = mayorEspera(esperas);
            for(int i = 0; i<noEjecutados.Count; i++)
            {
                int proceso = noEjecutados[i];
                if(espera[proceso] >= maxEspera)
                {
                    noEjecutadosEspera.Add(proceso);
                }
            }

            return noEjecutadosEspera;
        }
    }
}
