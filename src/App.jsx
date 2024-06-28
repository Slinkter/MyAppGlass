// src/App.jsx
import { Box, Button, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={4}>
      <Button onClick={toggleColorMode}>
        Cambiar a {colorMode === "light" ? "oscuro" : "claro"}
      </Button>
      {/* Otros componentes aquí */}
    </Box>
  );
}

export default App;
