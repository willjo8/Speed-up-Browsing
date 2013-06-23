function save() {
	var txt_cache = document.getElementById("txt_cache"), st = document.getElementById("txt_status");
	chrome.extension.getBackgroundPage().txt_cache = localStorage.txt_cache = txt_cache.value;
	st.innerHTML = "Settings saved...";
	window.setTimeout(function () {
		st.innerHTML = "";
	}, 1500);
}
function exit() {
	chrome.tabs.getCurrent(function (tab) {
		chrome.tabs.remove(tab.id, function () { });
	});
}
function restore_options() {
	document.getElementById("txt_cache").value = localStorage.txt_cache;
}
window.onload = function () {
	restore_options();
	document.getElementById("btn_save").onclick = function () {
		save();
	};
	document.getElementById("btn_exit").onclick = function () {
		exit();
	};
};
