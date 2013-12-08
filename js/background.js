/*More aggressive settings, working fine
A test function included to test settings
*/
.webRequest.onHeadersReceived.addListener(function (object) {
	'use strict';
	if (object) {
		var object_type = object.type.toLowerCase();
		if ((object_type !== 'main_frame') && (object_type !== 'sub_frame') && (object_type !== 'xmlhttprequest')) {
			var headers = object.responseHeaders,
			len = headers.length - 1,
			f = false,
			elem = null;
			do {
				elem = headers[len];
				switch (elem.name.toLowerCase()) {
				case 'cache-control':
					if (!f)
						f = true;
					break;
				case 'expires':
				case 'last-modified':
				case 'etag':
					headers.splice(len, 1);
					break;
				default:
					break;
				}
			} while (len--);
			if (!f) {
				var obj = {
					'name' : 'Cache-Control',
					'value' : 'private, max-age=' + txt_cache
				};
				headers.push(obj);
			}
			return {
				responseHeaders : headers
			};
		}
	}
}, {
	urls : ['<all_urls>']
}, ['blocking', 'responseHeaders']);
var txt_cache = '604800';
chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.local.set({
		'txt_cache' : '604800'
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
