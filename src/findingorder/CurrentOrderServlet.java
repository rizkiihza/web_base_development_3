package findingorder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static findingorder.CurrentOrder.getCurrentOrder;
import static findingorder.CurrentOrder.setCurrentOrder;
import static findingorder.FindingOrder.changeDriverFindingStatus;

@WebServlet(name = "CurrentOrderServlet")
public class CurrentOrderServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String driverId = request.getParameter("driverId");
        String custId = request.getParameter("custId");
        System.out.println(driverId);
        PrintWriter output = response.getWriter();
        if (driverId != null) {
            setCurrentOrder(driverId, custId);
            response.setStatus(200);
            output.write("Order Set.");
        } else {
            response.setStatus(404);
            output.write("Driver not found.");
        }

        output.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.setStatus(200);
        PrintWriter output = response.getWriter();
        String driverId = request.getParameter("driverId");
        String custId = getCurrentOrder(driverId);
        output.print(custId);
        output.close();
    }
}
