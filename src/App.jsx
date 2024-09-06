import Layout from "./layout/Layout";
import { Outlet } from "react-router-dom";
window.document.title =
    "Vidrieria en La Molina instalación de ventanas, mamparas, puertas de ducha y más. Servicios de mantenimiento y calidad garantizada. tef. 996-537-435";
function App() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export default App;
