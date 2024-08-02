import {Container} from "react-bootstrap";
import {useState} from "react";
import {FaStar} from "react-icons/fa";

let Update = () => {
    let [inputs, setInputs] = useState({
        score: 0,
        title: '',
        content: ''
    })

    // 수정 후 페이지 이동 : useNavigate

    // 아이콘 별점
    let ARRAY = [1,2,3,4,5];
    let [score, setScore] = useState([false,false,false,false,false])
    let starScore = (index) => {
        let newScore = ARRAY.map((_, i) => i < index);
        setScore(newScore);
        setInputs({
            ...inputs,
            score: index
        })
    }
    {ARRAY.map((el, index) => (
        <FaStar key={index} size="14"></FaStar>
    ))}

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
          ...inputs,
          [name] : value
        })
    }

    return(
        <Container className={"mt-3"}>
            <thead>
            <tr>
                <td>[리뷰 수정하기]</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>호텔은 만족하셨나요?</td>
                <td>
                    {ARRAY.map((el, index) =>(
                        <FaStar key={index} size="24"
                                onClick={()=> starScore(el)}
                        color={score[index] ? "#ffc107" : "#e4e5e9"}
                        style={{cursor: 'pointer'}}/>
                    ))}
                </td>
            </tr>
            <tr>
                <td>리뷰를 작성해주세요.</td>
            </tr>
            <tr>
                <td>제목</td>
                <input type={'text'} name={'title'} value={inputs.title} onChange={onChange}/>
            </tr>
            <tr>
                <td>내용</td>
                <textarea name={'content'} value={inputs.content} onChange={onChange}></textarea>
            </tr>
            </tbody>
        </Container>
    )
}

export default Update
