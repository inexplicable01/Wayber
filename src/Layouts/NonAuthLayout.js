import React, { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';
import { Outlet } from "react-router-dom";
//redux
import { useSelector } from "react-redux";

const NonAuthLayout = ({ children }) => {
    const {
        layoutModeType,
    } = useSelector(state => ({
        layoutModeType: state.Layout.layoutModeType,
    }));
    // const layoutModeType ="dark"
    useEffect(() => {
        if (layoutModeType === "dark") {
            document.body.setAttribute("data-layout-mode", "dark");
        } else {
            document.body.setAttribute("data-layout-mode", "light");
        }
        return () => {
            document.body.removeAttribute("data-layout-mode")
        }
    }, [layoutModeType]);
    return (
        <div>
            {/* other layout components, header, etc. */}
            {children} {/* This renders the child routes */}
        </div>
    );
};

export default withRouter(NonAuthLayout);