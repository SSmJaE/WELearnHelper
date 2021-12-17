export {};
declare global {
    const $: any; //todo types/jQuery
    const angular: any; //todo types/jQuery

    const createSoundPlayer: Function;
    const jwplayer: Function;
    const NextSCO: Function;
    let PlaySound: Function;
    let soundfile: string;
    let resPath: any;
    let bufferingTimer: any;
}
