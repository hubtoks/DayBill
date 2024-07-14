import { createBrowserRouter } from 'react-router-dom'
import Test1 from '../pages/test/test'
import Login from '../pages/login/index'
import About from '../pages/about'
import Home from '../pages/home'
import Board from '../pages/board'
import New from '../pages/new'
//创建路由对象
const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/test', element: <Test1 /> },
  { path: '/new', element: <New />},
  {path: '/', element: <Home/>,
     children: [
      //将board组件作为默认二级，访问1级时它也会加载
      { index: true, element: <Board /> },
      { path: 'about', element: <About /> },
    ]
  },
])

export default router