package com.meeting.project.controller;

import com.meeting.project.model.Meeting;
import com.meeting.project.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MeetingController {
    @Autowired
    private MeetingRepository meetingRepository;

    @GetMapping("")
    public List<Meeting> getAllMeetings(){
        return meetingRepository.findAll();
    }
}
