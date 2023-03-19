import { store } from "@store";
import Button, { IButtonProps } from "@components/Button";

function scrollDown() {
    //等待message渲染完成，不然不会拉到最底
    setTimeout(() => {
        document.querySelector("#container-messages")?.scrollBy(0, 1000);
    }, 10);
}

export const RECORD_TYPES = ["info", "error", "question", "hr"] as const;

export type RecordType = typeof RECORD_TYPES[number];

type IDynamicButton = Pick<IButtonProps, "children" | "onClick" | "disabled">;

export interface IRecord<T = RecordType, C = any> {
    id: string;
    timestamp: string;
    type: T;
    content: C;
    extra?: string;
    /**
     * 动态挂载额外的可交互按钮
     *
     * 因为valtio会snapshot(frozen)，如果直接传入component，会触发Cannot assign to read only property 'validated' of object '#<Object>'
     * 所以这里只传入props，
     *
     * 理论上来说，在类redux中存函数的引用，也是不规范的，但是无所谓了
     * */
    action?: IDynamicButton[];
}

export interface IQuestionContent {
    order: string;
    info: {
        content: "标答" | "无答案" | "GPT";
        color?: string;
    };
    answerText: string;
    raw: {
        element?: HTMLElement;
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

    log(option: Pick<IRecord, "type" | "content" | "extra" | "action">) {
        this.addLog({
            ...option,
            timestamp: new Date().toISOString(),
            id: `${Math.random()}`,
        });
    }

    info(content: string, extra?: string, action?: IDynamicButton[]) {
        return this.log({ type: "info", content, extra, action });
    }
    question(content: IQuestionContent, extra?: string, action?: IDynamicButton[]) {
        return this.log({ type: "question", content, extra, action });
    }
    error(content: IErrorContent, extra?: string, action?: IDynamicButton[]) {
        return this.log({ type: "error", content, extra, action });
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
