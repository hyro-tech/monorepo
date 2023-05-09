import styled from 'styled-components';

export const PageFullHeight = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.center ? 'center' : 'start')};
`;

export const Page = styled.div`
  max-width: 660px;
`;
