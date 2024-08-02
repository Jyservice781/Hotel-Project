package com.nc13.Trip.project.model;

import java.util.Date;
import lombok.Data;

@Data
public class ReplyDTO {
    private int id;
    private String content;
    private String title;
    private Date entryDate;
    private Date modifyDate;
    private int score;



    // ----------  reference -------
    private double price;
    private int customerId;
    private int hotelId;
    private String hotelName;
}
