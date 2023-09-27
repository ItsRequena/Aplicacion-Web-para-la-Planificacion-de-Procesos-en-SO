using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TFG.Controllers;

namespace TestAlgoritmos
{
    [TestClass]
    public class SJFcooperativo
    {
        private readonly MenuController _menuController;

        public SJFcooperativo()
        {
            _menuController = new MenuController();
        }


        public bool comparation(Dictionary<int, List<string>> dic1, Dictionary<int, List<string>> dic2)
        {
            if (dic1 == null || dic2 == null)
            {
                return dic1 == null && dic2 == null;
            }
            if (dic1.Count() != dic2.Count())
            {
                return false;
            }
            // Comprobamos que tengan la misma cantidad de elementos
            for (int i = 0; i < dic1.Count(); i++)
            {
                if (dic1[i].Count() != dic2[i].Count())
                {
                    return false;
                }
            }
            // Comparamos elemento por elemento
            for (int i = 0; i < dic1.Count(); i++)
            {
                List<string> lista1 = dic1[i];
                List<string> lista2 = dic2[i];
                for (int j = 0; j < lista1.Count(); j++)
                {
                    if (lista1[j] != lista2[j])
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        [TestMethod]
        public void TestMethod1()
        {
            // TIEMPOS DE LLEGADA
            List<int> tiemposLLegada = new List<int>();
            // Proceso 1
            tiemposLLegada.Add(0);
            // Proceso 2
            tiemposLLegada.Add(20);
            // Proceso 3
            tiemposLLegada.Add(30);

            // RAFAGAS
            List<List<int>> rafagas = new List<List<int>>();
            // Proceso 1
            List<int> proceso1 = new List<int>();
            proceso1.Add(10);
            proceso1.Add(20);
            proceso1.Add(20);
            proceso1.Add(20);
            proceso1.Add(20);
            rafagas.Add(proceso1);
            // Proceso 2
            List<int> proceso2 = new List<int>();
            proceso2.Add(30);
            proceso2.Add(10);
            proceso2.Add(40);
            rafagas.Add(proceso2);
            // Proceso 3
            List<int> proceso3 = new List<int>();
            proceso3.Add(30);
            proceso3.Add(10);
            proceso3.Add(20);
            rafagas.Add(proceso3);


            // ALGORTIMO 
            Dictionary<int, List<string>> resultado = _menuController.SJFcooperativo(tiemposLLegada, rafagas);

            // SOLUCION
            Dictionary<int, List<string>> solucion = new Dictionary<int, List<string>>();
            List<string> solucion1 = new List<string>();
            List<string> solucion2 = new List<string>();
            List<string> solucion3 = new List<string>();
            string[] solucionProceso1 = { "E", "D", "D", "L", "L", "E", "E", "D", "D", "L", "E", "E", "T", "-", "-", "-", "-", "-", "-" };
            string[] solucionProceso2 = { "-", "-", "E", "E", "E", "D", "L", "L", "L", "L", "L", "L", "L", "L", "E", "E", "E", "E", "T" };
            string[] solucionProceso3 = { "-", "-", "-", "L", "L", "L", "L", "E", "E", "E", "D", "L", "E", "E", "T", "-", "-", "-", "-" };
            for (int i = 0; i < solucionProceso1.Count(); i++)
            {
                solucion1.Add(solucionProceso1[i]);
                solucion2.Add(solucionProceso2[i]);
                solucion3.Add(solucionProceso3[i]);
            }
            solucion.Add(0, solucion1);
            solucion.Add(1, solucion2);
            solucion.Add(2, solucion3);

            Assert.IsTrue(comparation(resultado, solucion));

        }


        [TestMethod]
        public void TestMethod2()
        {
            // TIEMPOS DE LLEGADA
            List<int> tiemposLLegada = new List<int>();
            // Proceso 1
            tiemposLLegada.Add(20);
            // Proceso 2
            tiemposLLegada.Add(0);
            // Proceso 3
            tiemposLLegada.Add(0);
            // Proceso 4
            tiemposLLegada.Add(30);

            // RAFAGAS
            List<List<int>> rafagas = new List<List<int>>();
            // Proceso 1
            List<int> proceso1 = new List<int>();
            proceso1.Add(30);
            proceso1.Add(10);
            proceso1.Add(10);
            rafagas.Add(proceso1);
            // Proceso 2
            List<int> proceso2 = new List<int>();
            proceso2.Add(30);
            proceso2.Add(10);
            proceso2.Add(20);
            rafagas.Add(proceso2);
            // Proceso 3
            List<int> proceso3 = new List<int>();
            proceso3.Add(30);
            proceso3.Add(20);
            proceso3.Add(10);
            rafagas.Add(proceso3);
            // Proceso 4
            List<int> proceso4 = new List<int>();
            proceso4.Add(30);
            proceso4.Add(10);
            proceso4.Add(10);
            rafagas.Add(proceso4);


            // ALGORTIMO 
            Dictionary<int, List<string>> resultado = _menuController.SJFcooperativo(tiemposLLegada, rafagas);

            // SOLUCION
            Dictionary<int, List<string>> solucion = new Dictionary<int, List<string>>();
            List<string> solucion1 = new List<string>();
            List<string> solucion2 = new List<string>();
            List<string> solucion3 = new List<string>();
            List<string> solucion4 = new List<string>();
            string[] solucionProceso1 = { "-", "-", "L", "E", "E", "E", "D", "L", "E", "T", "-", "-", "-", "-", "-", "-", "-", "-"};
            string[] solucionProceso2 = { "E", "E", "E", "D", "L", "L", "E", "E", "T", "-", "-", "-", "-", "-", "-", "-", "-", "-"};
            string[] solucionProceso3 = { "L", "L", "L", "L", "L", "L", "L", "L", "L", "E", "E", "E", "D", "D", "L", "E", "T", "-"};
            string[] solucionProceso4 = { "-", "-", "-", "L", "L", "L", "L", "L", "L", "L", "L", "L", "E", "E", "E", "D", "E", "T"};
            for (int i = 0; i < solucionProceso1.Count(); i++)
            {
                solucion1.Add(solucionProceso1[i]);
                solucion2.Add(solucionProceso2[i]);
                solucion3.Add(solucionProceso3[i]);
                solucion4.Add(solucionProceso4[i]);
            }
            solucion.Add(0, solucion1);
            solucion.Add(1, solucion2);
            solucion.Add(2, solucion3);
            solucion.Add(3, solucion4);

            Assert.IsTrue(comparation(resultado, solucion));

        }

    }
}
