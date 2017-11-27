package findingorder;

import database.MySQLconnect;

import java.sql.*;

public class CurrentOrder {
    public static void setCurrentOrder(String driverId, String custId) {
        Connection connection = null;

        try {
            MySQLconnect.connect();
            connection = MySQLconnect.getConn();
            String query = "INSERT INTO current_order VALUES (?,?)";
            PreparedStatement pstmt = connection.prepareStatement(query);

            pstmt.setInt(1, Integer.parseInt(driverId));
            pstmt.setInt(2, Integer.parseInt(custId));

            pstmt.executeUpdate();

            pstmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void deleteCurrentOrder() {
        Connection connection = null;

        try {
            MySQLconnect.connect();
            connection = MySQLconnect.getConn();
            String query = "DELETE FROM current_order";
            PreparedStatement pstmt = connection.prepareStatement(query);
            pstmt.execute(query);

            pstmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static String getCurrentOrder(String driverId) {
        Connection connection = null;
        String custId = "";

        try {
            MySQLconnect.connect();
            connection = MySQLconnect.getConn();
            String query = "SELECT * FROM current_order WHERE id_driver="+driverId;
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            if (rs.next()) {
                Integer cust = rs.getInt("id_cust");
                custId = cust.toString();
            }

            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }

        return custId;
    }
}
