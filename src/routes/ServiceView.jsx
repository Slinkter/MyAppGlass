import React from "react";
import { Outlet } from "react-router-dom";

const ServiceView = () => {
    return (
        <div>
            ServiceView
            <Outlet />
        </div>
    );
};

export default ServiceView;
