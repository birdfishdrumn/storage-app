import React, { useState, useEffect } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { SelectBox } from 'components/UI/index';
import {usePlaceList} from "fooks/getPlace"
import { Place } from 'types/place';
import { db } from 'firebase/index';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

interface PROPS {
  placeList: string[];
  setPlaceList: any;
}

const AddPlaceList: React.FC<PROPS> = ({ placeList, setPlaceList }) => {
  const [index, setIndex] = useState<number>(placeList.length);
  const [place, setPlace] = useState<string>('');
  const {places} = usePlaceList()

  const classes = useStyles();



  console.log(placeList);

  const deleteSize = (deleteIndex: number) => {
    const newPlaceList = placeList.filter((item, index) => index !== deleteIndex);
    setPlaceList(newPlaceList);
  };

  const addPlaceTitle = (place: string, index: number): false | undefined => {
    if (place === '') {
      return false;
    } else {
      if (index === placeList.length) {
        setPlaceList((prevState: string[]) => [...prevState, place]);
        setIndex(index + 1);
        setPlace('');
      } else {
        const newPlaceList = placeList;
        newPlaceList[placeList.length] = place;
        setPlaceList(newPlaceList);
        setIndex(newPlaceList.length);
        setPlace('');
      }
    }
  };
  console.log(placeList.length);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>場所</TableCell>
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {placeList &&
              placeList.length > 0 &&
              placeList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item}
                  </TableCell>

                  {/* <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(index, item)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell> */}
                  <TableCell className={classes.iconCell}>
                    <IconButton className={classes.iconCell} onClick={() => deleteSize(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <SelectBox
            label={'保管場所'}
            required={true}
            options={places}
            select={setPlace}
            value={place}
          />
        </div>
        <IconButton onClick={() => addPlaceTitle(place, index)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default AddPlaceList;
