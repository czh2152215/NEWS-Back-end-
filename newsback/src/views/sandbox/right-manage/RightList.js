import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Modal, Popover, Switch } from "antd";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;
export default function RightList() {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      setDataSource(
        res.data.map((s) => {
          if (!s.children) {
            return s;
          }
          if (s.children.length === 0) {
            s.children = null;
          }
          return s;
        })
      );
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "Rights Name",
      dataIndex: "title",
    },
    {
      title: "Rights path",
      dataIndex: "key",
      render: (key) => <Tag color="success">{key}</Tag>,
    },
    {
      title: "Edit",
      render: (item) => (
        <div>
          <Popover
            content={
              <div style={{ textAlign: "center" }}>
                <Switch
                  checked={item.pagepermisson === 1}
                  onChange={() => switchMethod(item)}
                ></Switch>
              </div>
            }
            title="Title"
            trigger={item.pagepermisson === undefined ? "" : "click"}
          >
            <Button
              type="primary"
              disabled={item.pagepermisson === undefined}
              shape="circle"
              icon={<EditOutlined />}
            />
          </Popover>
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => confirmMethod(item)}
          />
        </div>
      ),
    },
  ];

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
    setDataSource([...dataSource]);

    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };

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
    if (item.grade === 1) {
      axios.delete(`http://localhost:5000/rights/${item.id}`);
      setDataSource(dataSource.filter((data) => data.id !== item.id));
    } else {
      let parentNode = dataSource.filter((data) => data.id === item.rightId);

      axios.delete(`http://localhost:5000/children/${item.id}`);
      parentNode[0].children = parentNode[0].children.filter(
        (data) => data.id !== item.id 
      );
      setDataSource([...dataSource]);
    }
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
}
