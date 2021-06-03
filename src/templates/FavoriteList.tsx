import React, { useEffect, useState, useCallback } from 'react';
import { SectionWrapper, Title, GridList } from 'style/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingActionButton, NavItem } from 'components/UI/index';
import { db } from 'firebase/index';
import { Products } from 'types/products';
import { ProductCard } from 'components/Product/index';
import { getCategory } from 'reducks/products/productSlice';
import { fetchCategory } from 'reducks/products/operations';
import { getUserId, getUsername, getProductsInFavorite } from 'reducks/users/userSlice';
import styled from 'styled-components';
import { Likes } from 'types/favorite';
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

const FavoriteList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [category, setCategory] = React.useState('');
  const categories = useSelector(getCategory);
  const uid = useSelector(getUserId);
  const username = useSelector(getUsername);
  const productInFavorite: Likes[] = useSelector(getProductsInFavorite);
  console.log(productInFavorite);

  const FavoriteRef = db.collection('users').doc(uid).collection('favorite');

  return (
    <SectionWrapper>
      <NavItem />
      <Title>お気に入り</Title>
      <div className="module-spacer--small" />
      <GridList>
        {productInFavorite.length &&
          productInFavorite.map((favorite) => (
            <ProductCard
              key={favorite.likesId}
              product={favorite}
              name={favorite.name}
              id={favorite.favoriteId}
              images={favorite.images}
            />
          ))}
      </GridList>
    </SectionWrapper>
  );
};

export default FavoriteList;
