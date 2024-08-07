package com.nc13.hotel.service;

import com.nc13.hotel.model.ReplyDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReplyService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.ReplyMapper";

    @Autowired
    public ReplyService(SqlSession SESSION) {
        this.SESSION = SESSION;
    }

    public void insert(ReplyDTO replyDTO) {
        SESSION.insert(NAMESPACE + ".insert", replyDTO);
    }

    public List<ReplyDTO> selectList(int hotelId, int page, int size) {
        HashMap<Object, Object> params = new HashMap<>();
        params.put("hotelId", hotelId);
        params.put("startRow", (page - 1) * size);
        params.put("size", size);
        return SESSION.selectList(NAMESPACE + ".selectList", params);
    }

    public int getTotalCount(int hotelId) {
        return SESSION.selectOne(NAMESPACE + ".getTotalCount", hotelId);
    }

    public ReplyDTO selectOne(int id) {
        return SESSION.selectOne(NAMESPACE + ".selectOne", id);
    }

    public boolean update(ReplyDTO replyDTO) {
        int updateRows = SESSION.update(NAMESPACE + ".update", replyDTO);
        return updateRows > 0;
    }

    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }
}
