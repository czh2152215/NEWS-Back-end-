import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/UsePublish'
import {Button} from 'antd'
export default function Offline () {
    // 3=== 已下线的
    const {dataSource,handleDelete} = usePublish(3)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id)=><Button danger onClick={()=>handleDelete(id)}>
                Delete
            </Button>}></NewsPublish>
        </div>
    )
}
