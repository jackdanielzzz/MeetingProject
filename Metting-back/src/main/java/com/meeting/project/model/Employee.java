package com.meeting.project.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
@Table(name = "employee")
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="n_id")
    private Integer n_id;
    private String name;
    private Integer age;
    private boolean isPresent = false;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subdiv_id", referencedColumnName = "subname_id")
    private Subdivision subdivision;

    public Subdivision getSubdivision() {
        return subdivision;
    }

    public void setSubdivision(Subdivision subdivision) {
        this.subdivision = subdivision;
    }

    public Employee() {
    }

    public boolean isPresent() {
        return isPresent;
    }

    public void setPresent(boolean present) {
        isPresent = present;
    }

    public Integer getN_id() {
        return n_id;
    }

    public void setN_id(Integer n_id) {
        this.n_id = n_id;
    }

    public String getName() {
        return name;
    }

    public String getShortResponsible() {
        final String regex = "(\\p{L}+|\\G)(\\h+\\p{L})\\p{L}*";
        final String subst = "$1$2.";
        final Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
        final Matcher matcher = pattern.matcher(name);

        return matcher.replaceAll(subst);
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

}
