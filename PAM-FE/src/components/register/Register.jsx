import {useState} from "react";
import axios from "axios";
import "./Register.css"
import {Link, useNavigate} from "react-router-dom";

const RegisterService = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repeat, setRepeat] = useState('');
    const [existed, setExisted] = useState(false);
    const [mess, setMess] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = JSON.stringify({
                "email": email,
                "username": username,
                "password": password,
                "repeatPassword": repeat
            })
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.post("/register", data, config)
            console.log(res.data)
            alert("Bạn đã tạo tài khoản thành công")
            navigate("/home");



        } catch (error) {
            setExisted(true);
            setMess(error.response.data);
            console.log(error);
        }
    }

    return (
        <main className="register">

            <form className="form" onSubmit={handleSubmit}>
                <h2>Tạo tài khoản</h2>
                <span>{existed && mess}</span>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        placeholder="Email"
                    />
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
                    <label >Xác Nhận Mật khẩu: </label>
                    <input
                        type="password"
                        value={repeat}
                        onChange={(e) => setRepeat(e.target.value)}
                        required
                        placeholder="Xác nhận mật khẩu"
                    />

                    <span>{(password !== repeat) ? "Mật khẩu xác nhận không trùng" : ""}</span>
                    <p>Nếu bạn đã có tài khoản, hãy <Link to="/signin" style={{textDecoration:"none"}}>Đăng Nhập</Link></p>
                    <button type="submit">
                        Đăng Kí
                    </button>
                </div>
            </form>
        </main>
    );
}
export default RegisterService;