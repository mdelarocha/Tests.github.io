function getSearch() {
    var x = document.getElementById("frm1");
    var text = "";
    for (var i = 0; i < x.length ;i++) {
        text += x.elements[i].value + "<br>";
    }
    document.getElementById("demo").innerHTML = text;
}
