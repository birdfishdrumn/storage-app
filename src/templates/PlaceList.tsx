// import React, { useEffect, useState } from 'react';
// import { db } from 'firebase/index';
// import { Place } from 'types/place';
// import styled from 'styled-components';
// import { SectionWrapper } from 'style/GlobalStyle';
// import { ImageText, CategoryImage } from './style';
// import { Link } from 'react-router-dom';

// const PlaceWrapper = styled.div`
//   margin: 0 auto;
//   max-width: 600px;
//   height: 200px;
//   position: relative;
// `;

// const PlaceList = () => {
//   const [placeList, setPlaceList] = useState<Place[]>([]);
//   useEffect(() => {
//     db.collection('place')
//       .get()
//       .then((snapshot) => {
//         const list: any = [];
//         snapshot.forEach((doc) => {
//           const data = doc.data();
//           list.push(data);
//         });
//         setPlaceList(list);
//       });
//   }, []);

//   return (
//     <SectionWrapper>
//       {placeList.map((place: Place) => (
//         <Link key={place.id} to={`/place/${place.id}`}>
//           <PlaceWrapper>
//             <CategoryImage src={place.images} />
//             <ImageText>{place.name}</ImageText>
//           </PlaceWrapper>
//         </Link>
//       ))}
//     </SectionWrapper>
//   );
// };

// export default PlaceList;

import React, { useState, useEffect } from 'react';
import { SectionWrapping } from 'style/GlobalStyle';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BoxList from './BoxList';
import { db } from 'firebase/index';
import { Place } from 'types/place';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    top: 50,
  },
}));

const HelpDetail = (props: any) => {
  const classes = useStyles();
  const stateValue = props.location.state;
  const [value, setValue] = React.useState(stateValue || 0);

  console.log(props.location.state);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [placeList, setPlaceList] = useState<Place[]>([]);
  useEffect(() => {
    db.collection('place')
      .orderBy('order', 'asc')
      .get()
      .then((snapshot) => {
        const list: any = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push(data);
        });
        setPlaceList(list);
      });
  }, []);

  return (
    <div>
      <SectionWrapping>
        <div className={classes.root}>
          <AppBar position="sticky" color="default" className={classes.appbar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              scrollButtons="on"
              textColor="primary"
              variant="scrollable"
              // scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="佐竹" {...a11yProps(0)} />
              <Tab label="千葉" {...a11yProps(1)} />
              <Tab label="亀戸" {...a11yProps(6)} />
              <Tab label="都町" {...a11yProps(2)} />
              <Tab label="千葉コンテナ" {...a11yProps(4)} />
              <Tab label="千葉元工場" {...a11yProps(5)} />
            </Tabs>
          </AppBar>
          {placeList.map((place: Place, index) => (
            <TabPanel value={value} index={index}>
              <BoxList id={place.id} />
            </TabPanel>
          ))}
        </div>
      </SectionWrapping>
    </div>
  );
};

export default HelpDetail;
