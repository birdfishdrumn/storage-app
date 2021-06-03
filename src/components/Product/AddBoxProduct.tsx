import React, { useState, useEffect, useCallback } from 'react';
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
import { SelectProduct, TextInput } from 'components/UI/index';
import { Products } from 'types/products';
import { BoxProduct } from 'types/box';
import { db } from 'firebase/index';
import { useDispatch, useSelector } from 'react-redux';
import { snackbarOpenAction } from 'reducks/snackbarSlice';

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
  boxProductsList: Omit<BoxProduct, 'id' | 'placeId' | 'boxName' | 'boxId'>[];
  setBoxProductsList: any;
  id: string;
  name: string;
  placeId: string;
}

const AddBoxProduct: React.FC<PROPS> = ({
  boxProductsList,
  setBoxProductsList,
  id,
  name,
  placeId,
}) => {
  const [index, setIndex] = useState<number>(boxProductsList.length);
  const [product, setProduct] = useState<string>('');
  const [products, setProducts] = useState<Pick<Products, 'id' | 'name' | 'images'>[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [boxProducts, setBoxProducts] = useState<BoxProduct[]>([]);
  const [productId, setProductId] = useState<string>('');
  const dispatch = useDispatch();
  console.log(id);

  const BoxProductRef = db.collection('boxes').doc(id).collection('boxProduct');

  useEffect(() => {
    BoxProductRef.onSnapshot((snapshot) => {
      const list: any = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push(data);
      });
      setBoxProducts(list);
    });
  }, []);

  const classes = useStyles();

  useEffect(() => {
    const unSub = db.collection('products').onSnapshot((snapshot: any) => {
      setProducts(
        snapshot.docs.map((doc: any) => ({
          id: doc.data().id,
          name: doc.data().name,
          images: doc.data().images,
        }))
      );
      return () => {
        unSub();
      };
    });
  }, []);

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value);
    },
    [setQuantity]
  );

  const deleteProduct = (id: string) => {
    BoxProductRef.doc(id)
      .delete()
      .then(() => {
        dispatch(snackbarOpenAction({ text: `削除しました`, type: true }));
      })
      .catch((err) => {
        dispatch(snackbarOpenAction({ text: err, type: false }));
      });
  };

  const deleteSize = (deleteIndex: number, id: string) => {
    const newBoxProductsList = boxProductsList.filter((item, index) => index !== deleteIndex);
    setBoxProductsList(newBoxProductsList);
    setIndex(index - 1);
    deleteProduct(id);
  };
  const addProduct = useCallback(
    async (product, quantity, productId) => {
      const boxId = productId ? productId : BoxProductRef.doc().id;
      BoxProductRef.doc(boxId)
        .set(
          {
            boxId: id,
            id: boxId,
            product: product,
            quantity: Number(quantity),
            boxName: name,
            placeId: placeId,
          },
          { merge: true }
        )
        .then(() => {
          dispatch(snackbarOpenAction({ text: `「${product}」を登録しました`, type: true }));
        })
        .catch((err) => {
          dispatch(snackbarOpenAction({ text: err, type: false }));
        });
      setProductId('');
    },
    [name]
  );

  const editSize = (index: number, product: string, quantity: number, id: string) => {
    setIndex(index);
    setProduct(product);
    setQuantity(quantity);
    setProductId(id);
  };

  console.log(products);

  const addPlaceTitle = (
    product: string,
    quantity: number,
    index: number,
    productId: string
  ): false | undefined => {
    if (product === '' || quantity === 0) {
      return false;
    } else {
      // 新しい作品の登録
      if (index === boxProductsList.length) {
        setBoxProductsList((prevState: string[]) => [
          ...prevState,
          { product: product, quantity: quantity },
        ]);
        setIndex(index + 1);
        setProduct('');
        setQuantity(0);
        addProduct(product, quantity, productId);
      } else {
        //  編集
        const newBoxProductsList = boxProductsList;
        newBoxProductsList[boxProductsList.length] = { product: product, quantity: quantity };
        setBoxProductsList(newBoxProductsList);
        setIndex(newBoxProductsList.length);
        setProduct('');
        setQuantity(0);
        addProduct(product, quantity, productId);
      }
    }
  };
  console.log(boxProductsList.length);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>場所</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {boxProducts &&
              boxProducts.length > 0 &&
              boxProducts.map((item: BoxProduct, index: any) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.product}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(index, item.product, item.quantity, item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => deleteSize(index, item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <SelectProduct
            label={'商品一覧'}
            required={true}
            options={products}
            select={setProduct}
            value={product}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            variant={'outlined'}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={'number'}
          />
        </div>
        <IconButton onClick={() => addPlaceTitle(product, quantity, index, productId)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default AddBoxProduct;
