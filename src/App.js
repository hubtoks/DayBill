import './App.scss'
import avatar from './images/bozai.png'
import { useState,useRef, useEffect } from 'react'
import { orderBy} from 'lodash'
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'




// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}
// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

function useGetData() {    //请求数据封装，一定要use开头才能这样自定义封装，
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    async function getList(){
      const res = await axios.get('http://localhost:3004/List')
      setCommentList(res.data)
    }
    getList()
  },[])
  
  return {commentList,setCommentList} //return出去，才能在其他组件里使用
}

function CommentItem({item,onDel}) {   //评论子组件,记得传过来是个对象，用{}解构出来
  return (<div key={item.rpid} className="reply-item">
    {/* 头像 */}
    <div className="root-reply-avatar">
      <div className="bili-avatar">
        <img
          className="bili-avatar-img"
          alt=""
         
        />
      </div>
    </div>
    <div className="content-wrap">
      {/* 用户名 */}
      <div className="user-info">
        <div className="user-name">{item.user.uname}</div>
      </div>
      {/* 评论内容 */}
      <div className="root-reply">
        <span className="reply-content">{item.content}</span>
        <div className="reply-info">
          {/* 评论时间 */}
          <span className="reply-time">{item.ctime}</span>
          {/* 评论数量 */}
          <span className="reply-time">点赞数:{item.like}</span>
          { user.uid === item.user.uid && <span className="delete-btn" onClick={()=>{onDel(item.rpid)}}>
            删除
          </span>}

        </div>
      </div>
    </div>
  </div>
    
  )
  
}

const App = () => {
 
  const {commentList,setCommentList} = useGetData()

  const deleteComment = (rpid) => {   
    // 根据id删除评论
    setCommentList(commentList.filter(item => item.rpid !== rpid)) //过滤，先不做真的删除
  }


  const [type, setType] = useState('hot') //默认最热排序
  const handleTabClick = (type) => { //接收onClick事件传过来的type,并用react状态参数记录type的值
    setType(type)
    // 根据排序类型，对评论列表进行排序
    if (type === 'hot') {
      setCommentList(orderBy(commentList, ['like'], ['desc']))
    }else if (type === 'time') {
      setCommentList(orderBy(commentList, ['ctime'], ['desc']))
    }
  }

  const inputRef = useRef(null) //创建一个ref对象，为了拿取input里的dom元素,进而调用focus方法，让光标重新聚焦
  const [content, setContent] = useState('')
  const handlePublish = () => {
    setCommentList([...commentList,//加载其他项
      {
      rpid: uuidv4(),
      user: {
        uid: '30009257',
        avatar,
        uname: '黑马前端',
      },
      content: content,
      ctime: dayjs(new Date()).format('MM-DD hh:mm'),
      like: 66,
    },
    ])
    setContent('')
    inputRef.current.focus() //获取ref对象，并调用focus方法
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item=>
            <span 
            className={`nav-item ${type === item.type && 'active'}`}  //当被记录的type等于item.type时，添加active类名
            key={item.type}
            onClick={()=>handleTabClick(item.type)}
            >{item.text}</span>) }
           
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              ref={inputRef}
            />
          
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
        {commentList.map(item=>(<CommentItem key={item.rpid} item={item} onDel={deleteComment} />))}
        
       
       </div> 
      </div>
    </div>
  )
}

export default App