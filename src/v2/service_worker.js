async function sendToClipboard(text) {
	await chrome.offscreen.createDocument({
		url: 'offscreen.html',
		reasons: [chrome.offscreen.Reason.CLIPBOARD],
		justification: 'Write the URL and the title of the tab to the clipboard.',
	});
	chrome.runtime.sendMessage({
		type: 'copy-text-to-clipboard',
		target: 'offscreen-doc',
		data: text
	});
}

chrome.action.onClicked.addListener(async (tab) => {
	var text = tab.title + '\n' + tab.url + '\n\n';
	//console.log(text);
	await sendToClipboard(text);
});
