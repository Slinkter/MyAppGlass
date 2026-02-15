import { useState, useCallback } from "react";

export const useMapState = () => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return { map, onLoad, onUnmount };
};
