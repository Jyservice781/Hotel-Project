import {Alert, Button, Container, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import UserProfile  from "../components/userProfile/UserProfile";

let ReplyList = () => {
    let [data, setData] = useState({replyList: []})
    let navigate = useNavigate();

    // 추가
    let params = useParams()
    let id = parseInt(params.id)
    let location = useLocation()
    // userId와 hotelId 정보가 없기 때문에 '1' 넣음
    let userInfo = location.state && location.state.userInfo ? location.state.userInfo : {id:1};
    let hotelId = parseInt(params.hotelId) || 1

    //프로필 이미지 : public 폴더에 이미지 4개 임시 추가 
    let getRandomProfileImage = () => {
        let images = ['profile1.jpg','profile2.jpg','profile3.jpg','profile4.jpg']
        let ramdomIndex = Math.floor(Math.random() * images.length)
        return `/${images[ramdomIndex]}`
    }

    useEffect(() => {
        let selectList = async () => {
            // 이부분에 메인에서 넘어오는 호텔 Id 를 받아오도록 연결 시에 수정해야함
            let resp = await axios
                .get(`http://localhost:8080/reply/selectList/${hotelId}`);

            if (resp.status === 200) {
                let replyListWithImages = resp.data.replyList.map(reply => ({
                    ...reply,
                    profileImage: getRandomProfileImage()
                }))
                setData({
                    replyList: replyListWithImages
                })
            }
        }
        selectList();
    }, [hotelId])

    let moveToWrite = () => {
        navigate(`/reply/write/` + hotelId)
    }
    // 추가 (수정 & 삭제)
    let onUpdate = (id) => {
        navigate('/reply/update/' + id, {state: {userInfo: userInfo}})
    }
    let onDelete = (id) => {
        axios.get('http://localhost:8080/reply/delete/' + id, {
            withCredentials: true
        })
            .then(resp => {
                if (resp.status === 200) {
                    alert('삭제되었습니다.');
                    setData(prevData => ({
                        ...prevData,
                        replyList: prevData.replyList.filter(item => item.id !== id)
                    }));
                }
            })
            .catch(error => {
                console.error("삭제 중 오류 발생:", error);
                alert('삭제 중 오류가 발생했습니다.');
            });
    };
    let deleteItem =(id) => {
       if (window.confirm('정말로 삭제하시겠습니까?')){
           onDelete(id)
       }
    }

// ----------------- Table -------------------------

    let TableRow = ({reply}) => {
        return (
            <tr>
                <td>
                    <UserProfile data={reply}/>
                </td>
                {reply.customerId === userInfo.id?
                    <tr>
                        <td>
                            <Button onClick={() => onUpdate(reply.id)}>수정</Button>
                        </td>
                        <td>
                            <Button onClick={() =>deleteItem(reply.id)}>삭제</Button>
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
                    <th></th>
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
