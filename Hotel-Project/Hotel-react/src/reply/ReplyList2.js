import {Button, Container, Pagination, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import UserProfile from "../components/userProfile/UserProfile";

let ReplyList = () => {
    let [data, setData] = useState({replyList: []})
    let [page, setPage] = useState(1)
    let [totalPages, setTotalPages] = useState(1)
    let navigate = useNavigate();

    let params = useParams()

    // userId와 hotelId 정보가 없기 때문에 '1' 넣음
    let userInfo = {id: 1}
    let hotelId = parseInt(params.hotelId) || 1

    // 별점 합계 및 평균
    let sum = data.replyList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.score
    }, 0)
    let average = sum / data.replyList.length

    // 임시 프로필 이미지 URL 생성
    let profileImage = () => {
        let images = ['profile1.jpg', 'profile2.jpg', 'profile3.jpg', 'profile4.jpg']
        let randomIndex = Math.floor(Math.random() * images.length)
        return `/${images[randomIndex]}`
    }

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get(`http://localhost:8080/reply/selectList/${hotelId}`, {
                    params: {page: page, size: 10}
                });

            if (resp.status === 200) {
                let replyListWithImages = resp.data.replyList.map(reply => ({
                    ...reply,
                    profileImage: profileImage()
                }))
                setData({
                    replyList: replyListWithImages
                })
                setTotalPages(Math.ceil(resp.data.totalCount / 10))
            }
        }
        selectList();
    }, [hotelId, page])

    // 작성 & 수정 & 삭제
    let moveToWrite = () => {
        navigate(`/reply/write/` + hotelId)
    }
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
    let deleteItem = (id) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
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
                {parseInt(reply.customerId) === parseInt(userInfo.id) ?
                    <tr>
                        <td>
                            <Button onClick={() => onUpdate(reply.id)}>수정</Button>
                        </td>
                        <td>
                            <Button onClick={() => deleteItem(reply.id)}>삭제</Button>
                        </td>
                    </tr>
                    : null}
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
                    <td>[평균 별점 : {average.toFixed(1)}]</td>
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
            <Pagination>
                {[...Array(totalPages).keys()].map(num => (
                    <Pagination.Item key={num + 1} active={num + 1 === page} onClick={() => setPage(num + 1)}>
                        {num + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    )
}

export default ReplyList;
