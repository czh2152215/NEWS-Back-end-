import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Modal, Switch } from 'antd'
import axios from "axios";
import UserForm from "../../../components/User-manage/UserForm";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
// import Item from "antd/lib/list/Item";
// import { formatStrategyValues } from "rc-tree-select/lib/utils/strategyUtil";

const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [isAddVisible, setisAddVisible] = useState(false);
  const [isUpdateVisible,setisUpdateVisible] = useState(false)
  const [roleList, setroleList] = useState([]);
  const [regionList, setregionList] = useState([]);
  const [current, setcurrent] = useState(null);
 
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false);
  const addForm = useRef(null)
  const updateForm = useRef(null)
  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then((res) => {
      const list = res.data
      setDataSource(list)
    })
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/regions").then((res) => {
      const list = res.data
      setregionList(list)
    })
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      const list = res.data
      setroleList(list)
    })
  }, []);

  const columns = [
    {
      title: "Region",
      dataIndex: "region",
      filters:[
        ...regionList.map(item=>({
          text:item.title,
          value:item.value,
        })),
        {
          text: "Global",
          value: "Global"
        }
      ],
      onFilter:(value,item)=>{
        if(value==="Global"){
          return item.region===""
        }
        return item.region===value
      },
      render: (region) => {
        return <b>{region === ""?'Global':region}</b>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role)=>{
        return role.roleName
      }
    },
    {
      title: "User Name",
      dataIndex: "username",
    },
    {
      title: "User Status",
      dataIndex: "roleState",
      render: (roleState,item)=>{
        return <Switch checked={roleState} disabled={item.default} onChange={()=>handleChange(item)}></Switch>
      }
    },
    {
      title: "Edit",
      render: (item) => (
        <div>
           <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            disabled={item.default}
            onClick={()=>handleUpdate(item)}
          />
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => confirmMethod(item)}
            disabled={item.default}
          />
        </div>
      ),
    },
  ];

  const handleChange = (item) =>{
    item.roleState = !item.roleState
    setDataSource([...dataSource])

    axios.patch(`http://localhost:5000/users/${item.id}`,{
      roleState:item.roleState
    })
  }

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

  const handleUpdate = (item) =>{
    setTimeout(()=>{
      setisUpdateVisible(true)
      if(item.roleId===1){
        setisUpdateDisabled(true)
      }else{
        setisUpdateDisabled(false)
      }
      updateForm.current.setFieldsValue(item)
    },0)

    setcurrent(item)
  }

  const deleteMethod = (item) => {
    setDataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:5000/users/${item.id}`)
  };

  const addFormOK = () =>{
    addForm.current.validateFields().then(value=>{

      setisAddVisible(false)

      axios.post(`http://localhost:5000/users`,{
        ...value,
        "roleState": true,
        "default": false,
      }).then(res=>{
        console.log(res.data)
        setDataSource([...dataSource,{
          ...res.data,
          role:roleList.filter(item=>item.id === value.roleId)[0]
        }])
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  const updateFormOK = ()=>{
    updateForm.current.validateFields().then(value=>{
      setisUpdateVisible(false)

      setDataSource(dataSource.map(item=>{
        if(item.id===current.id){
          return{
            ...item,
            ...value,
            role:roleList.filter(data=>data.id===value.roleId)[0]
          }
        }
        return item
      }))
      setisUpdateDisabled(!isUpdateDisabled)

      axios.patch(`http://localhost:5000/users/${current.id}`,value)
    })
  }

  return (
    <div>
      <Button type="primary" onClick={()=>{setisAddVisible(true)}}>Add User</Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={item=>item.id}
      />

    <Modal
      visible={isAddVisible}
      title="Add User"
      okText="Confirm"
      cancelText="Cancel"
      onCancel={()=>{
        setisAddVisible(false)
      }}
      onOk={() => { addFormOK()}}
    >
      <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
    </Modal>

    <Modal
      visible={isUpdateVisible}
      title="Update User"
      okText="Update"
      cancelText="Cancel"
      onCancel={()=>{
        setisUpdateVisible(false)
        setisUpdateDisabled(!isUpdateDisabled)
      }}
      onOk={() => { updateFormOK()}}
    >
      <UserForm regionList={regionList} roleList={roleList} ref={updateForm} isUpdateDisabled={isUpdateDisabled}></UserForm>
    </Modal>
    </div>
  );
}
