import React, { useEffect, useState, useCallback } from 'react';
import { SectionWrapper, Title, GridList } from 'style/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingActionButton, NavItem } from 'components/UI/index';
import { db } from 'firebase/index';
import { Products } from 'types/products';
import { BoxCard } from 'components/Product/index';
import { getCategory } from 'reducks/products/productSlice';
import { fetchCategory } from 'reducks/products/operations';
import { getBoxesInFavorite } from 'reducks/users/userSlice';
import styled from 'styled-components';
import { BoxLikes } from 'types/favorite';
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

const FavoriteBoxList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const boxInFavorite: BoxLikes[] = useSelector(getBoxesInFavorite);
  console.log(boxInFavorite);

  return (
    <SectionWrapper>
      <NavItem />
      <Title>箱</Title>
      <div className="module-spacer--small" />
      <GridList>
        {boxInFavorite.length &&
          boxInFavorite.map((favorite) => (
            <BoxCard
              key={favorite.likesId}
              boxes={favorite}
              name={favorite.name}
              id={favorite.favoriteId}
              placeId={favorite.placeId}
              images={favorite.images}
            />
          ))}
      </GridList>
    </SectionWrapper>
  );
};

export default FavoriteBoxList;
