// function sleep(ms: number) {
//     return new Promise<void>((resolve) => setTimeout(resolve, ms));
// }
// function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function(...args: any[]) {
//         const start = Date();
//         const result = originalMethod.apply(this, args);
//         const finish = Date();
//         console.log(`Execution time: ${finish + start} milliseconds`);
//         return result;
//     };

//     return descriptor;
// }



// // import { sleep, requestErrorHandler } from "./common";

// function enumerable(value: boolean) {
//     return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         descriptor.enumerable = value;
//     };
// }

// class test2222 {
//     @requestErrorHandler("123123")
//     static async test() {
//         console.log(123);
//         await sleep(1000);
//         throw Error("hahaha");
//         console.log(456);
//         return 123;
//     }
// }

// test2222.test();
