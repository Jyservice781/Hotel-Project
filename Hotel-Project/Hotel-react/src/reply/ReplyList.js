import {Button, Container, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";

let ReplyList = () => {
    let [data, setData] = useState({replyList: []})
    let navigate = useNavigate();

    // 추가
    let params = useParams()
    let id = parseInt(params.id)
    let location = useLocation()
    // user 정보가 없기 때문에 강제값으로 '1' 넣음
    let userInfo = location.state && location.state.userInfo ? location.state.userInfo : {id:1};


    useEffect(() => {
        let selectList = async () => {
            // 이부분에 메인에서 넘어오는 호텔 Id 를 받아오도록 연결 시에 수정해야함
            // => [추가] Params로 id 값 받아옴
            let resp = await axios
                .get('http://localhost:8080/reply/selectList');

            console.log(resp.data)

            if (resp.status === 200) {
                setData(resp.data)
            }
        }
        selectList();
    }, [])

    let moveToWrite = () => {
        navigate('/reply/write')
    }
    // 추가 (수정 & 삭제)
    let onUpdate = (id) => {
        navigate('/reply/update/' + id, {state: {userInfo: userInfo}})
    }
    let onDelete = async (id) => {
        let resp = await axios.get('http://localhost:8080/reply/delete/' + id, {
            withCredentials: true
        })
        if (resp.status === 200) {
            navigate('/reply/showList', {state: {userInfo: userInfo}})
        }
    }

// ----------------- Table -------------------------

    let TableRow = ({reply}) => {
        return (
            <tr>
                <td>{reply.id}</td>
                <td>{reply.title}</td>
                <td>{reply.content}</td>
                <td>{reply.entryDate}</td>
                {reply.customerId === userInfo.id?
                    <tr>
                        <td>
                            <Button onClick={() => onUpdate(reply.id)}>수정</Button>
                        </td>
                        <td>
                            <Button onClick={() =>onDelete(reply.id)}>삭제</Button>
                        </td>
                    </tr>
                    :null}
            </tr>
        )
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
