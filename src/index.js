import { createRoot } from 'react-dom/client'
// import App from './App'


//导入store和Provider(react-redux提供用于连接react和redux的组件)
import { Provider } from 'react-redux'
import store from './store'

//导入路由
import router from './router'
import {  RouterProvider } from 'react-router-dom'


const root = createRoot(document.querySelector('#root'))

root.render(
  // 绑定仓库
   <Provider store={store}>  
     {/* 绑定路由 */}
      <RouterProvider router={router} /> 

   </Provider>

   //  <App />
)