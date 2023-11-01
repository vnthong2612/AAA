package com.pamquestions.pam.repository;

import com.pamquestions.pam.model.LogSubmit;
import com.pamquestions.pam.model.LogSubmitId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface LogSubmitRepository extends JpaRepository<LogSubmit, LogSubmitId>{
    @Query("SELECT u FROM LogSubmit u WHERE  u.userId = ?1 AND u.problemId = ?2")
    LogSubmit getById(UUID user, Integer problem);

}
