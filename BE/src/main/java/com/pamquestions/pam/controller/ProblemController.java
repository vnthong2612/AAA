package com.pamquestions.pam.controller;

import com.pamquestions.pam.dto.RankingRes;
import com.pamquestions.pam.dto.SubmitRequest;
import com.pamquestions.pam.service.problem.ProblemService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;
    private static final Logger LOGGER = LoggerFactory.getLogger(ProblemController.class);
    @GetMapping(value = "/problems")
    public ResponseEntity<?> problems() {
        return new ResponseEntity<>(problemService.problems(), HttpStatus.OK);
    }





    @PostMapping(value = "/submit/{id}")
    public ResponseEntity<?> submit(@PathVariable(name = "id") Integer id,
                                    @RequestBody  SubmitRequest submitRequest){

        LOGGER.info("Submit Success");
        if(problemService.checkResult(id, submitRequest)){

            return new ResponseEntity<String>("Correct", HttpStatus.OK);

        }
        return  new ResponseEntity<String>("Wrong Answer", HttpStatus.OK);
    }
    @GetMapping(value = "/rank")
    public ResponseEntity<PageImpl<RankingRes>> ranking(@RequestParam(value = "page", defaultValue = "1")
                                                            Integer page){
        LOGGER.info("Ranking:    ");
        return new ResponseEntity<>(problemService.showRanking(page), HttpStatus.OK);
    }
}
