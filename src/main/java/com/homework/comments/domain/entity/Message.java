package com.homework.comments.domain.entity;

import com.homework.comments.common.domain.BaseDomain;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 14:10
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class Message extends BaseDomain implements Serializable {

    private String uid;

    private String msg;

}
