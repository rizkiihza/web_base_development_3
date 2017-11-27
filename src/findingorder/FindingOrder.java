package findingorder;

import database.MySQLconnect;

import java.sql.*;

public class FindingOrder {
    static void changeDriverFindingStatus(String driverId) {
        Connection connection = null;

        try {
            MySQLconnect.connect();
            connection = MySQLconnect.getConn();
            Statement stmt = connection.createStatement();
            String query = "SELECT is_finding FROM find_order WHERE ID="+driverId;

            int status = 0;
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                status = rs.getInt("is_finding");
            }

            String changeQuery = "UPDATE find_order SET is_finding=? WHERE ID="+driverId;
            PreparedStatement psmt = connection.prepareStatement(changeQuery);
            if (status == 0) {
                psmt.setInt(1, 1);
            } else {
                psmt.setInt(1, 0);
            }
            psmt.executeUpdate();
            System.out.println("Updated.");

            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
