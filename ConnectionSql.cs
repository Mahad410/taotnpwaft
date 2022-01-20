using System;
using System.Data;
using System.Data.SqlClient;

namespace Sqlconnect
{
    class ConnectionSql
    {
        static void Main(string[] args)
        {
            // Connection string
            string connString = @"
                server = .\sqlexpress;
                integrated security = true;
            ";

            // Create connection
            Sqlconnection conn = new Sqlconnection(connString);
            try {
                // Open connection
                conn.open();
                Console.WriteLine("Connection opened.");
            }
            catch (SqlException e) {
                // Display error
                Console.WriteLine("Error: " + e);
            }
            finally {
                // Close connection
                conn.Close();
                Console.WriteLine("Connection closed.");
            }
        }
    }
}