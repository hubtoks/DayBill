import { Link, Outlet } from "react-router-dom"; //引入Link和Outlet

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to my app!</p>
            <Link to='/about'>跳转显示About</Link> |
            <Link to='/'>跳转显示Board</Link>
            <Outlet/>
        </div>
    )
}


export default Home; 