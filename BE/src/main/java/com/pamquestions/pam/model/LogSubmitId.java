package com.pamquestions.pam.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@Data
public class LogSubmitId implements Serializable {
    private UUID userId;
    private Integer problemId;

}
