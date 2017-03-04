console.log("Ticky Running! v0.2.0");

var uniqueTickers = [];
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

for (var i = 0; i < tickersOnPage.length; i++) {
    if ($.inArray(tickersOnPage[i], uniqueTickers) == -1) {
        uniqueTickers.push(tickersOnPage[i]);
    }
}

chrome.storage.local.set({
    'tickers': uniqueTickers
});

console.log("Ticky found a few stock tickers on the page: " + uniqueTickers);
