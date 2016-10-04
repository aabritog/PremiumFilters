﻿using System;
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
        //Nombre WS: GetTipoAplicacion.
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
        //Nombre WS: GetMarcaVehiculo.
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


        //-------------------------------------------------------------------
        //Nombre WS: GetModelo.
        //Fecha de creación: 24/09/2016.
        //Función: Obtiene los datos de la tabla M_REFMARCAS.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetModelo(int Id_Mk)
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
                cmd.CommandText = "Model";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_REFMARCAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<int>("Id_Mk") == Id_Mk
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


        //-------------------------------------------------------------------
        //Nombre WS: GetCilindraje.
        //Fecha de creación: 24/09/2016.
        //Función: Obtiene los datos de la tabla M_CILINDRAJE.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCilindraje(int Id_RefMk, int Id_TMk)
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
                if (Id_TMk == 1 || Id_TMk == 4)
                {
                    cmd.CommandText = "Motor";
                }
                else
                {
                    cmd.CommandText = "MotorBig";
                }
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "MV_APLICACIONES";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<int>("Id_RefMk") == Id_RefMk
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


        //-------------------------------------------------------------------
        //Nombre WS: GetFAire.
        //Fecha de creación: 24/09/2016.
        //Función: Obtiene los datos de la tabla M_FILTROS para los filtros 
        //         de aire.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFAire(int Id_RefMk, double McilL, string MotCap)
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
                cmd.CommandText = "Air";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_FILTROS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if (McilL != 0)
                {
                    results = from myRow in dt.AsEnumerable()
                                                   where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<double>("McilL") == McilL
                                                   select myRow;
                }
                else {
                    results = from myRow in dt.AsEnumerable()
                                                   where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<string>("MotCap") == MotCap
                                                   select myRow;                
                }
                DataTable dt2 = new DataTable();

                if (results.Count<DataRow>() > 0)
                {
                    dt2 = results.CopyToDataTable<DataRow>();
                    string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                    return json;
                }
                else
                {
                    return "No se encontró filtros de aire para el modelo especificado";
                }

                //dt2 = results.CopyToDataTable<DataRow>();
                //string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                //return json;
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
        //Nombre WS: GetFOil.
        //Fecha de creación: 27/09/2016.
        //Función: Obtiene los datos de la tabla M_FILTROS para los filtros
        //         de aceite.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFOil(int Id_RefMk, double McilL, string MotCap)
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
                cmd.CommandText = "Oil";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_FILTROS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if (McilL != 0)
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<double>("McilL") == McilL
                              select myRow;
                }
                else
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<string>("MotCap") == MotCap
                              select myRow;
                }
                DataTable dt2 = new DataTable();

                if (results.Count<DataRow>() > 0)
                {
                    dt2 = results.CopyToDataTable<DataRow>();
                    string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                    return json;
                }
                else
                {
                    return "No se encontró filtros de aceite para el modelo especificado";
                }

                //dt2 = results.CopyToDataTable<DataRow>();
                //string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                //return json;
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
        //Nombre WS: GetFFuel.
        //Fecha de creación: 27/09/2016.
        //Función: Obtiene los datos de la tabla M_FILTROS para los filtros
        //         de gasolina.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFFuel(int Id_RefMk, double McilL, string MotCap)
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
                cmd.CommandText = "Fuel";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_FILTROS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if (McilL != 0)
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<double>("McilL") == McilL
                              select myRow;
                }
                else
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<string>("MotCap") == MotCap
                              select myRow;
                }
                DataTable dt2 = new DataTable();

                if (results.Count<DataRow>() > 0)
                {
                    dt2 = results.CopyToDataTable<DataRow>();
                    string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                    return json;
                }
                else
                {
                    return "No se encontró filtros de combustible para el modelo especificado";
                }

                //dt2 = results.CopyToDataTable<DataRow>();
                //string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                //return json;
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
        //Nombre WS: GetFAirAC.
        //Fecha de creación: 27/09/2016.
        //Función: Obtiene los datos de la tabla M_FILTROS para los filtros
        //         de gasolina.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFAirAC(int Id_RefMk, double McilL, string MotCap)
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
                cmd.CommandText = "AirAC";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_FILTROS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if (McilL != 0)
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<double>("McilL") == McilL
                              select myRow;
                }
                else
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<int>("Id_RefMk") == Id_RefMk && myRow.Field<string>("MotCap") == MotCap
                              select myRow;
                }
                DataTable dt2 = new DataTable();

                if (results.Count<DataRow>() > 0)
                {
                    dt2 = results.CopyToDataTable<DataRow>();
                    string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                    return json;
                }
                else {
                    return "No se encontró filtros de aire acondicionado para el modelo especificado";
                }

            }

            catch (InvalidCastException ex)
            {
                return "Error";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetFiltro.
        //Fecha de creación: 26/09/2016.
        //Función: Obtiene información de la tabla M_FILTROS.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFiltro(string PF_Ref)
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
                cmd.CommandText = "eme_Filtro";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "M_FILTROS";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<string>("PF_Ref") == PF_Ref
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


        //-------------------------------------------------------------------
        //Nombre WS: GetSr_Referencias.
        //Fecha de creación: 29/09/2016.
        //Función: Obtiene información de la tabla SRREFERENCIAS.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSr_Referencias(string PF_Ref)
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
                cmd.CommandText = "sr_referencias";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SRREFERENCIAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<string>("PREMIUM Ref") == PF_Ref
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


        //-------------------------------------------------------------------
        //Nombre WS: GetSr_Fichas.
        //Fecha de creación: 30/09/2016.
        //Función: Obtiene la ficha técnica de los filtros.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSr_Fichas(string PF_Ref, string Tipo)
        {
            string sPF_Ref = PF_Ref.ToUpper();
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
                cmd.CommandText = "sr_fichas";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SR_FICHAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if (!string.IsNullOrEmpty(sPF_Ref))
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<string>("PREMIUM Ref") == sPF_Ref && myRow.Field<string>("Tipo") == Tipo
                              select myRow;
                }
                else
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<string>("Tipo") == Tipo
                              select myRow;
                }

                DataTable dt2 = new DataTable();

                if (results.Count<DataRow>() > 0)
                {
                    dt2 = results.CopyToDataTable<DataRow>();
                    string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                    return json;
                }
                else
                {
                    return "No se encontró filtros para el parámetro especificado";
                }

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
        //Nombre WS: GetNumberPage.
        //Fecha de creación: 02/10/2016.
        //Función: Obtiene la ficha técnica de los filtros.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNumberPage(string PF_Ref, string Tipo)
        {
            double nResul;
            int nResul2;
            int nCount;
            int nRecordsPage;
            string sResul;
            string json2;

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
                cmd.CommandText = "sr_fichas";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SR_FICHAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if (!string.IsNullOrEmpty(PF_Ref))
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<string>("PREMIUM Ref") == PF_Ref && myRow.Field<string>("Tipo") == Tipo
                              select myRow;
                }
                else
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<string>("Tipo") == Tipo
                              select myRow;
                }

                DataTable dt2 = new DataTable();

                nCount = results.Count<DataRow>();
                nRecordsPage = Convert.ToInt32(ConfigurationManager.AppSettings["RecordsPage"].ToString());


                if (nCount > 0)
                {
                    nResul = nCount / nRecordsPage;
                    nResul2 = (int)Math.Ceiling(nResul);
                    string json = string.Empty; 

                    for (int i = 1; i <= nResul2; i++)
                    {
                        if (i == nResul2)
                        {
                            json += "{\"Numero\":" + i.ToString() + ",\"Cantidad\":" + nResul2.ToString() + "}";
                        }
                        else {
                            json += "{\"Numero\":" + i.ToString() + ",\"Cantidad\":" + nResul2.ToString() + "},"; 
                        }
                    }

                    json2 = "[" + json + "]";
                    return json2;
                }
                else
                {
                    return "No se encontró filtros para el parámetro especificado";
                }

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
        //Nombre WS: GetSr_Fichas.
        //Fecha de creación: 30/09/2016.
        //Función: Obtiene la ficha técnica de los filtros.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MovePage(string PF_Ref, string Tipo, string Page)
        {
            int nPage = Convert.ToInt32(Page);
            int nRecordsPage = Convert.ToInt32(ConfigurationManager.AppSettings["RecordsPage"].ToString());
            int nSkip = (nPage - 1) * nRecordsPage;

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
                cmd.CommandText = "sr_fichas";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SR_FICHAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if (!string.IsNullOrEmpty(PF_Ref))
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<string>("PREMIUM Ref") == PF_Ref && myRow.Field<string>("Tipo") == Tipo
                              select myRow;
                    results = results.Skip(nSkip).Take(nRecordsPage);
                }
                else
                {
                    results = from myRow in dt.AsEnumerable()
                              where myRow.Field<string>("Tipo") == Tipo
                              select myRow;

                    results = results.Skip(nSkip).Take(nRecordsPage);
                }

                DataTable dt2 = new DataTable();

                if (results.Count<DataRow>() > 0)
                {
                    dt2 = results.CopyToDataTable<DataRow>();
                    string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                    return json;
                }
                else
                {
                    return "No se encontró filtros para el parámetro especificado";
                }

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