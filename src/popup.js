var tickers;
var prices = {};
var change = {};

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// Need to bundle all calls together
function getPrice(symbol) {
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22' + symbol + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
    $.getJSON(url, function(data) {
        $.each(data.query.results.quote, function(key, val) {
            if (key == "Ask") {
                prices[symbol] = val;
            }
            if (key == "Change") {
                change[symbol] = val;
            }
        });
    });
}

function updateTable() {
    $("#loading").hide();

    for (var i = 0; i < tickers.length; i++) {
        var cleanedTicker = tickers[i].split("$")[1];

        var price = parseFloat(prices[cleanedTicker]).toFixed(2);
        var changeAmt = parseFloat(change[cleanedTicker]).toFixed(2);

        var markup = "<tr><td id='symbol'>" + cleanedTicker.toUpperCase() + "</td><td id='price'>" + price + "</td><td id='change'>" + changeAmt + "</td></tr>";
        $("table tbody").append(markup);
    }
}

function loadTable() {
    var r = $.Deferred();

    for (var i = 0; i < tickers.length; i++) {
        var cleanedTicker = tickers[i].split("$")[1];
        getPrice(cleanedTicker);
    }

    // Smarter timeout, based on when getPrice returns
    setTimeout(function () {
        r.resolve();
    }, 150 * tickers.length);

    return r;
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get('tickers', function (items) {
        tickers = items.tickers;
        loadTable().done(updateTable);
    });
});
