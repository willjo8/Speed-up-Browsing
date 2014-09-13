(function () {
    'use strict';
    /*global chrome, console*/
    var cache = '2592000';
    chrome.webRequest.onHeadersReceived.addListener(function (obj) {
        var headers = obj.responseHeaders,
            cont = false,
            flag,
            i;
        //Debug code
        //test(headers, 'old');
        if (obj) {
            for (i = 0; i < headers.length && !cont; i = i + 1) {
                flag = headers[i].name.toLowerCase();
                if (flag === 'cache-control') {
                    cont = true;
                    break;
                } else if (flag === 'expires' || flag === 'last-modified' || flag === 'eflag' || flag === 'age') {
                    headers.splice(i, 1);
                }
            }
            if (!cont) {
                headers.push({
                    'name': 'cache-control',
                    'value': 'private, max-age=' + cache
                });
                //Debug code
                //test(headers, 'new');
                return {
                    responseHeaders: headers
                };
            }
        }
    }, {
        urls: ['<all_urls>']
    }, ['blocking', 'responseHeaders']);

    chrome.runtime.onInstalled.addListener(function () {
        cache = '2592000';
        chrome.storage.local.set({
            'cache': cache
        });
    });

    chrome.storage.local.get(function (obj) {
        cache = obj.cache;
    });

    function test(headers, type) {
        var i = 0,
            ln = headers.length;
        console.log("__________________________" + type + "___________________________");
        console.log("Starting...");
        for (i; i < ln; i += 1) {
            if (headers[i].name.toLowerCase() === "cache-control") {
                console.log(headers[i].name + ":" + headers[i].value + ": " + i);
            }
        }
        console.log("Ending...");
        console.log("-----------------------------Exit debug--------------------------------------");
    }
}());