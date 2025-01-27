/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CardRegisterForm from './components/templates/CardRegisterForm/CardRegisterForm';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eee;
`;

ReactDOM.render(
  <StyledContainer>
    <CardRegisterForm />
  </StyledContainer>,
  document.getElementById('root'),

);
