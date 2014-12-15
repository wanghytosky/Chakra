using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SQLite;
using System.Data.OleDb;

namespace SoldierInfoManager
{
    public partial class Form1 : Form
    {
        string dbConnStr = @"Data Source=./SoldierInfo.db";
        public Form1()
        {
            //todo:
            InitializeComponent();
            var ds = ImportExcelDataToTable(@"d:\excel\test.xls", "SoldierInfo");
            ExportExcel(ds.Tables[0]);
        }

        private void BindData()
        {

        }

        /// <summary>
        /// 查询条件
        /// </summary>
        /// <returns></returns>
        private string GetSearchCondition()
        {
            string conditionString = " WHERE 1=1";
            if (checkBox1.Checked)
            {
                conditionString += " AND SoldierName like'%" + textBox1.Text.Trim()+"%'";
            }

            if (checkBox2.Checked)
            {
                conditionString += " AND BirthDay='" + DateBirthDay.Value.Date.ToString("yyyy-MM-dd")+"'";
            }

            if (checkBox3.Checked)
            {
                conditionString += " AND JoinUpTime='" + DateJoin.Value.Date.ToString("yyyy-MM-dd") + "'";
            }

            if (checkBox4.Checked)
            {
                conditionString += " AND LeaveArmyTime='" + DateLeave.Value.Date.ToString("yyyy-MM-dd") + "'";
            }

            if (checkBox5.Checked)
            {
                conditionString += " AND Army like'%" + textBox5.Text.Trim() + "%'";
            }

            if (checkBox6.Checked)
            {
                conditionString += " AND Residence like'%" + textBox7.Text.Trim() + "%'";
            }

            if (checkBox7.Checked)
            {
                conditionString += " AND Residence like'%" + textBox6.Text.Trim() + "%'";
            }

            if (radioButton1.Checked)
            {
                conditionString += " ORDER BY 1";
            }
            else
            {
                conditionString += " ORDER BY 1 DESC";
            }

            return conditionString;
        }

        private DataSet ImportExcelDataToTable(string filenameurl, string table)
        {
            string strConn = "Provider=Microsoft.Jet.OleDb.4.0;" + "data source=" + filenameurl + ";Extended Properties='Excel 8.0; HDR=YES; IMEX=1'";
            OleDbConnection conn = new OleDbConnection(strConn);
            try
            {
                conn.Open();
                DataSet ds = new DataSet();
                OleDbDataAdapter odda = new OleDbDataAdapter("select * from [Sheet1$]", conn);
                odda.Fill(ds, table);
                conn.Close();
                return ds;
            }
            finally
            {
                conn.Close();
            }
        }

        protected void ExportExcel(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0) return;
            Microsoft.Office.Interop.Excel.Application xlApp = new Microsoft.Office.Interop.Excel.Application();
            if (xlApp == null)
            {
                return;
            }
            System.Globalization.CultureInfo CurrentCI = System.Threading.Thread.CurrentThread.CurrentCulture;
            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en-US");
            Microsoft.Office.Interop.Excel.Workbooks workbooks = xlApp.Workbooks;
            Microsoft.Office.Interop.Excel.Workbook workbook = workbooks.Add(Microsoft.Office.Interop.Excel.XlWBATemplate.xlWBATWorksheet);
            Microsoft.Office.Interop.Excel.Worksheet worksheet = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Worksheets[1];
            Microsoft.Office.Interop.Excel.Range range;
            long totalCount = dt.Rows.Count;
            long rowRead = 0;
            float percent = 0;
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                worksheet.Cells[1, i + 1] = dt.Columns[i].ColumnName;
                range = (Microsoft.Office.Interop.Excel.Range)worksheet.Cells[1, i + 1];
                range.Interior.ColorIndex = 15;
                range.Font.Bold = true;
            }
            for (int r = 0; r < dt.Rows.Count; r++)
            {
                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    worksheet.Cells[r + 2, i + 1] = dt.Rows[r][i].ToString();
                }
                rowRead++;
                percent = ((float)(100 * rowRead)) / totalCount;
            }
            xlApp.ActiveWorkbook.SaveCopyAs(@"D:\excel\testTo.xls");
        }

        private void SQLiteDBManage()
        {
            SQLiteConnection sqlcon = new SQLiteConnection(@"Data Source=./test_console.db");
            try
            {
                if (sqlcon.State != ConnectionState.Open)
                {
                    sqlcon.Open();
                }
                string sqlInsertStr = "INSERT INTO SoldierInfo(NAME,AGE)VALUES('张倩',27)";
                SQLiteCommand cmdInsert = new SQLiteCommand(sqlInsertStr, sqlcon);
                cmdInsert.ExecuteNonQuery();

                string sqlSelectStr = "SELECT * FROM TestTable";
                SQLiteDataAdapter adapter = new SQLiteDataAdapter(sqlSelectStr, sqlcon);
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow row = null;
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        row = ds.Tables[0].Rows[i];
                        Console.WriteLine("编号:" + row["ID"] + "  姓名：" + row["Name"] + " 年龄:" + row["Age"]);
                    }
                }
                Console.ReadKey();
            }
            catch (Exception ex)
            {
                //TODO:日志
            }
            finally
            {
                sqlcon.Close();
            }
        }

        private void dataGridViewX1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox6_TextChanged(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button2_Click(object sender, EventArgs e)
        {
            SQLiteConnection sqlcon = new SQLiteConnection(dbConnStr);
            try
            {
                string name = textBox1.Text.Trim();
                string birthday = DateBirthDay.Value.Date.ToString("yyyy-MM-dd");
                string joinup = DateJoin.Value.Date.ToString("yyyy-MM-dd");
                string dateleave = DateLeave.Value.Date.ToString("yyyy-MM-dd");
                string army = textBox5.Text.Trim();
                string residence = textBox7.Text.Trim();
                string distribution = textBox6.Text.Trim();
                
                if (!ConfirmButton("您确定要添加数据吗？","数据添加"))
                {
                    return;
                }
                if (sqlcon.State != ConnectionState.Open)
                {
                    sqlcon.Open();
                }
                string sqlInsertStr = "INSERT INTO SoldierInfo(SoldierName,Birthday,JoinUpTime,LeaveArmyTime,Army,Distribution,Residence) VALUES ('" + name + "','" + birthday + "','" + joinup + "','" + dateleave + "','" + army + "','" + distribution + "','" + residence + "')";
                SQLiteCommand cmdInsert = new SQLiteCommand(sqlInsertStr, sqlcon);
                cmdInsert.ExecuteNonQuery();
                NoticeButton("添加成功!", "添加信息");
            }
            catch (Exception ex)
            {
                //TODO:日志
            }
            finally
            {
                sqlcon.Close();
            }
        }

        private void radioButton7_CheckedChanged(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button3_Click(object sender, EventArgs e)
        {
            SQLiteConnection sqlcon = new SQLiteConnection(dbConnStr);
            try
            {
                string sqlSelectStr = "SELECT * FROM SoldierInfo" + GetSearchCondition();
                SQLiteDataAdapter adapter = new SQLiteDataAdapter(sqlSelectStr, sqlcon);
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                dataGridViewX1.DataSource = ds.Tables[0];
                label9.Text = ds.Tables[0].Rows.Count.ToString();
            }
            catch (Exception ex)
            {
                //TODO:日志
            }
            finally 
            {
                sqlcon.Close();
            }
        }

        private bool NoticeButton(string msgContent, string title)
        {
            MessageBoxButtons messButton = MessageBoxButtons.OK;
            DialogResult dr = MessageBox.Show(msgContent, title, messButton);
            if (dr == DialogResult.OK)
            {
                return true;
            }
            else
            {
                return true;
            }
        }

        private bool ConfirmButton(string msgContent,string title)
        {
            //消息框中需要显示哪些按钮，此处显示“确定”和“取消”
            MessageBoxButtons messButton = MessageBoxButtons.OKCancel;
            //"确定要退出吗？"是对话框的显示信息，"退出系统"是对话框的标题
            //默认情况下，如MessageBox.Show("确定要退出吗？")只显示一个“确定”按钮。
            DialogResult dr = MessageBox.Show(msgContent, title, messButton);
            if (dr == DialogResult.OK)//如果点击“确定”按钮
            {
                return true;
            }
            else//如果点击“取消”按钮
            {
                return false;
            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button6_Click(object sender, EventArgs e)
        {
            if (!ConfirmButton("数据一旦删除便不能恢复,确定要删除数据吗？","删除数据"))
            {
                return;
            }
            string id = string.Empty;
            foreach (DataGridViewRow item in dataGridViewX1.SelectedRows)
            {
                id = item.Cells["ID"].Value.ToString();
            }

            SQLiteConnection sqlcon = new SQLiteConnection(dbConnStr);
            try
            {
                if (sqlcon.State != ConnectionState.Open)
                {
                    sqlcon.Open();
                }
                string sqlDeleteStr = "DELETE FROM SoldierInfo WHERE ID="+id;
                SQLiteCommand cmdInsert = new SQLiteCommand(sqlDeleteStr, sqlcon);
                cmdInsert.ExecuteNonQuery();
                NoticeButton("已删除", "删除信息");
            }
            catch
            {
                //TODO:日志
            }
            finally
            {
                sqlcon.Close();
            }
        }

        private void dataGridViewX1_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            DataGridViewRow row=dataGridViewX1.Rows[e.RowIndex];
            textBox1.Text = row.Cells["SoldierName"].Value.ToString();
            DateBirthDay.Value = Convert.ToDateTime(row.Cells["Birthday"].Value.ToString());
            DateJoin.Value = Convert.ToDateTime(row.Cells["JoinUpTime"].Value.ToString());
            DateLeave.Value = Convert.ToDateTime(row.Cells["LeaveArmyTime"].Value.ToString());
            textBox5.Text = row.Cells["Army"].Value.ToString();
            textBox7.Text = row.Cells["Residence"].Value.ToString();
            textBox6.Text = row.Cells["Distribution"].Value.ToString();

        }
    }
}
