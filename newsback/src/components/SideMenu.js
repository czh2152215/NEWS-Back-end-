import React, { useEffect, useState } from "react";
import './index.css'
import { Layout, Menu } from "antd";
import { UserOutlined, HomeOutlined, CrownOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useNavigate, useLocation } from "react-router";
import axios from 'axios';


const { Sider } = Layout;

// const menuList = [
//     {
//         key: "/home",
//         title: "Home",
//         icon: <HomeOutlined />,
//     },
//     {
//         key: "/user-manage",
//         title: "User Management",
//         icon: <UserOutlined />,
//         children: [
//             {
//                 key: "/user-manage/list",
//                 title: "User List",
//                 icon: <UserOutlined />,
//             },
//         ],
//     },
//     {
//         key: "/right-manage",
//         title: "Right Management",
//         icon: <CrownOutlined />,
//         children: [
//             {
//                 key: "/right-manage/role/list",
//                 title: "Role List",
//                 icon: <CrownOutlined />,
//             },
//             {
//                 key: "/right-manage/right/list",
//                 title: "Right List",
//                 icon: <CrownOutlined />,
//             },
//         ],
//     },
// ];

const iconList = {
    "/home": <UserOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <UserOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <UserOutlined />,

}

export default function SideMenu({ collapsed }) {
    let navigate = useNavigate();

    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/rights?_embed=children").then(res => {
            console.log(res.data);
            setMenu(res.data)
        })
    }, [])

    const checkPagePermission = (item) => {
        return item.pagepermisson === 1;
    }

    // Menu
    const renderMenu = (menuList) => {
        return menuList.map((item) => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return (
                    <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
                        {renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return checkPagePermission(item) && <Menu.Item
                key={item.key}
                icon={iconList[item.key]}
                onClick={() => navigate(item.key)}
            >
                {item.title}
            </Menu.Item>
        });
    };

    let location = useLocation();
    const selectKeys = [location.pathname]; // ex: ['/home']
    const openKeys = ["/" + location.pathname.split("/")[1]];

    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
                <div className="logo">Global Press Release Management System</div>

                <div style={{ flex: 1, "overflow": "auto" }}>
                    <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
                        {renderMenu(menu)}
                    </Menu>
                </div>
            </div>
        </Sider>
    );
}
