import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

interface PROPS {
  isActive: boolean | any;
}

export const FavoriteStyle = styled(FavoriteBorderIcon)<PROPS>`
  color: ${(props) => props.isActive && 'red'};
  padding-right: 0 !important;
  margin-right: 5px;
  margin-bottom: 3px;
`;
export const FavoriteCount = styled.span`
  font-size: 1rem;
  margin-right: 8px;
  display: inline-block;
  color: red;
`;
export const FavoriteWrapper = styled.div`
  padding-bottom: 5px;
`;

export const FavoriteText = styled.span`
  margin-bottom: -8px;
`;
