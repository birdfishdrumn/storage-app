import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  AddBox,
  Edit,
  DeleteOutline,
  Check,
  Clear,
  Search,
  Close,
  Filter,
  ChevronRight,
  Message,
} from '@material-ui/icons';
import { SectionWrapper } from 'style/GlobalStyle';
import { makeStyles } from '@material-ui/core/styles';
// import Reservation from './Reserve/Reservation';
import { Products } from 'types/products';
import { datetimeToString } from 'functions/function';
import { useProductStock } from 'fooks/getProductStock';
import { useDispatch } from 'react-redux';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'relative',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  dialog: {
    margin: 0,
  },
}));

const tableIcons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
  Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
  Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
  Close: forwardRef<SVGSVGElement>((props, ref) => <Close {...props} ref={ref} />),
  Filter: forwardRef<SVGSVGElement>((props, ref) => (
    <Filter style={{ fontSize: 0 }} {...props} ref={ref} />
  )),
  Message: forwardRef<SVGSVGElement>((props, ref) => <Message {...props} ref={ref} />),
};

interface PROPS {
  product: Products[];
}

const ProductTable: React.FC<PROPS> = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const { boxProduct } = useProductStock(name);

  const handleClickOpen = useCallback(
    async (id: string, name: string) => {
      await setName(name);
      dispatch(
        fullDialogOpenAction({ title: '商品の詳細', type: '詳細', id: id, content: boxProduct })
      );
      console.log(boxProduct);
    },
    [boxProduct]
  );

  return (
    <SectionWrapper>
      <MaterialTable
        icons={tableIcons}
        title="商品一覧"
        columns={[
          {
            field: 'imageUrl',
            title: '商品画像',
            render: (rowData) => (
              <img src={rowData.imageUrl} style={{ width: 50, borderRadius: '50%' }} />
            ),
          },
          {
            title: '商品名',
            field: 'name',
            cellStyle: {
              width: 400,
              fontSize: '0.9rem',
            },
            headerStyle: {
              width: '400px',
            },
          },
          {
            title: '更新日',
            field: 'date',
            cellStyle: {
              fontSize: '0.9rem',
            },
          },
        ]}
        data={product.map((d: Products) => ({
          id: d.id,
          imageUrl: d.images[0].path,
          name: d.name,
          date: datetimeToString(d.created_at?.toDate()),
        }))}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'edit',
            onClick: (event, rowData: any) => {
              handleClickOpen(rowData.id, rowData.name);
            },
          },
        ]}
        options={{
          filtering: true,
          search: true,
        }}
      />
    </SectionWrapper>
  );
};

export default ProductTable;

// interface Props {
//  data: Reserve
// }
