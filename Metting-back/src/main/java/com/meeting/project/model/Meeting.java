package com.meeting.project.model;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name = "meeting")
public class Meeting implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    private Timestamp dateTime;
    private String subject;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "responsible_id", referencedColumnName = "n_id")
    private Employee responsible;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "meetSubdiv_id", referencedColumnName = "subname_id")
    private Subdivision meetSubdivision;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "meet_id")
    private List<MeetEmployee> consists;

    public Meeting() {
    }

    public Subdivision getMeetSubdivision() {
        return meetSubdivision;
    }

    public void setMeetSubdivision(Subdivision meetSubdivision) {
        this.meetSubdivision = meetSubdivision;
    }

    public void setConsists(List<MeetEmployee> consists) {
        this.consists = consists;
    }

    public List<MeetEmployee> getConsists() {
        return consists;
    }

    public Employee getResponsible() {
        return responsible;
    }

    public void setResponsible(Employee responsible) {
        this.responsible = responsible;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getDateTime() {
        return dateTime;
    }

    public String getDateOnly() {
        return dateTime.toLocalDateTime().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public void setDateTime(Timestamp dateTime) {
        this.dateTime = dateTime;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

}

