package com.meeting.project.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="subdivision")
public class Subdivision implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer s_id;
    private String sub_name;
    private Integer subname_id;

    public Subdivision() {
    }

    public Integer getS_id() {
        return s_id;
    }

    public void setS_id(Integer s_id) {
        this.s_id = s_id;
    }

    public String getSub_name() {
        return sub_name;
    }

    public void setSub_name(String sub_name) {
        this.sub_name = sub_name;
    }

    public Integer getSubname_id() {
        return subname_id;
    }

    public void setSubname_id(Integer subname_id) {
        this.subname_id = subname_id;
    }
}
