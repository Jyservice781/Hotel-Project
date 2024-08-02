import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Table,Container} from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import axios from "axios";

let Write = () => {
    let [inputs, setInputs] = useState({
        title: '',
        score: 0,
        content: ''
    })

    let navigate = useNavigate()

    let ARRAY = [1, 2, 3, 4, 5];

    let [score, setScore] = useState([false,false,false,false,false])


    let starScore = (index) => {
        let newScore = ARRAY.map((_, i) => i < index);
        setScore(newScore);
        setInputs({
            ...inputs,
            score: index
        });
    };
    {
        ARRAY.map((el, index) => (
            <FaStar key={index} size="14"></FaStar>
        ))
    }

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    let onSumit = async (e) => {
        e.preventDefault()
        let resp = await axios.post('http://localhost:8080/reply/write', inputs)
    }


    return (
        <Container classname={"mt-3"}>
            <form onSubmit={onSumit}>
            <Table striped>
                <thead>
                <tr>
                    <td>[리뷰 작성하기]</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>호텔은 만족하셨나요?</td>
                    <td>
                        {ARRAY.map((el, index) => (
                            <FaStar key={index} size="24"
                                    onClick={() => starScore(el)}
                                    color={score[index] ? "#ffc107" : "#e4e5e9"}
                                    style={{cursor: 'pointer'}}/>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>만족도 {inputs.score}점을 주셨네요.</td>
                </tr>
                <tr>
                    <td>리뷰를 작성해주세요.</td>
                </tr>
                <tr>
                    <td>제목</td>
                    <td>
                        <input type={'text'} value={inputs.title} name={'title'} onChange={onChange}>
                        </input>
                    </td>
                </tr>
                {/*<td>내용</td>*/}
                <tr>
                    <td>
                <textarea name={'content'} value={inputs.content} className={'form-control'} onChange={onChange}>
                </textarea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button type={'submit'}>등록하기</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
            </form>
        </Container>
    )
}
export default Write
