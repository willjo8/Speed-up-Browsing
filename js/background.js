chrome.webRequest.onHeadersReceived.addListener(function (object) {
	var object_type = object.type.toLowerCase();
	if (on && (object_type != "main_frame") && (object_type != "sub_frame") && (object_type != "xmlhttprequest")) {
		var headers = object.responseHeaders, len = headers.length - 1,	f = false, elem = null;
		do {
			elem = headers[len];
			switch (elem.name.toLowerCase()) {
				case "cache-control":
					if (!f) {
						f = true;
						elem.value = 'private, max-age=' + txt_cache;
					} else {						
						headers.splice(len, 1);
					}					
					break;
				case "expires":
				case "last-modified":
				case "etag":
					headers.splice(len, 1);
					break;
				default:
					break;
			}
		} while (len--);
		if (!f) {
			var obj = null;
			obj = {};
			obj.name = "Cache-Control";
			obj.value = 'private, max-age=' + txt_cache;
			headers.push(obj);
		}
		return {
			responseHeaders: headers
		};
	}
}, {
	urls: ["<all_urls>"]
}, ["blocking", "responseHeaders"]);
chrome.browserAction.onClicked.addListener(function () {
	toggleExtension();
});
chrome.runtime.onInstalled.addListener(function (object) {
	localStorage.run = true;
	on = localStorage.on = true;
	icon = localStorage.icon = true;
	txt_cache = localStorage.txt_cache = '604800';
});
function toggleExtension() {
	if (on) {
		chrome.browserAction.setTitle({
			title: "Speed-Up browsing: Disabled"
		});
		chrome.browserAction.setIcon({
			path: 'img/icon_disable.png'
		});
		on = false;
	} else {
		chrome.browserAction.setTitle({
			title: "Speed-Up browsing: Enabled"
		});
		chrome.browserAction.setIcon({
			path: 'img/icon_enable.png'
		});
		on = true;
	}
}

if (localStorage.run) {
	on = localStorage.on;
	icon = localStorage.icon;
	txt_cache = localStorage.txt_cache;
} else {
	localStorage.run = true;
	on = localStorage.on = true;
	icon = localStorage.icon = true;
	txt_cache = localStorage.txt_cache = '604800';
}
function test(headers, object_type) {
	console.log("__________________________" + object_type + "___________________________");
	for (var i = 0, ln = headers.length; i < ln; i++) {
		if (headers[i].name.toLowerCase() === "cache-control") {
			console.log(headers[i].name + ":" + headers[i].value);
		}
	}
}
