package com.meeting.project.repository;

import com.meeting.project.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    Meeting findBySubject(String subject);
    @Query("SELECT e FROM Meeting e WHERE e.subject LIKE %:subj% " +
            "and e.meetSubdivision.sub_name LIKE %:subdiv% " +
            "and e.responsible.name LIKE %:respons% ")
    List<Meeting> findBySearchString(String subj, String subdiv, String respons);
    @Query("select m.id from Meeting m where m.subject = :subject")
    Integer findIdByName(String subject);

}
