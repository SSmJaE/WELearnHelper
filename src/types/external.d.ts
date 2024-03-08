export {};

declare global {
    const $: any; //todo types/jQuery
    const angular: any; //todo types/jQuery

    const NextSCO: Function;

    //音视频播放相关
    const jwplayer: Function;
    let PlaySound: Function;
    let soundfile: string;
    let testEnv: any;
    let soundPlayer: any;
    let lastSoundId: any;
    let currentSoundId: any;

    const unsafeWindow: Window;
}
