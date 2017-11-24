function sendFindRequest() {
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8081/ojol/find");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                findOrder();
            } else {
                alert(request.responseText);
            }
        }
    };
    console.log(request.readyState);
    request.send("driverId=1");
}

function findOrder() {
    var findButton = document.getElementById("find-button");
    var status = document.getElementById("finding-status");

    if (findButton.classList.contains("btn-active")) {
        findButton.classList.remove("btn-active");
        findButton.classList.add("btn-inactive");
        findButton.innerHTML = "FIND ORDER";
        status.innerHTML = "";
    } else {
        findButton.classList.remove("btn-inactive");
        findButton.classList.add("btn-active");
        findButton.innerHTML = "CANCEL";
        status.innerHTML = "Finding order...";
    }
}