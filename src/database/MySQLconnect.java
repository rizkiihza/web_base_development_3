package database;

import java.sql.*;

public class MySQLconnect {
    private static final String JDBCDriver = "com.mysql.cj.jdbc.Driver";
    private static final String DBURL = "jdbc:mysql://localhost/db_ojek?useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = "iqbal";

    private static Connection conn;

    public static void connect() {
        try {
            Class.forName(JDBCDriver).newInstance();

            conn = DriverManager.getConnection(DBURL, USER, PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Connection getConn() {
        return conn;
    }

    //    Testing
//    public static void main(String[] args) throws SQLException {
//        try {
//            connect();
//            Statement stmt = conn.createStatement();
//            String sql = "SELECT * FROM driver";
//            ResultSet rs = stmt.executeQuery(sql);
//
//            while (rs.next()) {
//                int id = rs.getInt("id");
//                String nama = rs.getString("nama_driver");
//                int voter = rs.getInt("voter");
//                float rating = rs.getFloat("rating_ratarata");
//
//                System.out.println(id + ", " + nama + ", " + voter + ", " + rating);
//            }
//
//            rs.close();
//            stmt.close();
//            conn.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (conn != null) conn.close();
//            } catch (SQLException e) {
//                e.printStackTrace();
//            }
//        }
//    }
}
