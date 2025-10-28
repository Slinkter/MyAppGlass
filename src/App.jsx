import { Suspense } from "react";
import Layout from "./layout/Layout";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { Flex, Spinner } from "@chakra-ui/react";

function App() {
    return (
        <>
            <ScrollToTop />
            <Layout>
                <Suspense
                    fallback={
                        <Flex
                            w="full"
                            h="80vh"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Spinner size="xl" />
                        </Flex>
                    }
                >
                    <Outlet />
                </Suspense>
            </Layout>
        </>
    );
}

export default App;
