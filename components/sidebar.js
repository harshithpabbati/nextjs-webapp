import React, { useState, useEffect } from 'react';
import {Menu, Layout, Drawer} from 'antd';
import cmsLogo from '../static/images/cms_logo.png';
import { MenuOutlined } from "@ant-design/icons";

import list from './links';
import Link from "next/link";

const { SubMenu } = Menu;
const { Sider } = Layout;

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions(),
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

const Sidebar = ({ selected, children, isAdmin }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const { width } = useWindowDimensions();

    let selectedKeys = selected ? selected.slice(1).split('/') : [];
    selectedKeys.length > 0
        ? (selectedKeys = selectedKeys.map((e, i) => {
            if (i !== 0) {
                return selectedKeys[i - 1] + '-' + e;
            }
            return e;
        }))
        : [];

    const getMenuItem = ( link, label, key ) => (
        <Menu.Item key={key}>
            <Link href={link}>
                {label}
            </Link>
        </Menu.Item>
    );

    const menu = (
        <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={selectedKeys}
            style={{ height: '100vh' }}
            theme="dark"
        >
            <div className="text-center my-4">
                <img src={cmsLogo} style={{ width: "80%"}}  alt='CMS Logo'/>
            </div>
            {
                list.map(i =>
                    (isAdmin || i.adminExclusive === undefined) ?
                        i.items ?
                            <SubMenu
                                key={i.key}
                                title={
                                    <div>{i.title}</div>
                                }
                            >
                                { i.items.map(e =>
                                    getMenuItem(`/${i.key}/${e.key}`, e.title, `${i.key}-${e.key}`, )
                                )}
                            </SubMenu>
                            : getMenuItem(i.key !== '/' ? `/${i.key}` : '/', i.title, `${i.key}`, )
                        : null
                )
            }
        </Menu>
    );

    const navbar = (
        <div className="navbar navbar-light bg-light p-2">
            <div className="row m-0 w-100 p-2">
                { width < 600 ?
                    <React.Fragment>
                        <div className="col-2 d-flex align-items-center">
                            <MenuOutlined
                                style={{ fontSize: '1.5rem' }}
                                onClick={() => setSidebarVisible(true)}
                            />
                        </div>
                        <div className="col d-flex align-items-center">
                            <img src={cmsLogo} style={{ height: "5vh"}}  alt='CMS Logo'/>
                        </div>
                    </React.Fragment> : null
                }
            </div>
            <Drawer
                placement="left"
                closable
                onClose={() => setSidebarVisible(false)}
                visible={sidebarVisible}
                bodyStyle={{ padding: 0 }}
            >
                {menu}
            </Drawer>
        </div>
    );


    return width > 600 ? (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
                width={230}
            >
                {menu}
            </Sider>
            <Layout style={{ marginLeft: 230 }}>
                {children}
            </Layout>
        </Layout>
    ) : (
        <div>
            {navbar}
            <div className="page-container">{children}</div>
        </div>
    );

};

export default Sidebar;