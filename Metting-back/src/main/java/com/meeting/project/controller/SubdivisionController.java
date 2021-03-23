package com.meeting.project.controller;

import com.meeting.project.model.Subdivision;
import com.meeting.project.repository.SubdivisionRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SubdivisionController {
    @Autowired
    private SubdivisionRepository subdivisionRepository;

    @GetMapping("/getsubdivs")
    public ResponseEntity<List<Subdivision>> getAllSubdivisions() {
        try {
            List<Subdivision> subdivisions = subdivisionRepository.findAll();
            if (subdivisions.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(subdivisions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
