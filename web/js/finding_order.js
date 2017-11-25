function sendFindRequest() {
    var request = new XMLHttpRequest();
    var driverId = document.getElementById("idUserAktif").innerHTML;
    request.open("POST", "find");
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
    request.send("driverId="+driverId);
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