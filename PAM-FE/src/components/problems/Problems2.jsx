import {useState} from "react";
import axios from "../api/customAxiosConfig.js";

const Problems2 =   ()=>{
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [colorAnswer, setColorAnswer] = useState('');
    const [spinner, setSpinner] = useState(false);


    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {

            const data = JSON.stringify({
                "answer": answer
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('JWTToken')
                }
            }

            if(message!==''){
                setMessage('');
            }
            const res = await axios.post(`/submit/2`, data, config);


            setSpinner(true);
            if(colorAnswer !== ''){
                setColorAnswer('');
            }

            if(res.data === "Correct"){
                setMessage("Bạn đã trả lời đúng");
                setColorAnswer("#0a0");
            }else{
                setColorAnswer("red");
                setMessage("Đáp án của bạn chưa đúng");
            }
            {setTimeout(()=>{
                setSpinner(false);
            }, 1500)}


        }catch (error) {
            console.log(error);
        }

        setSpinner(true);
    }



    return(
        <>
            <div className="problems">
                <h3>10001st nguyên tố</h3>
                <div className="problem-content">
                    <p>6 số nguyên tố đầu tiên là: 2, 3, 5, 7, 11, 13. Chữ số nguyên tố thứ 6 là 13.<br/>
                        Vậy số nguyên tố thứ 10001 bằng bao nhiêu?</p>
                </div>

            </div>

            {localStorage.getItem('JWTToken') && <div className="answer">
                <form onSubmit={handleSubmit}>
                    <div className="entry">
                        <div style={{marginLeft: "125px"}}>

                            <label>Đáp án: </label><br/>
                            <input
                                type="text"
                                onChange={(e)=> setAnswer(e.target.value)}
                                value={answer}
                            />

                            <button type="submit" style={{marginLeft: "10px"}}>Nộp</button>
                        </div>
                    </div>

                    {spinner && <div className="spinner"></div>}

                    {!spinner && message!==''&& <p style={{color:colorAnswer, fontWeight:"bold"}}>{message}</p>}
                </form>
            </div>}


        </>
    );
}
export default Problems2;