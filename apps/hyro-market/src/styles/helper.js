import { css } from 'styled-components';

export const DEFAULT_BODY_FONT_SIZE = 14;

/**
 * @see https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints
 // Small devices (landscape phones, 576px and up)
 // Medium devices (tablets, 768px and up)
 // Large devices (desktops, 992px and up)
 // Extra large devices (large desktops, 1200px and up)
 */
export const deviceSizesPixels = {
  phone: 576,
  tablet: 767,
  desktop: 992,
  largeDesktop: 1200,
  extraLargeDesktop: 1500,
};

export const deviceSizes = {
  phone: 'phone',
  tablet: 'tablet',
  desktop: 'desktop',
  largeDesktop: 'largeDesktop',
  extraLargeDesktop: 'extraLargeDesktop',
};

export const deviceMedia = Object.keys(deviceSizes)?.reduce((acc, deviceSizeName) => {
  acc[deviceSizeName] = (first, ...interpolations) => css`
    @media (max-width: ${deviceSizesPixels[deviceSizeName] / DEFAULT_BODY_FONT_SIZE}em) {
      ${css(first, ...interpolations)};
    }
  `;
  return acc;
}, {});
