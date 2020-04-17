import React from "react";
import Base from "../components/base";
import TitleBar from "../components/titlebar";

export default () => {
    const routes = [
        {
            path: '/',
            name: 'Home',
        },
    ];

    return (
        <div className="app">
            <Base title="Dashboard">
                <TitleBar title="Dashboard" routes={routes} />
            </Base>
        </div>
    )
}
