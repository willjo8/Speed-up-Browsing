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
                elemName = null,
                obj = {
                    'name': 'cache-control',
                    'value': 'private, max-age=' + txt_cache
                };
            do {
                elemName = headers[len].name.toLowerCase();
                if (elemName === 'cache-control' || elemName === 'expires' || elemName === 'last-modified' || elemName === 'etag' || elemName === 'age') {
                    headers.splice(len, 1);
                }
                len -= 1;
            } while (len !== 0);
            headers.push(obj);
            return {
                responseHeaders: headers
            };
        }
    }, {
        urls: ['<all_urls>']
    }, ['blocking', 'responseHeaders']);
}());
