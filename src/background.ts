chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const payload = JSON.parse(request);

    if (payload.type === "fetch") {
        (async () => {
            try {
                const response = await fetch(payload.url, payload.init);
                sendResponse({
                    text: await response.text(),
                    ok: response.ok,
                });
            } catch (error) {
                console.error(error);

                sendResponse({
                    text: undefined,
                    ok: false,
                });
            }
        })();
    } else {
        sendResponse({ status: "success from background" });
    }

    return true;
});
