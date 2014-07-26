chrome.webRequest.onHeadersReceived.addListener(function (object) {
    'use strict';
    if (object) {
        var object_type = object.type.toLowerCase();
        if ((object_type !== 'main_frame') && (object_type !== 'sub_frame') && (object_type !== 'xmlhttprequest')) {
            var headers = object.responseHeaders,
                len = headers.length - 1,
                f = false,
                elem = null;
            do {
                elem = headers[len].name.toLowerCase();
                if (elem === 'cache-control') {
                    headers.push({
                        'name': 'Cache-Control',
                        'value': 'private, max-age=' + txt_cache
                    });
                    return {
                        responseHeaders: headers
                    };
                }
            } while (!f && len--);
        }
    }
}, {
    urls: ['http://*/*']
}, ['blocking', 'responseHeaders']);
var txt_cache = '604800';
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({
        'txt_cache': '604800'
    });
});
chrome.storage.local.get(function (object) {
    txt_cache = object['txt_cache'];
});
/*
function test(headers, object_type) {
	console.log("__________________________" + object_type + "___________________________");
	for (var i = 0, ln = headers.length; i < ln; i++) {
		if (headers[i].name.toLowerCase() === "cache-control") {
			console.log(headers[i].name + ":" + headers[i].value);
		}
	}
}
*/
