using Cay.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Cay.Helper
{
    public class DBHelper
    {
        public static string con = "Server=qds107935680.my3w.com;Database=qds107935680_db;user id=qds107935680;password=30155767;";
        public static SqlConnection conn = null; //  数据库连接对象。实现和数据库的连接
        public static SqlCommand cmd = null;  //  数据库连接命令对象。指定执行的SQL语句
        public static string sql = null;   // 存放SQL语句的。
        public static void ExecuteSQL(string sql)
        {
            conn = new SqlConnection(con);
            conn.ConnectionString = con;
            conn.Open();
            cmd = new SqlCommand(sql, conn);
            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (SqlException ae)
            {
            }
            finally
            {
                conn.Close();
            }
        }
        public static void CreateDB(string db_name) {
            conn = new SqlConnection(con);
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }
            string sql = "CREATE DATABASE " + db_name + " ON PRIMARY";
            cmd = new SqlCommand(sql, conn);
            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (SqlException ae)
            {

            }
            finally
            {
                conn.Close();
            }
        }
        public static void InsertPhoto(int pId,string Title,string Name,string Type) {
            conn = new SqlConnection(con);
            conn.ConnectionString = con;
            conn.Open();
            sql = "INSERT INTO MyPhoto(pId, Title,Name, Type, time) " +
              "VALUES ('" + pId + "','" + Title + "', '" + Name + "', '" + Type + "','" + DateTime.Now.ToString()+"' )";
            cmd = new SqlCommand(sql, conn);
            try
            {
                cmd.ExecuteNonQuery();
                // 创建数据适配器
                SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM MyPhoto", conn);
                DataSet ds = new DataSet();
                da.Fill(ds);
            }
            catch (SqlException ae)
            {

            }
            finally {
                conn.Close();
            }
        }
        /// <summary>
        /// 更新表结构
        /// </summary>
        /// <param name="db_name">数据库名称</param>
        /// <param name="Table">表名</param>
        /// <param name="add">ADD：添加字段 or DROP：删除字段</param>
        /// <param name="value"></param>
        public static void UpdateTable(string Table,string add,string value) {
            sql = "ALTER TABLE " + Table + " " + add + " " +
  value;
            ExecuteSQL(sql);
        }
        public static List<Photo> SelectPhoto()
        {
            sql = "Select * FROM MyPhoto";
            conn = new SqlConnection(con);
            conn.ConnectionString = con;
            conn.Open();
            cmd = new SqlCommand(sql, conn);
            List<Photo> model = new List<Photo>();
            try
            {
                SqlDataReader sd=cmd.ExecuteReader();
                while (sd.Read())
                {
                    // 读取两个列值并输出到Label中
                    Photo temp = new Photo();
                    temp.pId = Convert.ToInt32(sd["pId"]);
                    temp.Title =  Convert.ToString(sd["Title"]);
                    temp.Name = Convert.ToString(sd["Name"]);
                    temp.Type = Convert.ToString(sd["Type"]);
                    temp.time = Convert.ToDateTime(sd["time"]);
                    model.Add(temp);
                }
            }
            catch (SqlException ae)
            {
            }
            finally
            {
                conn.Close();
            }
            return model;
        }
        public static void UpdatePhoto(string pid, string value)
        {
            sql = "Update MyPhoto set " + value + " where pId=" + pid;
            ExecuteSQL(sql);
        }
        public static void DeletePhoto(string pid)
        {
            sql = "Delete from MyPhoto where pId=" + pid;
            ExecuteSQL(sql);
        }
    }
}