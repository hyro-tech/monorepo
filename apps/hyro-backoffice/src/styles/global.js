import { createGlobalStyle } from 'styled-components';

import theme, { colors } from './theme';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: ${theme.font.weight.bold};
    margin-bottom: 24px;
  } 

  button {
    font-family: 'Montserrat', sans-serif;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: ${theme.font.large};
    font-weight: ${theme.font.weight.regular};
  }
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      color: ${colors.primary};
    }
    
    transition: 0.2s;
  }
    
  
  .modal-body {
    padding: 20px 40px;
    
    h5 {
      text-align: center;
    }
  }
  
  .modal-fit-content {
    width: fit-content;
  }
  
  .modal-fit-content .modal-content {
    width: fit-content;
  }
`;
