import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

const ColorModeManager = () => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    document.body.classList.toggle('light-mode', colorMode === 'light');
  }, [colorMode]);

  return null;
};

export default ColorModeManager;
