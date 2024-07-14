import { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { increment,decrement, incrementByValue } from '../../store/modules/counterStore'
import { fetchChannelList } from '../../store/modules/channelStore'

import { useNavigate,Link } from "react-router-dom";//编程式导航useNavigate与声明式导航Link

const List = [    //用于列表渲染
  { id: 1, name: 'liuyuntoks' },
  { id: 2, name: 'distoks' },
  { id: 3, name: 'codetoks' },
]

function useToggle() { //自定义hook,可服用代码逻辑,条件渲染代码复用   use开头的函数叫hook函数
  const [isToggle, setIsToggle] = useState(true)
  const toggle = () => {setIsToggle(!isToggle)}
   return {isToggle, toggle}//return出去就能在其他函数体力接收
 }

function Son(props){  //props是父组件传给子组件的参数，props是只读的，不能修改
  const SonMsg = 'hello Dad'
  return <div>{props.数组},{props.obj.name}<br/>
   <button onClick={()=>{props.方法(SonMsg)}}>点击我给父组件传参</button>
  </div>      
}




function Test() {
  //数据仓库dispatch固定流程
  
  const { count } = useSelector(state => state.counter)//需要与counterStore里initialState的名字一致
  const { channelList } = useSelector(state => state.channel)//前面需要与channelStore里initialState的名字一致，后面与name一致
  const dispatch = useDispatch()

  const navigate = useNavigate()//编程式导航



  const [msg, setMsg] = useState('') 
  const ClickBtn = (自定义参数名称, e) => {
    console.log('点击了按钮', 自定义参数名称, e)
  }

  const SonMeg =(msg)=>{
    setMsg(msg)
  }
 

  const [number, setNumber] = useState(0); //解构语法，useState是react自带的，传回来一个数组，里面有当前状态count和修改状态的方法setCount,
  const [object, setObject] = useState({ name: 'liuyuntoks', age: 20 }) //useState()里可以是数字也可以是对象
  const [value, setValue] = useState('')//绑定表单输入
  // const [list, setList] = useState(List) //用于列表渲染
  const [isLogin, setIsLogin] = useState(false) //用于条件渲染

  useEffect(() => {   //类比于Created、onLoad
                      // 1.当第二个参数为空数组时，只执行一次，组件更新也不执行  
                      // 2.没东西时，每次组件更新都会执行 
                      // 3.当第二个参数里有值时，只有当第二个参数里的值改变时才会执行
    // async function getData() {  //useEffect里不能直接写async函数，要写成这样
    //   const res = await fetch('https://geek.itheima.net/v1_0/channels')//
    //   const data = await res.json()  //fetch返回的是流，需要用json()方法将其转换为json格式
    //   console.log(data)
    //   setList(data.data.channels)
    // }
    //  getData()
    
    //以上已经封装到channelStore里了，直接调用即可，数据也存到了store里，在组件里用useSelector取出来即可
    dispatch(fetchChannelList())
  },[dispatch])

  const giveSon = 'hello son'

  const {isToggle, toggle } = useToggle()  //自定义hook

  return (
    <div >
      {/* 列表渲染 */}
      {List.map((item) => {//item是List的每一个元素，map代表遍历
        return <div key={item.id}>{item.name}</div>  //返回找到的item里的id作为key来标识唯一,item里的name用于渲染
      })}

      {/* 条件渲染 */}
      {isLogin && <div>欢迎回来</div>}
      {isLogin ? <div>欢迎回来</div> : <div>请先登录</div>}
      <button onClick={() => { setIsLogin(!isLogin) }}>点击我控制登入状态</button><br/>

      {/* 事件处理 事件对象和自定义参数,变成了一个ClickBtn的可接收参数*/}
      <button onClick={(e) => { ClickBtn('自定义参数名称', e) }}>点击我</button><br/>

      {/* 状态参数修改 ，只有用setCount才能使得视图渲染同时改变，count++能改值不能改渲染*/}
      <button onClick={() => { setNumber(number + 1) }}>点击了{number}下</button><br/>
      <button onClick={() => { setObject({ ...object, name: 'codetoks' }) }}>点击修改名字</button><br/>
      <div>{object.name}</div>
      

      {/* 表单输入绑定 输入绑定给value,改变时调用setVlaue*/}
      <input 
      value={value} 
      onChange={(e) => { setValue(e.target.value) }} />
      <div>获取到的输入：{value}</div>

      {/* 组件传参 ，什么都能传，方法、JSX、对象、数组等*/}
      <Son 
      传给子组件对象中的属性名={giveSon}
      年龄={18}
      obj={{ name: 'liuyuntoks', age: 20 }}
      数组={[1, 2, 3]}
      方法={SonMeg}
      />  
       {/* 在子组件标签内的，会默认作为props对象里的children,传给子组件,作为之后传的会覆盖之前传的 */}
      {/* <Son>  <div>hello world</div></Son> */}

      {/* 子传父，1.先利用父传子将方法传递给子，2.子利用这个方法将参数传递回去 */}
      <span>{msg}</span>
      <ul>{channelList.map((item) => { //map遍历返还<li>，key是唯一标识，item是List的每一个元素
        return <li key={item.id}>{item.name}</li>
      })}

      {/* 自定义条件渲染hook */}
      {isToggle && <div>hello world</div>}
      <button onClick={toggle}>点击我控制Hello world显示</button>
      </ul>

       {/* 数据仓库所得countStore ,再用dispatch传回结构出的increment,decrement方法*/}
        <button onClick={() => { dispatch(increment()) }}>增加</button>
         <span>{count}</span>
        <button onClick={() => { dispatch(decrement()) }}>减少</button>
        {/* 传参的版本，需要counterStore.js的reducer里写相应的aciton.payload来使用 */}
        <button onClick={() => { dispatch(incrementByValue(5)) }}>一次增加5</button><br/>

        {/* 路由导航 */}
         <Link to="/Login">login页面</Link>
         <button onClick={() => { navigate('/Login')}}>点击去login页面</button>
         {/* 导航传参 */}
         <button onClick={() =>  navigate('/Login/需要在Router声明/第二参数')}> params传参</button> 
         <button onClick={() => navigate('/Login?id=直接声明&name=第二参数')}> searchParams传参</button>
         
          



    </div>
  );
}

export default Test;
