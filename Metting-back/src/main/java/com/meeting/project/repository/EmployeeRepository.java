package com.meeting.project.repository;

import com.meeting.project.model.Employee;
import com.meeting.project.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("select e from Employee e where e.n_id = :n_id")
    Employee findByN_id(Integer n_id);
    Employee findByName(String name);
}

