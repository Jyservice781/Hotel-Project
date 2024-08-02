package com.nc13.Trip.project.model;

import lombok.Data;
import java.util.Date;

@Data
public class HotelDTO {
    private int id;
    private String name;
    private String address;
    private Date startEntry;
    private Date endEntry;
    private int roomNumber;
    private boolean isEmpty;
    private double price;

}
