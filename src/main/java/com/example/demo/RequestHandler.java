package com.example.demo;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

@Controller
public class RequestHandler {
    Logger logger = LoggerFactory.getLogger(RequestHandler.class);
    // initialize the variable

    @PostMapping("/update")
    public ResponseEntity<String> updateJson(@RequestParam(name = "dataJson") String dataJson) throws ParseException {
        logger.info(dataJson);
        JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(dataJson);

        // Constructing the gitlab json object to be passed in POST request
        JSONObject courses = new JSONObject();
        courses.put("branch", "master");
        courses.put("commit_message", "updated marks");

        JSONArray actions = new JSONArray();
        JSONObject singleAction = new JSONObject();
        singleAction.put("action", "update");
        singleAction.put("file_path", "data.json");

        singleAction.put("content", json.toString());

        actions.add(singleAction);
        courses.put("actions", actions);

        logger.info(courses.toJSONString());

        // Making a post request to gitlab api to update the data.json file
        HttpHeaders headers = new HttpHeaders();
        headers.add("PRIVATE-TOKEN", "HPdRA1G-VXxr8fk8JddB");

        HttpEntity<String> entity = new HttpEntity(courses, headers);
        RestTemplate restTemplate = new RestTemplate();
        String response =
                restTemplate.postForObject(
                        "https://gitlab.com/api/v4/projects/23578539/repository/commits",
                        entity,
                        String.class
                );
        logger.info(response);

        return new ResponseEntity<>("Your marks are updated", HttpStatus.OK);
    }

}
