import {useEffect, useState} from "react";
import "./Ranking.css";
import axios from "../api/customAxiosConfig.js";
const Ranking = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.
            get("/rank")
            .then((response) => setData(response.data.content))
            .catch((error) => console.log(error))

    }, [])

    return (
        <>

            <div className="top">
                <h2>Bảng xếp hạng</h2>
                <hr />

                <table className="ranking-table">

                    <thead>
                        <tr>
                            <th>Hạng</th>
                            <th>Tên truy cập</th>
                            <th>Điểm</th>
                            <th>Số bài đã làm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ color: "black" }}>{index + 1}</td>
                                <td className={(index < 5) ? "ten" : (index < 15) ? "fifteen" : "last"}>
                                   <div style={{display: "inline-block"}}>
                                       {item.username}
                                   </div>

                                </td>
                                <td style={{ color: "black" }}>{item.score}</td>
                                <td style={{color:"black"}}>{item.total} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );
}
export default Ranking;