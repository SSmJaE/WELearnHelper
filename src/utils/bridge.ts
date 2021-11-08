function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

type ServiceType = "client" | "server";
type ServiceSource = "inject" | "content";
type ServiceTarget = "inject" | "content" | "background";
interface Response {
    [sessionId: string]: string;
}

/**inject和content公用的消息组件*/
class Communication {
    serviceType: ServiceType;
    serviceSource: ServiceSource;
    serviceTarget: ServiceTarget;
    sessions = new Set();
    responses: Response = {};

    constructor(
        serviceType: ServiceType,
        serviceSource: ServiceSource,
        serviceTarget: ServiceTarget,
    ) {
        this.serviceType = serviceType;
        this.serviceSource = serviceSource;
        this.serviceTarget = serviceTarget;

        this.listen();
    }

    emit(event: CustomEvent, payload: any) {}

    private listen() {
        window.addEventListener("message", async (event) => {
            // console.error(event);
            const data = event.data;
            if (data.extension === "unipus-helper") {
                if (
                    data.serviceTarget === this.serviceSource &&
                    data.serviceSource === this.serviceTarget
                ) {
                    if (data.type === "request") {
                        // 处理payload
                        //todo 三种情况下payload的interface
                        let response: any;
                        if (data.serviceSource === "inject" && data.serviceTarget === "content") {
                            const payload = JSON.parse(data.payload);
                            let key: string;
                            switch (payload.type) {
                                case "fetch": //转发跨域请求给background
                                    response = await new Promise((resolve) =>
                                        chrome.runtime.sendMessage(
                                            data.payload,
                                            (response: any) => {
                                                // console.error(554321);
                                                // console.error(response);
                                                resolve(response);
                                            },
                                        ),
                                    );
                                    break;
                                case "setValue":
                                    key = payload.key;
                                    const value = payload.value;

                                    await new Promise<void>((resolve) => {
                                        chrome.storage.sync.set({ [key]: value }, function() {
                                            console.log(`${key} is set to ` + value);
                                            resolve();
                                        });
                                    });

                                    response = {};
                                    break;
                                case "getValue":
                                    key = payload.key;
                                    const defaultValue = payload.defaultValue;

                                    let returnValue = await new Promise((resolve) => {
                                        chrome.storage.sync.get(key, function(result) {
                                            // console.error(`${key} currently is ` + result[key]);
                                            let temp: any;
                                            try {
                                                temp = JSON.parse(result[key]);
                                            } catch (e) {
                                                temp = result[key];
                                            }

                                            resolve(temp);
                                        });
                                    });

                                    response = returnValue ? returnValue : defaultValue;
                                    break;
                                default:
                                    response = "no event handler for " + payload.type;
                                    break;
                            }
                        } else {
                            response = {};
                        }

                        window.postMessage(
                            {
                                extension: "unipus-helper",
                                sessionId: data.sessionId,
                                serviceType: this.serviceType,
                                serviceSource: this.serviceSource,
                                serviceTarget: this.serviceTarget,
                                type: "response",
                                status: "200",
                                payload: response,
                            },
                            "*",
                        );
                    }
                    if (data.type === "response") {
                        // console.error(
                        //     `${this.serviceType} ${this.serviceSource} receive server ${this.serviceTarget}'s response`,
                        // );
                        this.responses[data.sessionId] = data.payload;
                        this.sessions.delete(data.sessionId);
                    }
                }
            }
        });
    }

    /**模拟网络请求 */
    public request(message: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.serviceSource === "content" && this.serviceTarget === "background") {
                chrome.runtime.sendMessage(message, (response: any) => {
                    resolve(response);
                });
            } else {
                const sessionId = String(Math.random());
                window.postMessage(
                    {
                        extension: "unipus-helper",
                        sessionId: sessionId,
                        serviceType: this.serviceType,
                        serviceSource: this.serviceSource,
                        serviceTarget: this.serviceTarget,
                        type: "request",
                        payload: JSON.stringify(message),
                    },
                    "*",
                );
                this.sessions.add(sessionId);
                while (true) {
                    if (!this.sessions.has(sessionId)) {
                        const response = this.responses[sessionId];
                        delete this.responses[sessionId];
                        resolve(response);
                    }
                    await sleep(50);
                    // console.error(this.sessions);
                    // console.error(this.responses);
                }
            }
        });
    }
}

export default Communication;
