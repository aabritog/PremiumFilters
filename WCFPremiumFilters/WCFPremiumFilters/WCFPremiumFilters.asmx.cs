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
        //Función: Carga el combo Tipo de Aplicación.
        //Modulo App: Catálogo.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetTipoAplicacion(string sIdioma)
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
                //Si el idiona corresponde a español.
                if ((string.IsNullOrEmpty(sIdioma)) || (sIdioma == "e"))
                    { 
                        cmd.CommandText = "Type"; 
                    }
                //Si el idiona corresponde a ingles.
                else 
                    {
                        cmd.CommandText = "TypeEN";                 
                    }
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
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetMarcaVehiculo.
        //Fecha de creación: 23/09/2016.
        //Función: Carga el combo Marca Vehículo.
        //Modulo App: Catálogo.
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
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetModelo.
        //Fecha de creación: 24/09/2016.
        //Función: Carga el combo Modelo.
        //Modulo App: Catálogo.
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
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetCilindraje.
        //Fecha de creación: 24/09/2016.
        //Función: Carga el combo Cilindraje.
        //Modulo App: Catálogo.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetCilindraje(int Id_RefMk, int Id_TMk, string sIdioma)
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

                //Si el idiona corresponde a español.
                if ((string.IsNullOrEmpty(sIdioma)) || (sIdioma == "e"))
                {

                    if (Id_TMk == 1 || Id_TMk == 4)
                    {
                        cmd.CommandText = "Motor";
                    }
                    else
                    {
                        cmd.CommandText = "MotorBig";
                    }                    
                }
                //Si el idiona corresponde a ingles.
                else
                {
                    if (Id_TMk == 1 || Id_TMk == 4)
                    {
                        cmd.CommandText = "MotorEN";
                    }
                    else
                    {
                        cmd.CommandText = "MotorBigEN";
                    }
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
        //Función: Obtiene los datos del filtro de aire específicado.
        //Modulo App: Catálogo.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFAire(int Id_RefMk, double McilL, string MotCap, string sIdioma)
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
                //Si el idiona corresponde a español.
                if ((string.IsNullOrEmpty(sIdioma)) || (sIdioma == "e"))
                {
                    cmd.CommandText = "Air";
                }
                //Si el idiona corresponde a ingles.
                else
                {
                    cmd.CommandText = "AirEN";
                }
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
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetFOil.
        //Fecha de creación: 27/09/2016.
        //Función: Obtiene los datos del filtro de aceite específicado.
        //Modulo App: Catálogo.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFOil(int Id_RefMk, double McilL, string MotCap, string sIdioma)
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
                //Si el idiona corresponde a español.
                if ((string.IsNullOrEmpty(sIdioma)) || (sIdioma == "e"))
                {
                    cmd.CommandText = "Oil";
                }
                //Si el idiona corresponde a ingles.
                else
                {
                    cmd.CommandText = "OilEN";
                }
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
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetFFuel.
        //Fecha de creación: 27/09/2016.
        //Función: Obtiene los datos del filtro de combustible específicado.
        //Modulo App: Catálogo.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFFuel(int Id_RefMk, double McilL, string MotCap, string sIdioma)
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
                //Si el idiona corresponde a español.
                if ((string.IsNullOrEmpty(sIdioma)) || (sIdioma == "e"))
                {
                    cmd.CommandText = "Fuel";
                }
                //Si el idiona corresponde a ingles.
                else
                {
                    cmd.CommandText = "FuelEN";
                }
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
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetFAirAC.
        //Fecha de creación: 27/09/2016.
        //Función: Obtiene los datos del filtro de AC específicado.
        //Modulo App: Catálogo.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFAirAC(int Id_RefMk, double McilL, string MotCap, string sIdioma)
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
                //Si el idiona corresponde a español.
                if ((string.IsNullOrEmpty(sIdioma)) || (sIdioma == "e"))
                {
                    cmd.CommandText = "AirAC";
                }
                //Si el idiona corresponde a ingles.
                else
                {
                    cmd.CommandText = "AirACEN";
                }
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
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetFiltro.
        //Fecha de creación: 26/09/2016.
        //Función: Obtiene los datos del filtro específicado segun la referencia.
        //Modulo App: Catálogo.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetFiltro(string PF_Ref, string sIdioma)
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
                //Si el idiona corresponde a español.
                if ((string.IsNullOrEmpty(sIdioma)) || (sIdioma == "e"))
                {
                    cmd.CommandText = "eme_Filtro";
                }
                //Si el idiona corresponde a ingles.
                else
                {
                    cmd.CommandText = "eme_FiltroEN";
                }
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
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetSr_Referencias.
        //Fecha de creación: 29/09/2016.
        //Función: Obtiene información para la busqueda por referencia.
        //Modulo App: Ref Premium.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSr_Referencias(string PF_Ref)
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
                cmd.CommandText = "sr_referencias";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SRREFERENCIAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<string>("PREMIUM Ref") == sPF_Ref
                                               select myRow;

                DataTable dt2 = new DataTable();
                dt2 = results.CopyToDataTable<DataRow>();
                string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                return json;
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetSr_Fichas.
        //Fecha de creación: 30/09/2016.
        //Función: Obtiene la ficha técnica del filtro específicado.
        //Modulo App: Fichas Técnicas.
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
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetNumberPage.
        //Fecha de creación: 02/10/2016.
        //Función: Obtiene el número de paginas que compone la paginación.
        //Modulo App: Fichas Técnicas.
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
        //Nombre WS: MovePage.
        //Fecha de creación: 30/09/2016.
        //Función: Obtiene la ficha técnica del filtro seleccionado con el manejo 
        //         de la paginación.
        //Modulo App: Fichas Técnicas.
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
                    return "El proceso de paginación no genero resultados";
                }

            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }

        
        //-------------------------------------------------------------------
        //Nombre WS: GetSt_CompetidoresRef.
        //Fecha de creación: 11/10/2016.
        //Función: Obtiene la informacíon de las equivalencias.
        //Modulo App: Equivalencias.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSt_CompetidoresRef(string OtraRef)
        {
            string sOtraRef = OtraRef.ToUpper();
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
                cmd.CommandText = "st_competidoresref";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "ST_COMPETIDORESREF";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<string>("Otra Ref") == sOtraRef
                                               select myRow;

                DataTable dt2 = new DataTable();
                //dt2 = results.CopyToDataTable<DataRow>();

                if (results.Count<DataRow>() > 0)
                    {
                        dt2 = results.CopyToDataTable<DataRow>();
                        string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                        return json;
                    }
                else
                    {
                        return "No se encontró resultados para el parámetro indicado";
                    }
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetEme_Aplicaciones.
        //Fecha de creación: 11/10/2016.
        //Función: Obtiene la informacíon de las aplicaciones desde el módulo
        //         equivalencia.
        //Modulo App: Equivalencias.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEme_Aplicaciones(string Pf_Ref)
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
                cmd.CommandText = "eme_Aplicaciones";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "EME_APLICACIONES";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<string>("Pf_Ref") == Pf_Ref
                                               select myRow;

                DataTable dt2 = new DataTable();
                dt2 = results.CopyToDataTable<DataRow>();
                string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                return json;
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }

        //-------------------------------------------------------------------
        //Nombre WS: GetEme_Equivalencias.
        //Fecha de creación: 11/10/2016.
        //Función: Obtiene la informacíon de las equivalencias desde el módulo
        //         Aplicaciones - Todas.
        //Modulo App: Aplicaciones - Todas.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetEme_Equivalencias(string Pf_Ref)
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
                cmd.CommandText = "eme_Equivalencias";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "EME_EQUIVALENCIAS";
                sda.Fill(dt);

                IEnumerable<DataRow> results = from myRow in dt.AsEnumerable()
                                               where myRow.Field<string>("Pf_Ref") == Pf_Ref
                                               select myRow;

                DataTable dt2 = new DataTable();
                dt2 = results.CopyToDataTable<DataRow>();
                string json = JsonConvert.SerializeObject(dt2, Formatting.Indented);
                return json;
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


        //-------------------------------------------------------------------
        //Nombre WS: GetSr_Allfilters.
        //Fecha de creación: 11/10/2016.
        //Función: Obtiene la informacíon de los filtros.
        //Modulo App: Aplicaciones - Todas.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetSr_Allfilters()
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
                cmd.CommandText = "sr_allfilters";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SR_ALLFILTERS";
                sda.Fill(dt);
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                return json;
            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }



        //-------------------------------------------------------------------
        //Nombre WS: GetNumberPage.
        //Fecha de creación: 02/10/2016.
        //Función: Obtiene el número de paginas que compone la paginación.
        //Modulo App: Fichas Técnicas.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetNumberPageAllfillters(string Tipo)
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
                cmd.CommandText = "sr_allfilters";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SR_ALLFILTERS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                if ((Tipo == "1") || (string.IsNullOrEmpty(Tipo)))
                {
                    results = from myRow in dt.AsEnumerable()
                              //where myRow.Field<string>("Tipo") == Tipo && myRow.Field<string>("Tipo") == Tipo
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
                        else
                        {
                            json += "{\"Numero\":" + i.ToString() + ",\"Cantidad\":" + nResul2.ToString() + "},";
                        }
                    }

                    json2 = "[" + json + "]";
                    return json2;
                }
                else
                {
                    return "Proceso no genero resultados";
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
        //Nombre WS: MovePage.
        //Fecha de creación: 30/09/2016.
        //Función: Obtiene la ficha técnica del filtro seleccionado con el manejo 
        //         de la paginación.
        //Modulo App: Fichas Técnicas.
        //-------------------------------------------------------------------
        [WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string MovePageAllfillters(string Page, string Tipo)
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
                cmd.CommandText = "sr_allfilters";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                sda.SelectCommand = cmd;
                dt.TableName = "SR_ALLFILTERS";
                sda.Fill(dt);

                IEnumerable<DataRow> results;

                //if (!string.IsNullOrEmpty(PF_Ref))
                //{
                if ((Tipo == "1") || (string.IsNullOrEmpty(Tipo)))
                {
                    results = from myRow in dt.AsEnumerable()
                              //          where myRow.Field<string>("PREMIUM Ref") == PF_Ref && myRow.Field<string>("Tipo") == Tipo
                              select myRow;
                    results = results.Skip(nSkip).Take(nRecordsPage);
                }
                else {

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
                    return "El proceso de paginación no genero resultados";
                }

            }

            catch (Exception ex)
            {
                return "Error en el proceso";
            }
            finally
            {
                con.Close();
            }
        }


    }
}
