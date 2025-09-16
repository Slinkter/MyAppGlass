import Layout from "./layout/Layout";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { Fragment } from "react";

function App() {



  return (

     <Fragment> 
      <ScrollToTop />
      <Layout>
        <Outlet />
      </Layout>
    </Fragment>
  );
}

export default App;
