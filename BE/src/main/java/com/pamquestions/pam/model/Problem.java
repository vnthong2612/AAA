package com.pamquestions.pam.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "problem", schema = "pam")
public class Problem {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SOLVED_BY")
    private Integer solvedBy;


    @Column(name = "ANSWER")
    private String answer;

    @Column(name = "DIFFICULTY")
    private Integer difficulty;


}
