package com.homework.comments.domain.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 10:08
 */
@Data
public class TokenVo implements Serializable {

    /**
     * 用户名
     */
    private String uid;

    /**
     * 邮箱
     */
    private String email;

    /**
     * Token
     */
    private String token;

    /**
     * Token过期时间
     */
    private Long expiredTime;

}
