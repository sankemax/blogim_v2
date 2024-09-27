import React, { Dispatch, ChangeEvent, } from 'react';
// import { makeStyles, Theme, withStyles, createStyles, } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs /*, { TabsProps }*/ from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import { TabState, TabAction } from '../../reducers/tabsReducer';

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme: Theme) => ({
//   appBar: {
//     flexGrow: 1,
//     boxShadow: 'none',
//     color: '#1E68A6',
//     backgroundColor: 'whitesmoke',
//   },
// }));

// const AntTab = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       textTransform: 'none',
//       minWidth: 72,
//       fontWeight: 'bold',
//       marginRight: theme.spacing(4),
//       fontFamily: ['Alef', 'sans-serif',].join(','),
//       '&:hover': {
//         color: '#1E68A6',
//         opacity: 1,
//       },
//       '&:selected': {
//         color: '#1E68A6',
//       },
//       '&:focus': {
//         color: '#1E68A6',
//       },
//     },
//   }),
// )((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

// const StyledTabs = withStyles(theme => ({
//   indicator: {
//     [theme.breakpoints.up('xs')]: {
//       display: "flex",
//     },
//     [theme.breakpoints.down('xs')]: {
//       display: "none",
//     }
//   }
// }))((props: TabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

export default function AppTabs({ tabState, dispatcher }: { tabState: TabState, dispatcher: Dispatch<TabAction> }) {
  // const classes = useStyles();

  const handleChange = (event: ChangeEvent<{}>, value: number) => {
    dispatcher({ type: 'SWITCH_TAB', moveTo: value });
  };

  return (
    <div>
      <div
        
        onChange={handleChange as any}
        
        aria-label="blog tabs"
        // variant="scrollable"
        // scrollButtons="on"
      >
        <div />
        <div />
        {/* <AntTab label="עדכונים" {...a11yProps(2)} /> */}
        <div />
      </div>
    </div>
  );
}
