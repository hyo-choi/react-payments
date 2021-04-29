import styled from 'styled-components';
import { COLOR } from '../../../constants/color';

const Styled = {
  InputLabelContainer: styled.div`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
  `,
  Slash: styled.span`
    font-size: 18px;
    color: ${COLOR.GRAY_300};
  `,
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLOR.GRAY_50};
    border-radius: 7px;
    width: 137px;
    border: ${({ validColor }) => (validColor ? `1px solid ${validColor}` : 'none')};
  `,
};

export default Styled;