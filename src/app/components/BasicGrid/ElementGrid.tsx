import React, { useRef, useReducer, Reducer } from 'react';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import CircularProgress from '@material-ui/core/CircularProgress';

import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import fetchData from '../../hooks/fetchData';

import offsetReducer from '../../reducers/offsetReducer';
import dataReducer, { DataState, DataAction } from '../../reducers/dataReducer';

import { GridType } from './ElementGridType';
import { ItemComponent } from "../Item/Item";
import FeedGrid from '../Feed/FeedGrid';


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     paper: {
//       overflowWrap: 'break-word',
//       backgroundColor: 'whitesmoke',
//       marginTop: '10px',
//       paddingTop: '16px',
//       paddingRight: '5%',
//       paddingLeft: '5%',
//       color: 'black',
//     },
//     loader: {
//       alignContent: 'center',
//       height: '100px',
//       width: '100px',
//       margin: 'auto',
//     },
//   }),
// );

export default function CenteredGrid<T>({
  dataType,
  config,
  hidden,
  fetchSize,
  isPaginated,
}: GridType) {
  // const classes = useStyles();

  const bottomBoundaryRef = useRef(null);

  const [paginationState, paginationDispatch] = useReducer(offsetReducer, { limit: fetchSize, offset: 0 });
  const [dataState, dataDispatch] = useReducer<Reducer<DataState<T>, DataAction<T>>>(
    dataReducer,
    { data: [], fetching: true, error: false, }
  );

  const useFetchData = fetchData(dataType, config);

  useFetchData(paginationState, dataDispatch);

  useInfiniteScroll(bottomBoundaryRef, paginationDispatch, isPaginated);

  if (dataState.error) {
    return (<div>ERROR...</div>);
  }

  return (
    <span className="GridRoot" hidden={hidden}>
      {
        !(dataState?.data?.length ?? 0)
          ? null
          : dataType === 'Item' || dataType === 'Update'
            ? dataState
              ?.data
              ?.filter((element: any) => element.title || element.description)
              ?.map((element: any) =>
                <div className="ElementGrid" key={element.id}>
                  <div>
                    <ItemComponent {...element} />
                  </div>
                </div>
              )
            : <div>
              <FeedGrid>{dataState?.data}</FeedGrid>
            </div>
      }

      {dataState.fetching && (<div>
        {/* <CircularProgress
          disableShrink
          size={70}
          variant={'indeterminate'}
        /> */}
      </div>)}

      <div ref={bottomBoundaryRef} id="page-bottom-boundary" style={{ border: '1px', marginBottom: '20px' }}>
      </div>
    </span>
  );
}
