import React, { useEffect, useState, useCallback } from 'react';
import { SectionWrapper, Title, GridList } from 'style/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingActionButton, RadioGroupe, SelectBox } from 'components/UI/index';
import { db } from 'firebase/index';
import { Products } from 'types/products';
import { ProductCard, ProductTable } from 'components/Product/index';
import { getCategory } from 'reducks/products/productSlice';
import { fetchCategory } from 'reducks/products/operations';
import { getUserId, getUsername } from 'reducks/users/userSlice';
import styled from 'styled-components';
import GridOnIcon from '@material-ui/icons/GridOn';
import ViewListIcon from '@material-ui/icons/ViewList';
import { IconButton } from '@material-ui/core';

const Flex = styled.div`
  justify-content: center;
  display: flex;
  margin: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    > div {
      margin: 20px auto;
    }
  }
`;

const ProductsList = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState<boolean>(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [category, setCategory] = React.useState('');
  const categories = useSelector(getCategory);
  const uid = useSelector(getUserId);
  const username = useSelector(getUsername);
  console.log(username);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  console.log(categories);

  const ProductRef = db.collection('products');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
    },
    [setSelectedValue]
  );

  let query = selectedValue
    ? category
      ? ProductRef.where('placeList', 'array-contains', selectedValue).where(
          'category',
          '==',
          category
        )
      : ProductRef.where('placeList', 'array-contains', selectedValue)
    : category
    ? ProductRef.where('category', '==', category)
    : ProductRef;

  useEffect(() => {
    const unSub = query.onSnapshot((snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push(data);
      });
      setProducts(list);
    });
    return () => {
      unSub();
    };
  }, [selectedValue, category]);
  console.log(selectedValue);

  const placeData = ['千葉', '佐竹', '亀戸倉庫', '都町', '千葉コンテナ', '千葉元工場'];

  return (
    <SectionWrapper>
      <Title>商品一覧</Title>
      <IconButton onClick={() => setList(false)}>
        <GridOnIcon />
      </IconButton>
      <IconButton onClick={() => setList(true)}>
        <ViewListIcon />
      </IconButton>
      <Flex>
        <RadioGroupe
          data={placeData}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          handleChange={handleChange}
        />
        <div style={{ width: '200px', margin: '-10px 10px 20px 20px' }}>
          <SelectBox
            label={'カテゴリー'}
            required={true}
            options={categories}
            select={setCategory}
            value={category}
          />
        </div>
      </Flex>
      <div className="module-spacer--small" />
      {list ? (
        <ProductTable product={products} />
      ) : (
        <GridList>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              name={product.name}
              id={product.id}
              images={product.images}
            />
          ))}
        </GridList>
      )}

      <FloatingActionButton type="商品" name="商品登録" />
    </SectionWrapper>
  );
};

export default ProductsList;
