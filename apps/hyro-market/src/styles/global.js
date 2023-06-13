import { createGlobalStyle } from 'styled-components';

import theme from './theme';

export const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: ${theme.font.weight.bold};
    margin-bottom: 24px;
    color: #333333;
  } 
 
  button {
    font-family: 'Montserrat', sans-serif;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: ${theme.font.large};
    font-weight: ${theme.font.weight.regular};
    color: #333333;
  }
  
  a {
    cursor: pointer;
    text-decoration: none;
    color: #333333;
    
    &:hover {
      color: inherit !important;
    }
    
    transition: 0.2s;
  }
  
  span {
      font-family: 'Montserrat', sans-serif;
  }
  
  .modal-dialog {
    max-width: 600px;
    margin: 0;
  }

  .modal-item {
    width: 600px;
    max-width: 100%;
  }
  
  .modal-item .modal-content {
    width: 600px;
    max-width: 100%;
  }
`;
