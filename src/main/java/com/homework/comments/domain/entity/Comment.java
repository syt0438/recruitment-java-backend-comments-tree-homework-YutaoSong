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
 * Time: 15:13
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class Comment extends BaseDomain implements Serializable {

    private String messageId;

    private String parentId;

    private String parentUid;

    private String uid;

    private String msg;

}
