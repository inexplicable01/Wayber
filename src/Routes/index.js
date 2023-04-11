import React from 'react';
import {Routes, Route} from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import {authProtectedRoutes, publicRoutes} from "./allRoutes";
import {AuthProtected} from './AuthProtected';

const Index = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (

                        //     if (route.path==='asdfasdfasfd'){
                        //         console.log('bahlbahl')
                        // }
                        //     else{
                        //
                        // }
                        <Route
                            path={route.path}
                            element={
                                route.path === "/landingtest" ? (
                                    (console.log('Condition met'), route.component)
                                ) : (
                                    <NonAuthLayout>{route.component}</NonAuthLayout>
                                )
                            }
                            key={idx}
                            exact={true}
                        />
                    ))}
                </Route>

                <Route>
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <VerticalLayout>{route.component}</VerticalLayout>
                                </AuthProtected>}
                            key={idx}
                            exact={true}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;