// File IO?
var tickers;

function getPrice(ticker) {
    var url = 'http://query.yahooapis.com/v1/public/yql';
    var symbol = ticker.split("$")[1];
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data) {
            $('#result').text("Price: " + data.query.results.quote.LastTradePriceOnly);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log('Request failed: ' + err);
        });
}

function loadTable() {
    for (var i = 0; i < tickers.length; i++) {
        getPrice(tickers[i]);
        var markup = "<tr><td>" + tickers[i].split("$")[1] + "</td><td id='price'>PRICE</td></tr>";
        $("table tbody").append(markup);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('tickers', function (items) {
        tickers = items.tickers;
        loadTable();
        console.log(items.tickers); //your data is on items.myVariable
    });
});
