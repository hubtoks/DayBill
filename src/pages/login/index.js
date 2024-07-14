import { useSearchParams } from "react-router-dom";

const Login = () => {
    const [Params] = useSearchParams();
    const id = Params.get("id");
    const name = Params.get("name");
//useParams()获取url中的参数
//const params = useParams();
//const id = params.id;
//const name = params.name;


    return (
        <div>
            <h1>Login</h1>
            <p>Enter your email and password to login</p>
            <div>{id},这是：{name}</div>
            {/* Add login form here */}
        </div>
    )
}
export default Login;