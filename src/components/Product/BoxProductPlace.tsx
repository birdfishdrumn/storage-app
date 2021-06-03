import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { BoxProduct } from 'types/box';
import { useDispatch } from 'react-redux';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
  pointer: {
    cursor: 'pointer',
  },
});

interface PROPS {
  content: BoxProduct[];
  box?: boolean;
}

const BoxProductPlace: React.VFC<PROPS> = ({ content, box }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>場所</TableCell>
              <TableCell>{box ? '商品名' : '箱名'} </TableCell>
              <TableCell>数量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content &&
              content.length > 0 &&
              content.map((item: BoxProduct, index: any) => (
                <TableRow
                  key={item.id}
                  className={classes.pointer}
                  onClick={() =>
                    dispatch(
                      fullDialogOpenAction({
                        title: '箱の編集',
                        type: '箱',
                        id: item.boxId,
                        placeId: item.placeId,
                      })
                    )
                  }
                >
                  <TableCell component="th" scope="row">
                    {item.placeId}
                  </TableCell>
                  <TableCell>{box ? item.product : item.boxName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div></div>
      </TableContainer>
    </div>
  );
};

export default BoxProductPlace;
