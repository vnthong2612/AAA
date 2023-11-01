import {useState} from "react";
import axios from "../api/customAxiosConfig.js";
import {Link, useNavigate} from "react-router-dom";
import "../login/Login.css"
const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [mess, setMess] = useState(null);
    const [ok , setOk] =  useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        let inf = username + ":" + password;
        const encoded = 'Basic ' + window.btoa(inf);
        console.log(encoded);

        axios.defaults.headers.common['Authorization'] = encoded;
        try{
            const res = await axios.get("/user");
            localStorage.setItem("JWTToken", res.data);
            axios.defaults.headers.common['Authorization']= localStorage.getItem('JWTToken');
            navigate('/home');

        }catch (e) {
            setMess("Tài khoản hoặc mật khẩu không chính xác");
            setOk(true);
        }

    }





    return (
        <main className="container">

            <form className="form-login" onSubmit={handleLogin}>
                <h2>Đăng Nhập</h2>
                <h3>{ok && mess}</h3>
                <div>

                    <label>Tài khoản: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Tên truy cập"

                    />

                    <label>Mật khẩu: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Mật khẩu"
                    />

                    <h5>Nếu bạn chưa có tài khoản, hãy <Link to="/signup"> Đăng Ký</Link></h5>
                    <button type="submit">
                        Đăng Nhập
                    </button>

                </div>
            </form>
        </main>
    );
}
export default Login;
