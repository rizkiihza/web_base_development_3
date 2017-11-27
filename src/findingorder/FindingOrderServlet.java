package findingorder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static findingorder.FindingOrder.changeDriverFindingStatus;

public class FindingOrderServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String driverId = req.getParameter("driverId");
        System.out.println(driverId);
        PrintWriter output = resp.getWriter();
        if (driverId != null) {
            changeDriverFindingStatus(driverId);
            resp.setStatus(200);
            output.write("Status changed.");
        } else {
            resp.setStatus(404);
            output.write("Driver not found.");
        }

        output.close();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        CurrentOrder.deleteCurrentOrder();
        PrintWriter output = resp.getWriter();
        resp.setStatus(200);
        output.write("Cleared.");
    }
}
