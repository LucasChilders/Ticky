// File IO?

function loadTable() {
    for (var i = 0; i < uniqueTickers.length; i++) {
        var markup = "<tr><td>" + uniqueTickers + "</td><td>PRICE</td></tr>";
        $("table tbody").append(markup);
    }
}
