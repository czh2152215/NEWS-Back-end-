import axios from "axios";
import React, { useEffect, useState } from "react";
import { Switch, Route, Routes, Navigate } from 'react-router-dom'
import Audit from "../views/sandbox/audit-manage/Audit";
import AuditList from "../views/sandbox/audit-manage/AuditList";
import Home from '../views/sandbox/home/Home'
import NewsAdd from "../views/sandbox/news-manage/NewsAdd";
import NewsCategory from "../views/sandbox/news-manage/NewsCategory";
import NewsDraft from "../views/sandbox/news-manage/NewsDraft";
import NewsPreview from "../views/sandbox/news-manage/NewsPreview";
import NewsUpdate from "../views/sandbox/news-manage/NewsUpdate";
import NoPermission from '../views/sandbox/nopermission/NoPermission'
import Published from "../views/sandbox/publish-manage/Published";
import Sunset from "../views/sandbox/publish-manage/Sunset";
import Unpublished from "../views/sandbox/publish-manage/Unpublished";
import RightList from '../views/sandbox/right-manage/RightList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import UserList from '../views/sandbox/user-manage/UserList'

const LocalRouterMap = {
    "/home": <Home/>,
    "/user-manage/list": <UserList/>,
    "/right-manage/role/list": <RoleList/>,
    "/right-manage/right/list": <RightList/>,
    "/news-manage/add": <NewsAdd/>,
    "/news-manage/draft": <NewsDraft/>,
    "/news-manage/category": <NewsCategory/>,
    "/news-manage/preview/:id": <NewsPreview/>,
    "/news-manage/update/:id": <NewsUpdate/>,
    "/audit-manage/audit": <Audit/>,
    "/audit-manage/list": <AuditList/>,
    "/publish-manage/unpublished": <Unpublished/>,
    "/publish-manage/published":<Published/>,
    "/publish-manage/sunset": <Sunset/>,
}

export default function NewsRouter(){
    const [BackRouteList,setBackRouteList] = useState([])

    useEffect(()=>{
        Promise.all([
            axios.get("http://localhost:5000/rights"),
            axios.get("http://localhost:5000/children"),
        ]).then(res=>{
            setBackRouteList([...res[0].data,...res[1].data])
            console.log([...res[0].data,...res[1].data])
        })
    },[])

    const {role: {rights}} = JSON.parse(localStorage.getItem("token"))

    const checkRoute = (item) =>{
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }

    const CheckUserPermission = (item) =>{
        return rights.checked.includes(item.key)
    }

    return(
        <Routes>
            {/* <Route path="home" element={<Home />} />
            <Route path="user-manage/list" element={<UserList />} />
            <Route path="right-manage/role/list" element={<RoleList />} />
            <Route path="right-manage/right/list" element={<RightList />} /> */}
            {BackRouteList.map(item=>{
                if(CheckUserPermission(item) && checkRoute(item)){
                    return <Route path={item.key} key={item.key} element={LocalRouterMap[item.key]} exact></Route>
                }else{
                    return null
                }
            })}
            <Route path="/" element={<Navigate replace from="/" to="/home" />} />
            <Route path="*" element={<NoPermission />} />
        </Routes>
    )
}

