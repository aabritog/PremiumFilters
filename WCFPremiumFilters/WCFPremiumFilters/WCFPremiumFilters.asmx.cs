using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using System.Web.Script.Services;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace WCFPremiumFilters
{
    /// <summary>
    /// Descripción breve de WCFPremiumFilters
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class WCFPremiumFilters : System.Web.Services.WebService
    {

        //-------------------------------------------------------------------
        //Nombre WS: GetTipoAplicacion().
        //Fecha de creación: 23/09/2016.
        //Función: Obtiene los datos de la tabla M_TIPOMARCAS.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTipoAplicacion()
        {
            DataTable dt = new DataTable();
            //string constr = ConfigurationManager.ConnectionStrings["AccessDBLocal"].ConnectionString;
            string constr = ConfigurationManager.ConnectionStrings["AccessDBCloud"].ConnectionString;
            OleDbConnection con = new OleDbConnection(constr);
            try
            {

                OleDbCommand cmd = new OleDbCommand();
                OleDbDataAdapter sda = new OleDbDataAdapter();

                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "Type";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_TIPOMARCAS";
                sda.Fill(dt);
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                return json;
            }

            catch (Exception ex)
            {
                return "Error";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetMarcaVehiculo().
        //Fecha de creación: 23/09/2016.
        //Función: Obtiene los datos de la tabla M_MARCAS.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetMarcaVehiculo(string Id_TMk)
        {
            int nId_TMk;
            nId_TMk = Convert.ToInt32(Id_TMk);
            DataTable dt = new DataTable();
            //string constr = ConfigurationManager.ConnectionStrings["AccessDBLocal"].ConnectionString;
            string constr = ConfigurationManager.ConnectionStrings["AccessDBCloud"].ConnectionString;
            OleDbConnection con = new OleDbConnection(constr);
            try
            {
                OleDbCommand cmd = new OleDbCommand();
                OleDbDataAdapter sda = new OleDbDataAdapter();

                cmd.Connection = con;
                con.Open();
                cmd.CommandText = "Manufacturer";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_MARCAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<int>("Id_TMk") == nId_TMk
                                               select myRow;

                DataTable dt2 = new DataTable();

                dt2 = results.CopyToDataTable<DataRow>();

                string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                return json;
            }

            catch (Exception ex)
            {
                return "Error";
            }
            finally
            {
                con.Close();
            }
        }


    }
}
