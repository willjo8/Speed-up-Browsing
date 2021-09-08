/*global chrome, console*/
function save() {
  var txt_cache = document.getElementById('txt_cache'),
    cb_cache_force = document.getElementById('cb_cache_force'),
    st = document.getElementById('txt_status')

  chrome.storage.local.set({
    cache: txt_cache.value,
    cacheForce: cb_cache_force.checked
  })

  chrome.extension.getBackgroundPage().cache = txt_cache.value
  chrome.extension.getBackgroundPage().cacheForce = cb_cache_force.checked

  st.innerHTML = 'Settings saved...'
  window.setTimeout(function() {
    st.innerHTML = ''
  }, 1000)
}

function restore_options() {
  chrome.storage.local.get(null, function(object) {
    document.getElementById('txt_cache').value = object.cache
    document.getElementById('cb_cache_force').checked = !!object.cacheForce
  })
}

window.onload = function() {
  restore_options()

  document.getElementById('btn_save').onclick = function() {
    save()
  }
}
