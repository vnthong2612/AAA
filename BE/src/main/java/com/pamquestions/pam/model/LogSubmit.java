package com.pamquestions.pam.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "log_submit", schema = "pam")
@IdClass(LogSubmitId.class)
public class LogSubmit {
    @Id
    @Column(name = "USER_ID")
    private UUID userId;

    @Id
    @Column(name = "PROBLEM_ID")
    private Integer problemId;

    @Column(name = "USERNAME")
    private String username;
}
