package com.meeting.project.controller;

import com.meeting.project.model.Employee;
import com.meeting.project.model.MeetEmployee;
import com.meeting.project.model.Meeting;
import com.meeting.project.repository.EmployeeRepository;
import com.meeting.project.repository.MeetingRepository;
import com.meeting.project.repository.SubdivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MeetingController {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private SubdivisionRepository subdivisionRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("")
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        try {
            List<Meeting> meetings = meetingRepository.findAll();
            if (meetings.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(meetings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/edit/{subject}")
    public ResponseEntity<Meeting> getMeetingByName(@PathVariable("subject") final String subj) {

        Meeting meeting = meetingRepository.findBySubject(subj);
        if (meeting == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Meeting>> searchMeeting(@Param("subject") String subject, @Param("subdiv") String subdiv, @Param("respons") String respons) {
        List<Meeting> meetings = meetingRepository.findBySearchString(subject, subdiv, respons);

        if (meetings.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @PostMapping(value = "/edit/patch")
    public ResponseEntity<String> editMeeting(@RequestBody List<Employee> employeeList, @Param("subj") String subj, @Param("date") String date, @Param("subdiv") String subdiv, @Param("resp") String resp, @Param("origsubj") String origsubj) {
        try {
            Meeting meeting = new Meeting();
            if (meetingRepository.findBySubject(origsubj) != null)
                meeting = meetingRepository.findBySubject(origsubj);

            meeting.setSubject(subj);
            meeting.setDateTime(convertStringToTimestamp(date));
            meeting.setResponsible(employeeRepository.findByN_id(Integer.parseInt(resp)));
            meeting.setMeetSubdivision(subdivisionRepository.findSubdivisionBySubname_id(Integer.parseInt(subdiv)));

            employeeList.removeIf(employee -> ! employee.isPresent());
            List<MeetEmployee> meetEmployeeList = new ArrayList<>();
            employeeList.forEach(employee -> {
                MeetEmployee meetEmployee = new MeetEmployee();
                meetEmployee.setMeet_id(meetingRepository.findIdByName(origsubj));
                meetEmployee.setName_id(employeeRepository.findByN_id(employee.getN_id()));
                meetEmployeeList.add(meetEmployee);
            });
            meeting.setConsists(meetEmployeeList);

            meetingRepository.save(meeting);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Timestamp convertStringToTimestamp(String dateString) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy hh:mm");
            timestamp = new Timestamp(dateFormat.parse(dateString).getTime());
        } catch (Exception e) {
            System.err.println(e);
        }
        return timestamp;
    }

}
