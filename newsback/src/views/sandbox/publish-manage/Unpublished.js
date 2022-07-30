import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/UsePublish'
import {Button} from 'antd'

export default function Unpublished() {
    // 1=== 待发布的
    const {dataSource,handlePublish} = usePublish(1)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id)=><Button type="primary" onClick={()=>handlePublish(id)}>
                Publish
            </Button>} ></NewsPublish>
        </div>
    )
}
