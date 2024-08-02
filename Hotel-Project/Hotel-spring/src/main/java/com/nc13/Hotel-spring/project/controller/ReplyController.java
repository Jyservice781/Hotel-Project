package com.nc13.Trip.project.controller;

import com.nc13.Trip.project.model.ReplyDTO;
import com.nc13.Trip.project.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@CrossOrigin
@RequestMapping("/reply/")
public class ReplyController {
    private final ReplyService REPLY_SERVICE;

    @Autowired
    public ReplyController(ReplyService replyService) {
        REPLY_SERVICE = replyService;
    }

    @GetMapping("selectList")
    public HashMap<String, Object> showList() {
        HashMap<String, Object> result = new HashMap<>();
        result.put( "replyList" ,REPLY_SERVICE.selectList());
        return result;
    }

}
