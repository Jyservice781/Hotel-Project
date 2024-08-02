package com.nc13.Trip.project.service;

import com.nc13.Trip.project.model.ReplyDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class ReplyService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.ReplyMapper";

    @Autowired
    public ReplyService(SqlSession session){
        SESSION = session;
    }

    public List<ReplyDTO> selectList(){
        HashMap<String, Object> paraMap = new HashMap<>();
        return SESSION.selectList(NAMESPACE + ".selectList", paraMap);
    }


}
