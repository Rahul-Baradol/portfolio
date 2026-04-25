// declare module "critters" {
//   interface Options {
//     path?: string;
//     publicPath?: string;
//     pruneSource?: boolean;
//     mergeStylesheets?: boolean;
//     additionalStylesheets?: string[];
//     preload?: 'body' | 'media' | 'swap' | 'js' | 'js-lazy';
//     noscriptFallback?: boolean;
//     inlineFonts?: boolean;
//     preloadFonts?: boolean;
//     fonts?: boolean;
//     keyframes?: string;
//     compress?: boolean;
//     logLevel?: 'info' | 'warn' | 'error' | 'trace' | 'debug' | 'silent';
//   }

//   interface CrittersInstance {
//     process(html: string): Promise<string>;
//     readFile(filename: string): Promise<string> | string;
//   }

//   interface CrittersConstructor {
//     new(options?: Options): CrittersInstance;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (options?: Options): any;
//   }

//   const Critters: CrittersConstructor;
//   export default Critters;
// }

declare module "critters" {
  export default class Critters {
    constructor(options?: any);
    process(html: string): Promise<string>;
  }
}