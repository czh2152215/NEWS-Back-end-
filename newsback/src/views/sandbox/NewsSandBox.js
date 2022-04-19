import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { Switch, Route, Routes, Navigate } from 'react-router-dom'
import NewsRouter from '../../components/NewsRouter'
import SideMenu from '../../components/SideMenu'
import TopHeader from '../../components/TopHeader'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//css
import './NewsSandBox.css'

//antd layout
const { Content } = Layout;

export default function NewsSandBox() {
    NProgress.start()
    
    useEffect(()=>{
        NProgress.done()
    })
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
                    <NewsRouter/>
                </Content>
            </Layout>

        </Layout>
    )
}
