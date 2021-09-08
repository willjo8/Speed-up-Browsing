/*global chrome, console*/
var cache = '2592000'
var cacheForce = false

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({
    cache: cache,
    cacheForce: cacheForce
  })
})

chrome.storage.local.get(function (obj) {
  if (!obj.cache || !obj.cacheForce) return

  cache = obj.cache
  cacheForce = !!obj.cacheForce
})

chrome.webRequest.onHeadersReceived.addListener(
  function(obj) {
    var headers = obj.responseHeaders,
      cont = false

    for (var i = 0; i < headers.length && !cont; i = i + 1) {
      var flag = headers[i].name.toLowerCase()
      if (flag === 'cache-control') {
        if (cacheForce) {
          headers.splice(i, 1)
        } else {
          cont = true
        }

        break
      }
    }

    if (!cont) {
      headers.push({
        name: 'cache-control',
        value: 'private, max-age=' + cache
      })
    }

    return {
      responseHeaders: headers
    }
  },
  {
    urls: ['<all_urls>']
  },
  ['blocking', 'responseHeaders']
)
