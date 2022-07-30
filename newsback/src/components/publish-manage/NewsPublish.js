import React from 'react'
import { Table} from 'antd'

export default function NewsPublish(props) {

    const columns = [
        {
            title: 'News Title',
            dataIndex: 'title',
            render: (title,item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: "Category",
            dataIndex: 'category',
            render: (category) => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "Edit",
            render: (item) => {
                return <div>
                    {props.button(item.id)}
                </div>
            }
        }
    ];

    return (
        <div>
            <Table dataSource={props.dataSource} columns={columns}
                pagination={{
                    pageSize: 8
                }} 
                rowKey={item=>item.id}
                />
        </div>
    )
}
