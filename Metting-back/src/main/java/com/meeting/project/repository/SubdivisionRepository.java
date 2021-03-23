package com.meeting.project.repository;

import com.meeting.project.model.Subdivision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubdivisionRepository extends JpaRepository<Subdivision, Long> {
    @Query("select s from Subdivision s where s.subname_id = :Subname_id")
    Subdivision findSubdivisionBySubname_id(Integer Subname_id);

}
