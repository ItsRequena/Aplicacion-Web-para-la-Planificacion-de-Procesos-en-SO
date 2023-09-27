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

        public Dictionary<int, List<string>> FCFS(List<int> tllegada, List<List<int>> listaProcesos)
        {
            // ESTO ES PARA LOS TIEMPO DE ESPERA
            List<int> tllegadaINICIAL = new List<int>();
            for(int i=0; i<tllegada.Count; i++)
            {
                tllegadaINICIAL.Add(tllegada[i]);
            }


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
                        else if (est[est.Count()-1] == "T" || (est[est.Count() - 1] == "-" && estado[i] == 3) )
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
                int[] actualizarEspera = new int[tllegada.Count()];
                for(int i=0; i<tllegada.Count(); i++)
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
                                if ( enEjecucion == -1 && actualizarEjecucion == -1) // el proceso que se estaba ejecutando ha terminado
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
                if(actualizarEjecucion != -1)
                {
                    enEjecucion = actualizarEjecucion;
                }

                // actualizamos array de espera
                for(int i=0; i<tllegada.Count(); i++)
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


            for(int i=0; i<tllegada.Count(); i++)
            {
                double x = getTiempoMedio("L",tllegadaINICIAL[i], solucion[i]);
                double y = getTiempoMedio("E", tllegadaINICIAL[i], solucion[i]);
            }

            return solucion;
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


            int maxRafaga = 100000;
            for (int i = 0; i < tllegada.Count(); i++)
            {
                if (tllegada[i] == 0 && maxRafaga > listaProcesos[i][0])
                {
                    //estado[i] = 0;
                    if(enEjecucion != -1)
                    {
                        estado[enEjecucion] = 1;
                    }
                    estado[i] = 0;
                    enEjecucion = i;
                    maxRafaga = listaProcesos[i][0];
                }
                else if (tllegada[i] == 0 && maxRafaga < listaProcesos[i][0])
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


                //3. Actualizamos array de espera, array de llegada y array de rafagas
                int[] actualizarEspera = new int[tllegada.Count()];
                for (int i = 0; i < tllegada.Count(); i++)
                {
                    actualizarEspera[i] = 0;
                }

                // Calculamos la rafaga mas corta de CPU 
                int minCPU = shortestCPU(tllegada, nRafaga, estado, listaProcesos);

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
                                        actualizarEspera[i] = 1;
                                    }

                                }
                                else
                                {
                                    estado[i] = 1;
                                    actualizarEspera[i] = 1;
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
                                else
                                {
                                    actualizarEspera[i] = 1;

                                }

                            }
                            else
                            {
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
                                        int cpu = Convert.ToInt32(rafagas[rafagaProceso+1]);
                                        if (cpu == minCPU)
                                        {
                                            nRafaga[i] += 1;
                                            actualizarEjecucion = i;
                                            estado[i] = 0;
                                            actualizarEspera[i] = 2;
                                            rafagas[nRafaga[i]] -= 10;
                                        }
                                        else
                                        {
                                            estado[i] = 1;
                                            actualizarEspera[i] = 1;
                                        }

                                    }
                                    else
                                    {
                                        estado[i] = 1;
                                        actualizarEspera[i] = 2;
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

            return solucion;
        }


        public Dictionary<int, List<string>> SJFasociativo(List<int> tllegada, List<List<int>> listaProcesos)
        {
            return new Dictionary<int, List<string>>();
        }


        public Dictionary<int, List<string>> RR(List<int> tllegada, List<List<int>> listaProcesos)
        {
            return new Dictionary<int, List<string>>();
        }

        // Funcion para obtener el tiempo medio de espera/ejecucion de un proceso
        public double getTiempoMedio(string estado, int tllegada, List<string> rafagas)
        {
            double tiempo = 0;
            int lastPos = 0;
            for(int i=0; i< rafagas.Count(); i++)
            {
                if (rafagas[i] == estado)
                {
                    lastPos = i+1;
                }
            }
            if(lastPos == 0 && tllegada == 0)
            {
                tiempo = 0;
            }
            else if(lastPos != 0 && tllegada != 0)
            {
                if(lastPos*10 < tllegada)
                {
                    tiempo = 0;
                }
                else
                {
                    tiempo = lastPos * 10 - tllegada;
                }
            }
            else if(lastPos == 0 && tllegada != 0)
            {
                tiempo = tllegada;
            }
            else if(lastPos !=0 && tllegada == 0)
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
                if(i> max) max = i;
            }
            return max;
        }

        public int shortestCPU(List<int> tllegada, int[] nRafagas, int[] estados , List<List<int>> listaProcesos)
        {
            int min = 1000000;
            for(int i = 0; i<estados.Count(); i++)
            {
                if (estados[i] == 1) // en espera 
                {
                    List<int> rafagas = listaProcesos[i];
                    int cpu = nRafagas[i] != 0 ? rafagas[nRafagas[i] + 1] : rafagas[nRafagas[i]];
                    if(cpu < min) min = cpu;
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
                    if(disco == 0)
                    {
                        int cpu = rafagas[nRafagas[i] + 1]; // la siguiente rafaga a la actual
                        min = cpu;
                    }

                }
            }
            return min;
        }

    }
}
