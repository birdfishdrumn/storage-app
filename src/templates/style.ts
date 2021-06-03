import styled from 'styled-components';

export const CategoryImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;
export const ImageText = styled.div`
  position: absolute;
  bottom: 10%;
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  top: 10px;
  left: 5%;
  text-shadow: 1px 2px 2px black;
  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;
export const CategoryImage = styled.img`
  border-radius: 10px;
  height: 25vh;
  width: 100%;
  object-fit: cover;
`;
