import React, { useState, useEffect } from "react";
import { Table, Button, Modal,notification } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;
export default function NewsDraft(props) {
  const [dataSource, setDataSource] = useState([])
  const {username}  = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res => {
        const list = res.data
        setDataSource(list)
        })
  }, [username]);
  const navigate = useNavigate(); 
  const columns = [
    {
        title: "ID",
        dataIndex: "id",
        render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
        title: "News Title",
        dataIndex: "title",
        render:(title,item)=>{
            return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
        }
    },
    {
        title: "Author",
        dataIndex: "author",
       
    },
    {
        title: "Category",
        dataIndex: "category",
        render:(category)=>{
            return category.title
        }
    },
    {
        title: "Edit",
        render: (item) => {
            return <div>
             <Button
              type="primary"
              
              shape="circle"
              icon={<EditOutlined/>}
              onClick={()=>{
                navigate(`/news-manage/update/${item.id}`)

                }
              }
            />
          
            <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => confirmMethod(item)}
          />

            <Button
            
            shape="circle"
            icon={<UploadOutlined />}
            onClick={()=>handleCheck(item.id)}
          />
        </div>
      }
    }
  ];

  const confirmMethod = (item) => {
    confirm({
      title: "Are you sure you want to DELETE?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
      },
    });
  };

  const handleCheck = (id)=>{
    axios.patch(`/news/${id}`,{
        auditState:1
    }).then(res=>{
      navigate('/audit-manage/list')

        notification.info({
            message: `Notification`,
            description:
              `You can view you news in${'audit list'}`,
            placement:"bottomRight"
        });
    })
}

  const deleteMethod = (item) => {
    // if (item.grade === 1) {
    
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/news/${item.id}`);
    // } else {
    //   let parentNode = dataSource.filter((data) => data.id === item.rightId);

    //   axios.delete(`http://localhost:5000/children/${item.id}`);
    //   parentNode[0].children = parentNode[0].children.filter(
    //     (data) => data.id !== item.id 
    //   );
    //   setDataSource([...dataSource]);
    // }
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        rowKey={item=>item.id}
      />
    </div>
  )
}
