import React, { useEffect, useState, useRef } from "react";
import { Button, Layout, PageHeader, Steps, Form, Input, Select, message, notification } from "antd";
import "./News.css"
import axios from "axios";
import NewsEditor from "../../../components/news-manage/NewsEditor";

import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const {Step} = Steps;
const {Option} = Select;
export default function NewsUpdate(){
    const [current,setcurrent] = useState(0)
    const [categoryList, setcategoryList] = useState([])
    

    const [formInfo, setformInfo] = useState({})
    const [content, setContent] = useState("")

    

    const handleNext = () =>{
        if(current===0){
            NewsForm.current.validateFields().then(res=>{
                setformInfo(res)
                setcurrent(current+1)
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }else{
            if(content==="" || content.trim()==="<p></p>"){
                message.error("Null ontent")
            }else{
                setcurrent(current+1)
            }
        }
    }
            
    const handleLast = () =>{
        setcurrent(current-1)
    }
    const Layout ={
        labelCol: {span: 2},
        wrappercol: {span: 14}
    }

    const NewsForm = useRef(null)

    useEffect(()=>{
        axios.get("/categories  ").then(res=>{
            setcategoryList(res.data)
        })
    },[])

    const navigate = useNavigate(); 
    const params = useParams(); 
    useEffect(() => {
        
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => {

                let {title,categoryId,content} = res.data
            NewsForm.current.setFieldsValue({
                title,
                categoryId,

            })   
                setContent(content)
            })
    }, [params.id])
                


    const handleSave = (auditState) =>{
        axios.patch(`/news/${params.id}`, {
            ...formInfo,
            "content": content,
            "auditState": auditState,
        }).then(res=>{
            navigate(auditState===0?'/news-manage/draft':'/audit-manage/list')

            notification.info({
                message: "Notification",
                description:`You can view you news in ${auditState===0? "Draft Box" : "Audit List"}`,
                placement: "bottomRight"
            });
        })
    }

    return(
        <div>
            <PageHeader
                className="site-page-header"
                title="Update News"
                onBack={()=>window.history.back()}
                subTitle="This is a subtitle"
           />

        <Steps current={current}>
            <Step title="Basic Information" description="News Title & Category" />
            <Step title="News Content" description="Details of Contents" />
             {/* <Step title="News Content" subTitle="Left 00:00:08" description="Details of Contents" />  */}
            <Step title="Submit News" description="Save & Wait For Review" />
        </Steps>

        <div style={{marginTop:"40px"}}>
        <div className={current===0?"":'active'}>
        <Form
            {...Layout}
            name="basic"
            ref={NewsForm}
        >
            <Form.Item
            label="News Title"
            name="title"
            rules={[{ required: true, message: 'Please input News Title !' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="News Category"
            name="categoryId"
            rules={[{ required: true, message: 'Please input News Category !' }]}
            >
                <Select>
                    {
                        categoryList.map(item=>
                            <Option value={item.id} key={item.id}>{item.title}</Option>
                        )
                    }
                </Select>
            </Form.Item>
        </Form>
        </div>
        </div>

        <div className={current===1?'':'active'}>
            <NewsEditor getContent={(value)=>{
                // console.log(value)
                setContent(value)
            }} content={content}></NewsEditor>
        </div>  
        <div className={current===2?'':'active'}>
            
        </div>
        
        <div style={{marginTop:"50px"}}>
            {
                current>0 && <Button  onClick={()=>handleLast()}>Last</Button>  
            }  
            {
                current<2 && <Button type="primary" onClick={()=>handleNext()}>Next</Button>  
            }
            {
                current===2 && <span>
                    <Button type="primary" onClick={()=>handleSave(0)}>Save Draft</Button>
                    <Button danger onClick={()=>handleSave(1)}>Submit</Button>
                </span>  
            }
        </div>
        </div>
    )
}