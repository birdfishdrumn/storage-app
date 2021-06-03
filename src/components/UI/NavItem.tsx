import React from 'react';
import { SectionContainer, BoldText, IconFlex, WhiteIcon } from 'style/GlobalStyle';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import AllInboxIcon from '@material-ui/icons/AllInbox';

const NavIcon = styled(WhiteIcon)`
  width: 100px;
  height: 100px;
  flex-direction: column;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
`;

const SearchPopulationNav: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <SectionContainer>
        <IconFlex>
          <NavIcon onClick={() => dispatch(push('/likes'))}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fuurin-paint-workshop.appspot.com/o/sozai%2F%E9%A2%A8%E9%88%B4%E3%81%AE%E7%84%A1%E6%96%99%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E7%B4%A0%E6%9D%90%201.svg?alt=media&token=0718115b-964d-4eea-b8b6-4ce9a7a14857"
              style={{ width: '50px' }}
            />
            <br />
            <BoldText>商品</BoldText>
          </NavIcon>
          <NavIcon onClick={() => dispatch(push('/likesBox'))}>
            <AllInboxIcon style={{ fontSize: '50px' }} />
            <BoldText>箱</BoldText>
          </NavIcon>
        </IconFlex>
      </SectionContainer>
    </div>
  );
};

export default SearchPopulationNav;
