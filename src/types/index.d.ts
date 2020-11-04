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

    autoSolveNormal: boolean;
    solveIntervalMin: number;
    solveIntervalMax: number;

    autoRefresh: boolean;
    loop: boolean;
    randomInterval: boolean;
    switchInterval: number;
    switchLevel: number;
    range: boolean;
    rangeStart: number;
    rangeEnd: number;

    [propName: string]: any;
}
