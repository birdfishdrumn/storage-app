import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

interface Require {
  gray?: boolean;
}

interface Min {
  left?: boolean;
  red?: boolean;
  nonePadding?: boolean;
  min?: boolean;
}

interface Center {
  center?: boolean;
}

interface Icon {
  noMargin?: boolean;
}
// ----------UI-------------
export const Border = styled.div`
  height: 30px;
  position: relative;
  :before {
    content: '';
    background-image: linear-gradient(to right, red, red 15px, white 15px, white 8px);
    background-size: 30px 30px;
    background-repeat: repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: ${(props: any) => (props.between ? 'space-between' : 'center')};
  ${(props: any) =>
    props.cursor &&
    `
 cursor:pointer;
`}
`;
export const WhiteIcon = styled(IconButton)<Icon>`
  background: white;
  box-shadow: 2px 2px 4px gray;
  margin: ${(props: any) => (props.noMargin ? '5px' : '15px')};
  @media (max-width: 768px) {
    margin: 10px;
  }
  &:hover {
    background: #33cccc;
    color: white;
    > img {
      color: white;
    }
  }
`;

// -------TEXT----------
export const UnderLineText = styled.span`
  background: linear-gradient(transparent 70%, #ff99cc 70%);
`;
export const Title = styled.h2`
  color: ${(props: any) => (props.dimgray ? 'dimgray' : '#2F4F4F')};
  margin: 0 auto;
  padding: ${(props: any) => (props.min ? '10px 0' : '20px 25px 20px 25px')};
  font-weight: 900;
  font-size: ${(props: any) => (props.min ? '1.3rem' : '1.6rem')};
  text-align: ${(props: any) => (props.left ? 'left' : 'center')};
  ${(props: any) =>
    props.firstLetter &&
    `
  ::first-letter {
  font-size: 180%;
  font-style: italic;
  margin-right:5px;
  color:#00CED1;
}
`}
  ${(props: any) =>
    props.pointer &&
    `
 cursor:pointer;
`}
@media(max-width:768px) {
    font-size: ${(props: any) => (props.min ? '1.2rem' : '1.5rem')};
  }
`;

export const BorderTitle = styled(Title)`
  color: black;
  margin: 0 auto;
  border: 2px solid black;
  padding: 5px 10px;
  display: inline-block;
  border-radius: 10px;
`;

export const Text = styled.p`
  text-align: ${(props: any) => (props.left ? 'left' : 'center')};
  margin: 0 15px;
  font-weight: ${(props: any) => (props.large ? '900' : '400')};
  color: ${(props: any) => (props.white ? 'white' : 'dimgray')};
  color: ${(props: any) => props.black && 'black'};
  font-size: ${(props: any) => (props.large ? '1.3rem' : '1.1rem')};
  padding: 20px 0;
  text-shadow: ${(props: any) => props.shadow && '1px 1px 2px black'};
  text-shadow: ${(props: any) => props.whiteShadow && '1px 1px 2px white'};
  line-height: 1.8rem;
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5rem;
  }
`;
export const MinText = styled.p<Min>`
  text-align: ${(props: any) => (props.left ? 'left' : 'center')};
  margin: 0 5px;
  font-weight: 500;
  color: ${(props: any) => (props.red ? 'red' : 'dimgray')};
  font-size: 0.9rem;
  padding: ${(props): any => (props.nonePadding ? '0' : '10px 0')};
  @media (max-width: 768px) {
    font-size: ${(props: any) => props.min && '0.8rem'};
  }
`;

export const RequiredText = styled.span<Require>`
  /* display:inline-block; */
  color: white;
  background: ${(props: any) => (props.gray ? '#C0C0C0' : 'red')};
  padding: 3px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  float: left;
  margin: 0 7px;
  align-items: center;
`;

export const BoldText = styled.p`
  font-weight: bolder;
  font-size: ${(props: any) => (props.min ? '0.8rem' : '1rem')};
  text-align: center;
  color: ${(props: any) => props.color};
  text-align: ${(props: any) => props.left && 'left'};
  text-align: ${(props: any) => props.right && 'right'};
  ${(props: any) =>
    props.image &&
    `
  width:45%;
  margin:10px auto;
  @media(max-width:768px){
    width:80%;
  }
`};
  ${(props: any) =>
    props.pointer &&
    `
  cursor:pointer;
`}
`;
export const StyledBoldText = styled(BoldText.withComponent('span'))<Center>`
  ${(props: any) =>
    !props.center &&
    `
    float:left;
  `}
`;

// ----------------Layout--------------------
export const Main = styled.div`
  padding: 70px 0;
`;

export const SectionWrapper = styled.section`
  margin: 70px auto;
  margin-top: 10px;
  max-width: ${(props: any) => (props.top ? '1224px' : '1024px')};
  position: relative;
  padding: 0 auto;
  text-align: center;
  width: 100%;
`;

export const SectionWrapping = styled.section`
  margin: ${(props: any) => (props.large ? '50px auto' : '50px auto')};

  max-width: 924px;
  position: relative;
  padding: 0 20px;
  text-align: center;
  /* width: calc(100% - 2rem); */

  background-color: ${(props: any) => props.white && 'white'};
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const GridList = styled.div`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  max-width: 1124px;
  text-align: center;
  margin: 0 auto;

  grid-gap: ${(props: any) => props.gap && '20px'};
  grid-template-columns: ${(props: any) => props.contest && '1fr 1fr 1fr 1fr 1fr'};
  @media (max-width: 1024px) {
    grid-template-columns: ${(props: any) => (props.contest ? '1fr 1fr 1fr 1fr ' : '1fr 1fr 1fr')};
  }
  @media (max-width: 767px) {
    grid-template-columns: ${(props: any) => (props.single ? '1fr' : '1fr 1fr')};
    margin: 0;
    grid-gap: 0px;
  }
`;

export const GridLow = styled.div`
  margin: 0 auto;
  @media (min-width: 1024px) {
    width: 1024px;
    display: flex;

    flex-flow: row wrap;
    justify-content: center;
  }
`;

export const SectionContainer = styled.div`
background:white;
  position: relative;
  margin: ${(props: any) => (props.margin ? '70px auto' : '0 auto')};
  text-align: center;
  max-width: 450px;
  padding: 5px;
  height: auto;
  width: calc(100% - 1rem);
`;

export const TwoColumn = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// --------------Flex----------------------
export const IconFlex = styled.div`
  display: flex;
  list-style: none;
  justify-content: ${(props: any) => (props.between ? 'space-between' : 'center')};
  ${(props: any) =>
    props.nav &&
    `
 justify-content:space-between;
       overflow-x: scroll;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      width:100%;
 `};
  padding: ${(props: any) => props.padding && '30px'};
  >div{
    margin:10px;
  }
`;

export const ScrollMixin = css`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Scroll = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
`;
export const ScrollItem = styled.li`
  display: inline-block;
  width: ${(props: any) => props.width && '250px'};
  margin: 10px;
`;

export const ImageFlex = styled.div`
  display: flex;
  margin: 20px 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ScrollFlex = styled.div`
  ${ScrollMixin};
  display: flex;
  > img {
    margin: 20px 40px;
  }
`;
// ーーーーーーーーーーナビゲーションーーーーーーーーーーー

// ------------背景ーーーーーーーーーーーーーーー

export const ImageWrapper = styled.div`
  margin: 40px auto;
`;

// ーーーーーー装飾リストーーーーーーーーー
export const ListDesign = styled.ol`
  counter-reset: list;
  list-style-type: none;
  font: 14px/1.6 'arial narrow', sans-serif;
  padding: 0;

  > li {
    position: relative;
    padding: 20px 0 10px 15px;
    margin-left: 20px;
    font-weight: bold;
    font-size: 1.3rem;
    line-height: 30px;
    text-align: left;
    color: #2f4f4f;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  li:before {
    counter-increment: list;
    content: '';
    display: block;
    position: absolute;
    left: 0px;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #f6a38b;
    top: 60%;
    -moz-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`;

// -------写真のスタイリングーーーーーーーーー

export const StyledImage = styled.img`
  width: ${(props: any) => props.width}px;
  height: ${(props: any) => props.height}px;
  object-fit: contain;
  margin: 10px;
  @media (max-width: 768px) {
    width: ${(props: any) => (props.min ? '20%' : '95%')};
    margin: 0 auto;
  }
`;
export const CircleImage = styled.img`
  border-radius: 50%;
  width: 90%;
`;
