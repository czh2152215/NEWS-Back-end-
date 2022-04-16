import React, { useState } from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { OmitProps } from 'antd/lib/transfer/ListBody';
const { Header } = Layout;


 function TopHeader(props) {
    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const {role: {roleName},username} = JSON.parse(localStorage.getItem("token"))

    const menu = (
        <Menu>
            <Menu.Item>
                {roleName}
            </Menu.Item>          
            <Menu.Item danger onClick={()=>{
                localStorage.removeItem("token")
                window.location.href="http://localhost:3000/#/login"
            }}>Exit</Menu.Item>
        </Menu>
    );

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}
                /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }

            <div style={{ float: "right" }}>
                <span>
                    Welcome back <b style={{color: "#1890ff"}}>{username}</b> &nbsp;
                </span>

                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}
export default TopHeader