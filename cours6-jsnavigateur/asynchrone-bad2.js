var userName = "";
xhr.open("GET", "/API");
xhr.onload = function() {
    if (xhr.status==200) {
        var parsedData = JSON.parse(xhr.responseText);
        name = parsedData.User.Name;
    }
};
document.getElementById("username").childNodes[0].nodeValue = userName;