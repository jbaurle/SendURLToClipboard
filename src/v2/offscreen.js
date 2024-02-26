// We use a <textarea> element for two main reasons:
// 1. To preserve the formatting of multi-line text,
// 2. to select the content of the node using the '.select()' method of this element.
const textElement = document.querySelector('#text');

async function sendToClipboard(data) {
	try {
		if (typeof data !== 'string') {
			throw new TypeError(`Value provided must be a 'string', got '${typeof data}'.`);
		}
		// 'document.execCommand('copy')' works against the user's selection in a Web page.
		// Therefore, we need to paste the string we want to copy into the web page
		// and select this content on the page before calling 'execCommand()'.
		textElement.value = data;
		textElement.select();
		document.execCommand('copy');
	} finally {
		window.close();
	}
}

chrome.runtime.onMessage.addListener(async (message) => {
	if (message.target !== 'offscreen-doc') {
		return;
	}
	if (message.type == 'copy-text-to-clipboard') {
		sendToClipboard(message.data);
	}
	else {
		console.warn(`Unexpected message type received: '${message.type}'.`);
	}
});
