import {Button, Container, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

let ReplyList = () => {
    let [data, setData] = useState({replyList: []})
    let navigate = useNavigate();


    useEffect ( () => {
        let selectList = async() => {
            // 이부분에 메인에서 넘어오는 호텔 Id 를 받아오도록 연결 시에 수정해야함
            let resp = await axios
                .get('http://localhost:8080/reply/selectList');

            console.log(resp.data)

            if(resp.status === 200){
                setData(resp.data)
            }
        }
        selectList();
    }, [])

// ----------------- Table -------------------------

    let TableRow = ({reply}) => {
        return (
            <tr>
                <td>{reply.id}</td>
                <td>{reply.title}</td>
                <td>{reply.content}</td>
                <td>{reply.entryDate}</td>
            </tr>
        )
    }

    let moveToWrite = () => {
        navigate('/reply/write')
    }

    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <td>
                        <Button type={'button'} onClick={moveToWrite}>댓글쓰기</Button>
                    </td>
                </tr>
                <tr>
                    <th>글쓴이</th>
                    <th>title</th>
                    <th>content</th>
                    <th>리뷰 게시 날짜</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.replyList.map(r => (
                    <TableRow reply={r} key={r.id}/>
                ))}
                </tbody>
            </Table>
        </Container>

    )
}

export default ReplyList;