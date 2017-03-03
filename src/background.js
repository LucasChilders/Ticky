console.log("Ticky Running! v0.1.0");

var tReg = /(^\$[A-z]{1,5}$)/g;
var tickersOnPage = [];
var illegals = ["$ad"];

var tokens = $('html').text().split(" ");

for (var i = 0; i < tokens.length; i++) {
    if (tReg.test(tokens[i])) {
        if ($.inArray(tokens[i], illegals) != -1) {
            continue;
        }

        tickersOnPage.push(tokens[i]);
    }
}

var uniqueTickers = [];

for (var i = 0; i < tickersOnPage.length; i++) {
    if ($.inArray(tickersOnPage[i], uniqueTickers) == -1) {
        uniqueTickers.push(tickersOnPage[i]);
    }
}

console.log("Ticky found a few stock tickers on the page: " + uniqueTickers);
