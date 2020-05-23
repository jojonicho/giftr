import { useEffect, useState } from "react";
import { MyResponse, TenorData } from "./types";

export const useFetch = (url: string) => {
  const [state, setState] = useState<{
    data: string[];
    loading: boolean;
  }>({ data: [], loading: true });
  useEffect(() => {
    let cur: string[] = [];
    setState((state) => ({ data: state.data, loading: true }));
    fetch(url)
      .then((response) => response.json())
      .then((json: MyResponse) => {
        json.results.map((x: TenorData) => cur.push(x.media[0].gif.url));
      })
      .then(() => {
        setState({ data: cur, loading: false });
      });
  }, [url, setState]);
  return state;
};
