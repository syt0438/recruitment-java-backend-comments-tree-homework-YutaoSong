package com.homework.comments.common.domain;

import lombok.Data;

import java.io.Serializable;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 15:49
 */
@Data
public class BaseDomain implements Serializable {

    private String id;

    private Long createTime;

}
