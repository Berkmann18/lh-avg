declare type NumLike = number | string;
declare type SubObj = Record<string, NumLike>;
declare type ResultKey = NumLike | SubObj;
interface Result {
  perf: NumLike;
  a11y: NumLike;
  bp: NumLike;
  seo: NumLike;
  pwa: {
    fnr: NumLike;
    ins: NumLike;
    po: NumLike;
  };
  average: NumLike;
  [key: string]: ResultKey;
}
interface LhReGroup {
  perf: string;
  a11y: string;
  bp: string;
  seo: string;
  fnr: string;
  ins: string;
  po: string;
}
interface CommanderOptions {
    [key: string]: never;
}
