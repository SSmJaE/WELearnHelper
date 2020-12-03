interface GenericSetting {
    id: string;
    name: string;
    type?: "readonly" | "switch";
    default: number | string | boolean;
    description: string;
}

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
