import { useEffect, } from "react";

import { ItemType } from "../components/Item/ItemType";
import { FeedType } from "../components/Feed/FeedType";
import { Config } from "../config/ConfigType";
import { OffsetState } from "../reducers/offsetReducer";
import { DataAction } from "../reducers/dataReducer";

export default function fetchData(
  type: ItemType["type"] | FeedType["type"],
  config: Config,
) {
  return function useFetchData<T>({ limit, offset }: OffsetState, dispatch: (offsetAction: DataAction<T>) => void) {
    useEffect(() => {
      const getData = async () => {
        try {
          dispatch({ type: 'FETCHING_DATA', fetching: true, error: false, });
          const url = 'localhost:3099';
          const response = await fetch(`${url}/${type.toLowerCase()}s?limit=${limit}&offset=${offset}`);
          const body = await response.json();
          dispatch({ type: 'STACK_DATA', data: body.data[`${type.toLowerCase()}s`], });
        } catch (err) {
          console.log(err);
          dispatch({ type: 'ERROR', error: true })
        } finally {
          dispatch({ type: 'FETCHING_DATA', fetching: false, error: false });
        }
      }
      getData();
    }, [limit, offset, dispatch]);
  }
}
