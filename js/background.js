/*global chrome, console*/
let cache = '2592000'
let cacheForce = false

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
    let headers = obj.responseHeaders
    let cont = false

    for (let i = 0; i < headers.length && !cont; i = i + 1) {
      let flagName = headers[i].name.toLowerCase()
      // let flagValue = headers[i].value.toLowerCase()

      if (flagName === 'cache-control') {
        if (cacheForce) {
          headers.splice(i, 1)
        } else {
          cont = true
        }

        break
      }
      // else if (flagName === 'content-type') {
      //   console.log(flagValue)
      // }
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
