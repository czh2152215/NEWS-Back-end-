import {useEffect, useState} from 'react'
import axios from 'axios'
import {notification} from 'antd'

function usePublish(type){
    const {username} = JSON.parse(localStorage.getItem("token"))

    const [dataSource, setdataSource] = useState([])
    useEffect(() => {

        axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(res=>{
            // console.log(res.data)
            setdataSource(res.data)
        })
    }, [username,type])



    const handlePublish = (id)=>{
        setdataSource(dataSource.filter(item=>item.id!==id))

        axios.patch(`/news/${id}`, {
            "publishState": 2,
            "publishTime":Date.now()
        }).then(res=>{
            notification.info({
                message: `Notification`,
                description:
                  `You can view you news in Publish Management / Published`,
                placement:"bottomRight"
            });
        })
    }

    const handleSunset = (id)=>{
        setdataSource(dataSource.filter(item=>item.id!==id))

        axios.patch(`/news/${id}`, {
            "publishState": 3,
        }).then(res=>{
            notification.info({
                message: `Notification`,
                description:
                `You can view you news in Publish Management / Sunset`,
                placement:"bottomRight"
            }); 
        })
    }

    const handleDelete = (id)=>{
        setdataSource(dataSource.filter(item=>item.id!==id))

        axios.delete(`/news/${id}`).then(res=>{
            notification.info({
                message: `Notification`,
                description:
                  `You have deleted the news that has been taken offline`,
                placement:"bottomRight"
            });
        })

    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}

export default usePublish