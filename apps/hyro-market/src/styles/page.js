import styled from 'styled-components';

import { deviceSizesPixels } from './helper';

export const PageFullHeight = styled.div`
  height: -webkit-fill-available;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.center ? 'center' : 'start')};
  overflow: hidden;
`;

export const DeviceContainer = styled.div`
  margin: auto;
  position: relative;
  max-width: ${deviceSizesPixels.extraLargeDesktop}px;
  overflow: hidden;
  max-height: 100vh;
`;

export const PageContainer = styled.div`
  padding: 40px 20px;
`;
