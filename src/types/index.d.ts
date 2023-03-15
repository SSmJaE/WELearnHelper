declare global {
    namespace NodeJS {
        interface ProcessEnv {
            COMPILE_PLATFORM: "welearn" | "tsinghua";
        }
    }
}
