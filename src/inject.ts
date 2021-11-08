function injectJs(doc: Document, source: string): Element {
    let temp = doc.createElement("script");
    temp.setAttribute("type", "text/javascript");
    temp.src = source;
    temp.className = "injected-js";
    doc.documentElement.appendChild(temp);
    return temp;
}

injectJs(document, chrome.runtime.getURL("main.js"));
