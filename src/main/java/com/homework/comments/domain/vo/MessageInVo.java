package com.homework.comments.domain.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 12:59
 */
@Data
public class MessageInVo implements Serializable {

    /**
     * 留言内容[长度在3~200字之间，可以为中文]
     */
    private String msg;

}
