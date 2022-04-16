import React, { useEffect, useState } from 'react'
import {Table, Button, Modal, Tree} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from 'axios'
export default function RoleList() {
  const { confirm } = Modal;
  const [dataSource, setDataSource] = useState([])
  const [rightList, setrightList] = useState([])
  const [currentRights, setcurrentRights] = useState([])
  const [currentId, setcurrentId] = useState(0)
  const [isModalVisible, setisModalVisible] = useState(false)
  const column =[
    {
      title : "Id",
      dataIndex: "id",
      render: (id)=>{
        return <b>{id}</b>
      }
    },
    {
      title : "Role Name",
      dataIndex: "roleName",
    },
    {
      title: "Edit",
      render: (item) => (
        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={()=>{
              setisModalVisible(true)
              setcurrentRights(item.rights)
              setcurrentId(item.id)
            }}
          />
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => confirmMethod(item)}
          />
        </div>
      ),
    },
  ]

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

  const deleteMethod = (item) => { 
      axios.delete(`http://localhost:5000/roles/${item.id}`);
      setDataSource(dataSource.filter((data) => data.id !== item.id));
  }

  useEffect(()=>{
    axios.get("http://localhost:5000/roles").then(res=>{
      console.log(res.data)
      setDataSource(res.data)
    })
  },[])

  useEffect(()=>{
    axios.get("http://localhost:5000/rights?_embed=children").then(res=>{
      console.log(res.data)
      setrightList(res.data)
    })
  
  },[])

  const handleOk = (checkKeys) =>{
    setisModalVisible(false)
    setDataSource(dataSource.map(item=>{
      if(item.id === currentId){
        return {
          ...item,
          rights:currentRights
        }
      }
      return item
    }))
    axios.patch(`http://localhost:5000/roles/${currentId}`,{
      rights:currentRights
    })
  }

  const handleCancel = () =>{
    setisModalVisible(false)
  }

  const onCheck = (checkKeys)=>{
    console.log(checkKeys)
    setcurrentRights(checkKeys)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={column}
      rowKey={(item)=>item.id}></Table>

    <Modal title="Permission Allocation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Tree
        checkable
        checkedKeys = {currentRights}
        onCheck={onCheck}
        checkStrictly={true}
        treeData={rightList}
      />
    </Modal>
    </div>
  )
}
