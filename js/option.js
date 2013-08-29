function save() {
	var txt_cache = document.getElementById('txt_cache'),
	st = document.getElementById('txt_status');
	chrome.storage.local.set({
		'txt_cache' : txt_cache.value
	});
	chrome.extension.getBackgroundPage().txt_cache = txt_cache.value;
	st.innerHTML = 'Settings saved...';
	window.setTimeout(function () {
		st.innerHTML = '';
	}, 500);
}
function restore_options() {
	chrome.storage.local.get('txt_cache', function (object) {
		document.getElementById('txt_cache').value = object['txt_cache'];
	})
}
window.onload = function () {
	restore_options();
	document.getElementById('btn_save').onclick = function () {
		save();
	};
};
