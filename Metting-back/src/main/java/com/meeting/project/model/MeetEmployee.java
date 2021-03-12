package com.meeting.project.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "meet_employee")
public class MeetEmployee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="m_id")
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name_id", referencedColumnName = "n_id")
    private Employee name_id;

    private Integer meet_id;

    public Integer getMeet_id() {
        return meet_id;
    }

    public void setMeet_id(Integer meet_id) {
        this.meet_id = meet_id;
    }

    public Employee getName_id() {
        return name_id;
    }

    public void setName_id(Employee name_id) {
        this.name_id = name_id;
    }

    public MeetEmployee() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
