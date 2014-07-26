chrome.webRequest.onHeadersReceived.addListener(function (object) {
    'use strict';
    if (object) {
        var object_type = object.type.toLowerCase();
        if ((object_type !== 'main_frame') && (object_type !== 'sub_frame') && (object_type !== 'xmlhttprequest')) {
            var headers = object.responseHeaders,
                len = headers.length - 1,
                f = false,
                elem = null;
                //Debug code
            	test(headers, object_type, 'old');
            do {
                elem = headers[len].name.toLowerCase();
                if (elem === 'cache-control') {
                    f=true;
                }
            } while (!f && len--);
            if(!f){
            	headers.push({
                        'name': 'Cache-Control',
                        'value': 'private, max-age=' + txt_cache
                    });
                    
	            //Debug code
	            test(headers, object_type, 'new');
	            
	            return {
	                responseHeaders: headers
	            };
            }
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

function test(headers, object_type, type) {
	console.log(type + "__________________________" + object_type + "___________________________");
	for (var i = 0, ln = headers.length; i < ln; i++) {
		if (headers[i].name.toLowerCase() === "cache-control") {
			console.log(headers[i].name + ":" + headers[i].value);
		}
	}
}
