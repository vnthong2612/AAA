import "./Navbar.css";
import {Link, Outlet, useNavigate} from "react-router-dom";
import "../Login/Login.jsx"
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async (e)=>{
        e.preventDefault();
        localStorage.setItem('JWTToken', '');
        navigate('/home');
    }
    let getToken= localStorage.getItem('JWTToken');
    let json;

    if(getToken !==''){
        json = jwtDecode(getToken)
    }

    return (
        <>
            <nav className="menu">
                <ul className="navbar">
                    <li><Link to ="/home"><img width="48" height="48" src="https://img.icons8.com/color/48/programming--v1.png" alt="programming--v1"/></Link></li>
                    <li><Link to={"/problems"}>BÀI TOÁN</Link></li>
                    <li><Link to ="/submitions">BÀI NỘP</Link></li>
                    <li><Link to="/rank">BẢNG XẾP HẠNG</Link></li>
                    <li><Link to="/test">CÁC KÌ THI</Link></li>
                    <li><Link to ="/contact">LIÊN HỆ</Link></li>
                    {localStorage.getItem('JWTToken')!=='' &&
                       <>
                            <li className="dropdown">
                                <Link to="/" className="dropbtn">{json.username}</Link>
                                <div className="dropdown-content">
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/" onClick={handleLogout}>Đăng Xuất</Link>

                                </div>
                            </li>
                       </>
                    }
                    {localStorage.getItem('JWTToken')==='' &&
                        <>
                            <li><Link to="/signin">ĐĂNG NHẬP</Link></li>
                            <li><Link to ="/signup">ĐĂNG KÍ</Link></li>
                        </>
                    }
                </ul>
            </nav>

            <div>
                <Outlet />
            </div>
        </>

    );
}
export default Navbar;
