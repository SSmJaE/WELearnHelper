import { store } from "@store";

function scrollDown() {
    //等待message渲染完成，不然不会拉到最底
    setTimeout(() => {
        document.querySelector("#container-messages")?.scrollBy(0, 1000);
    }, 10);
}

export const RECORD_TYPES = ["info", "error", "question", "hr"] as const;

export type RecordType = typeof RECORD_TYPES[number];

export interface IRecord<T = RecordType, C = any> {
    id: string;
    timestamp: string;
    type: T;
    content: C;
    extra?: string;
}

export interface IQuestionContent {
    order: string;
    info: {
        content: "标答" | "无答案" | "GPT";
        color?: string;
    };
    answerText: string;
    raw: {
        element: HTMLElement;
    };
    solve: {
        couldSolve: boolean;
        hasSolved: boolean;
        solveThis: (answerText: string) => void;
    };
}

export type IQuestionRecord = IRecord<"question", IQuestionContent>;

export type IInfoRecord = IRecord<"info", string>;

export interface IErrorContent {
    message: string;
}

export type IErrorRecord = IRecord<"error", IErrorContent>;

export class Logger {
    maxSize: number;
    shiftOffset: number;

    constructor(maxSize = 100, shiftOffset = 10) {
        this.maxSize = maxSize;
        this.shiftOffset = shiftOffset;
    }

    get logs() {
        return store.logs;
    }

    private addLog(log: IRecord) {
        // if (this.logs.length > this.maxSize + this.shiftOffset) {
        //     useStore.setState({ logs: this.logs.slice(this.shiftOffset) });
        // }

        store.logs.push(log);

        if (store.userSettings.autoScrollDown) {
            scrollDown();
        }
    }

    log(option: Pick<IRecord, "type" | "content" | "extra">) {
        this.addLog({
            ...option,
            timestamp: new Date().toISOString(),
            id: `${Math.random()}`,
        });
    }

    info(content: string, extra?: string) {
        return this.log({ type: "info", content, extra });
    }
    question(content: IQuestionContent, extra?: string) {
        return this.log({ type: "question", content, extra });
    }
    error(content: IErrorContent, extra?: string) {
        return this.log({ type: "error", content, extra });
    }
    hr() {
        return this.log({ type: "hr", content: "" });
    }
    debug(...content: any) {
        console.log(`[eocs-helper]`, ...content);
    }
}

const logger = new Logger();
export default logger;
