// Layout.jsx

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" flex="1">
      <Navbar />
      {children}
      <Footer />
    </Flex>
  );
};

export default Layout;
