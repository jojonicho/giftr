export type ColorMap = { [key: string]: string[] };
export type RainbowMap = { [key: string]: string };

export interface Row {
  label: string;
  urls: string[];
}
// }
interface Url {
  url: string;
}
interface Media {
  gif: Url;
}
export interface TenorData {
  media: Media[];
}
export interface MyResponse {
  results: TenorData[];
}
