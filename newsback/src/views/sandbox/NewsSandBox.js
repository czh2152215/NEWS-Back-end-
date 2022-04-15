import { Layout } from 'antd'
import React from 'react'
import { Switch, Route, Routes, Navigate } from 'react-router-dom'
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import Home from './home/Home'
import NoPermission from './nopermission/NoPermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'

//css
import './NewsSandBox.css'

//antd layout
const { Content } = Layout;

export default function NewsSandBox() {
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="user-manage/list" element={<UserList />} />
                        <Route path="right-manage/role/list" element={<RoleList />} />
                        <Route path="right-manage/right/list" element={<RightList />} />
                        <Route path="/" element={<Navigate replace from="/" to="home" />} />
                        <Route path="/*" element={<NoPermission />} />
                    </Routes>
                </Content>
            </Layout>

        </Layout>
    )
}
