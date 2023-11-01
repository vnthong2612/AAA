package com.pamquestions.pam.service.problem;

import com.pamquestions.pam.dto.RankingRes;
import com.pamquestions.pam.dto.SubmitRequest;
import com.pamquestions.pam.model.LogSubmit;
import com.pamquestions.pam.model.Problem;
import com.pamquestions.pam.model.User;
import com.pamquestions.pam.repository.LogSubmitRepository;
import com.pamquestions.pam.repository.ProblemRepository;
import com.pamquestions.pam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@RequiredArgsConstructor
@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;
    private final UserRepository userRepository;
    private final LogSubmitRepository logSubmitRepository;


    @Override
    public boolean checkResult(Integer id, SubmitRequest submitRequest) {
        Problem problem = problemRepository.getReferenceById(id);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (submitRequest.getAnswer().trim().equals(problem.getAnswer())) {
            String username = authentication.getName();
            User user = userRepository.getByUsername(username);

            if (logSubmitRepository.getById(user.getId(), id) == null) {

                problem.setSolvedBy(problem.getSolvedBy() + 1);


                user.setTotal(user.getTotal() + 1);
                user.setScore(user.getScore() + problem.getDifficulty());
                LogSubmit logSubmit = new LogSubmit();
                logSubmit.setProblemId(id);
                logSubmit.setUserId(user.getId());
                logSubmit.setUsername(username);

                logSubmitRepository.save(logSubmit);
            }
            userRepository.save(user);
            return true;
        }
        return false;

    }

    @Override
    public List<Problem> problems() {
        return problemRepository.findAll();
    }

    @Override
    public PageImpl<RankingRes> showRanking(Integer page) {
        List<User> userList = userRepository.findAll();
        List<RankingRes> rankingResList = new ArrayList<>();
        for (User x : userList) {
            RankingRes rankingRes = new RankingRes();
            rankingRes.setUsername(x.getUsername());
            rankingRes.setScore(x.getScore());
            rankingRes.setTotal(x.getTotal());
            rankingResList.add(rankingRes);
        }
        Collections.sort(rankingResList, (o1, o2) -> (o1.getScore() < o2.getScore())?1:-1);


        Pageable paging = PageRequest.of(page!=0?page-1:page, 10);
        int total = rankingResList.size(),
            begIndex = Math.toIntExact(paging.getOffset()),
            endIndex = Math.min(begIndex + paging.getPageSize(), total);


        List<RankingRes> subRankingRes = new ArrayList<>();
        if(begIndex<= endIndex){
            subRankingRes = rankingResList.subList(begIndex, endIndex);
        }
        return  new PageImpl<>(subRankingRes, paging, total);

    }
}
