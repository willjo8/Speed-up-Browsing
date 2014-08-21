/*global chrome, console*/
(function () {
    'use strict';
    var txt_cache = '31536000';
    chrome.runtime.onInstalled.addListener(function () {
        chrome.storage.local.set({
            'txt_cache': '31536000'
        });
    });
    chrome.storage.local.get(function (object) {
        txt_cache = object.txt_cache;
    });
    chrome.webRequest.onHeadersReceived.addListener(function (object) {
        if (object) {
            var object_type = object.type.toLowerCase(),
                headers = object.responseHeaders,
                len = headers.length - 1,
                tag = null,
                obj = {
                    'name': 'cache-control',
                    'value': 'private, max-age=' + txt_cache
                };
            do {
                tag = headers[len].name.toLowerCase();
                if (tag === 'cache-control' || tag === 'expires' || tag === 'last-modified' || tag === 'etag' || tag === 'age') {
                    headers.splice(len, 1);
                }
                len -= 1;
            } while (len > 0);
            headers.push(obj);
            return {
                responseHeaders: headers
            };
        }
    }, {
        urls: ['<all_urls>']
    }, ['blocking', 'responseHeaders']);
}());
