import Vue from "vue";

declare global {
    // const GM_getValue: (identifier: string, defaultValue: any) => string;
    // const GM_setValue: any;
    // const GM_setClipboard: any;
    // const GM_xmlhttpRequest: any;

    const Vue: typeof Vue;

    let PlaySound: Function;
    const createSoundPlayer: Function;
    const jwplayer: Function;
    let soundfile: string;
    let resPath: any;
    let bufferingTimer: any;
    // let unsafeWindow: any;

    const $: any; //todo types/jQuery
    const angular: any; //todo types/jQuery
}
