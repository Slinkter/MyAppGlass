import Layout from "./layout/Layout";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
    return (
        <>
            <ScrollToTop />
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
}

export default App;
