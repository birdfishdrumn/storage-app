import React from 'react';
import { SectionWrapper, Title } from 'style/GlobalStyle';
import { SearchBox } from 'components/UI/index';
const Search = () => {
  return (
    <SectionWrapper>
      <Title>商品の検索</Title>
      <SearchBox />
      <Title>箱の検索</Title>
      <SearchBox box />
    </SectionWrapper>
  );
};

export default Search;
