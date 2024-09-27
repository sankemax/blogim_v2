import React from 'react';
import moment from 'moment';
import { FeedType } from './FeedType';
// import Grid, { GridSpacing } from '@material-ui/core/Grid';
import "./Feed.css";

moment.locale('he');

type FeedTypeExtension = FeedType & {
  // spacing: GridSpacing
  classes: Record<"grid" | "title", string>
}

export function FeedComponent({
  id,
  blogTitle,
  author,
  linkToWebPage,
  lastPostDate,
  // spacing,
  classes,
}: FeedTypeExtension) {
  const formattedDate = moment(lastPostDate).format('YYYY-MM-DD');
  return (
    <div>
      <div className={classes.grid}>
        <img className="FeedFav" alt={`favicon for blog`} src={`https://www.google.com/s2/favicons?sz=16&domain_url=${linkToWebPage}`} />
        <a className="FeedLink" href={linkToWebPage}>{blogTitle || 'ללא כותרת'}</a>
      </div>
      <div className={classes.grid}>
        {formattedDate}
      </div>
    </div>
  );
}
