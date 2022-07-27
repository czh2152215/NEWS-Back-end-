import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import moment from 'moment'
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function NewsPreview() {
    const [newsInfo, setnewsInfo] = useState(null)
    const params = useParams() 
    useEffect(() => {
        // console.log()
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => {
            setnewsInfo(res.data)
        })
    }, [params.id])
    
    const auditList = ["Not Audited", 'Under Audit', 'Approved', 'Not Approved']
    const publishList = ["Not Published", 'To be published', 'Published', 'Offline']
    const colorList = ["black","orange","green","red"]
    return (
        <div>
            {
                newsInfo && <div>

                    <PageHeader
                        onBack={() => window.history.back()}
                        title={newsInfo.title}
                        subTitle={newsInfo.category.title}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="Author">{newsInfo.author}</Descriptions.Item>
                            <Descriptions.Item label="CreateTime">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                            <Descriptions.Item label="PublishTime">{
                                newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"
                            }</Descriptions.Item>
                            <Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>
                            <Descriptions.Item label="AuditState" ><span style={{ color: colorList[newsInfo.auditState]}}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
                            <Descriptions.Item label="PublishState" ><span style={{ color: colorList[newsInfo.publishState]}}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
                            <Descriptions.Item label="View">{newsInfo.view}</Descriptions.Item>   
                            <Descriptions.Item label="Star">{newsInfo.star}</Descriptions.Item>
                            <Descriptions.Item label="Comments">0</Descriptions.Item>

                        </Descriptions>
                    </PageHeader>

                    <div dangerouslySetInnerHTML={{
                        __html:newsInfo.content
                    }} style={{
                        margin:"0 24px",
                        border:"1px solid gray"
                    }}>
                    </div>
                </div>
            }
        </div>
    )
}
