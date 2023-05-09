import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error Code = ' + error.code + ' - ' + error.message);
        setError(`${error.code}: ${error.message}`);
      },
    );
  }, []);

  return [geolocation, error];
};
