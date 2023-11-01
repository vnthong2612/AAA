import "./Problems.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Problems = () =>{
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8087/problems")
            .then(
                (response)=> setData(response.data)


    ).catch((error) => console.log(error))
    }, []);

    return (
        <main id="content">
            <div className="tabs">
                <h2>Danh sách bài</h2>

            </div>
            <div style={{display: "flex"}}>
                <div id="content-left" className="h-scrollable-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Bài Toán</th>
                                <th>Số người làm đúng</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>

                                <td><Link to= {`/problems/${index+1}`}>{item.name}</Link></td>
                                <td>{item.solvedBy}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </main>
    );
}
export  default Problems;