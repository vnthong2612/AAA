package com.pamquestions.pam.service.problem;

import com.pamquestions.pam.dto.RankingRes;
import com.pamquestions.pam.dto.SubmitRequest;
import com.pamquestions.pam.model.Problem;
import org.springframework.data.domain.PageImpl;

import java.util.List;

public interface ProblemService {

    boolean checkResult(Integer id, SubmitRequest submitRequest);
    PageImpl<RankingRes> showRanking(Integer page);
    List<Problem> problems();
}
