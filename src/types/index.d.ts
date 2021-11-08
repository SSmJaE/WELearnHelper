interface GenericSettingOfSwitch {
    id: string;
    name: string;
    type: "switch";
    default: boolean;
    description: string;
}

/**用于自动转换string至指定类型 */
interface GenericSettingOfDefault {
    id: string;
    name: string;
    type?: "readonly";
    default: number | string;
    valueType: "number" | "float" | "string";
    description: string;
}

type GenericSetting = GenericSettingOfSwitch | GenericSettingOfDefault;

interface SectionSetting {
    title: string;
    display: boolean;
    settings: GenericSetting[];
}

//*-----------------------------------------------------------------------------------

interface UserSettings {
    userAccount: string;
    userPoints: number;
    autoCopy: boolean;
    autoSlide: boolean;

    infiniteListening: boolean;

    showReference: boolean;
    autoSolve: boolean;
    solveInterval: number;
    defaultBlankAnswer: string;

    autoRefresh: boolean;
    loopRefresh: boolean;
    randomRefresh: boolean;
    refreshIntervalMin: number;
    refreshIntervalMax: number;

    [propName: string]: any;
}

interface Answer {
    text: string;
    type: string;
    element: HTMLElement;
    index: number;
    [prop: string]: any;
}

interface Question {
    questionType: number;
    questionId: string;
    question: string | null;
    options: string[];
    answerId: string | null;
    answer: string | null;
    context: string | null;
    file: string | null;
}

interface QuestionResponse {
    status: number;
    questionType: number;
    questionId: string;
    answerId?: string;
    answer: string | null;
}

type InfoType = "normal" | "error" | "success" | "info" | "hr";
interface Message {
    info: string;
    type: InfoType;
}

//适配query-string包的query类型
type Stringifiable = string | boolean | number | null | undefined;
type StringifiableRecord = Record<string, Stringifiable | readonly Stringifiable[]>;
