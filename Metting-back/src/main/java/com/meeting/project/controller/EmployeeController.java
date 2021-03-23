package com.meeting.project.controller;

import com.meeting.project.model.Employee;
import com.meeting.project.model.MeetEmployee;
import com.meeting.project.model.Meeting;
import com.meeting.project.repository.EmployeeRepository;
import com.meeting.project.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @GetMapping("/getemployees/{subject}")
    public ResponseEntity<List<Employee>> getEmployees(@PathVariable("subject") final String subj) {
        try {
            List<Employee> employees = employeeRepository.findAll();
            if (employees.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            Meeting meeting = meetingRepository.findBySubject(subj);
            if (meeting == null)
                return new ResponseEntity<>(employees, HttpStatus.OK);

            List<MeetEmployee> meetEmployeeList = meeting.getConsists();
            for (MeetEmployee meetEmployee:meetEmployeeList) {
                employees.forEach(employee -> {
                    if (employee.getN_id() == meetEmployee.getName_id().getN_id())
                        employee.setPresent(true);
                });
            }

            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
