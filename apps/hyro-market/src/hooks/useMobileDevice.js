import { useEffect, useState } from 'react';
import { detect } from 'detect-browser';

export const useMobileDevice = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(null);

  useEffect(() => {
    const browser = detect();

    const mobileDevices = ['iOS', 'Android OS', 'BlackBerry OS', 'Windows Mobile'];

    setIsMobileDevice(mobileDevices?.includes(browser.os));
  }, []);

  return isMobileDevice;
};
