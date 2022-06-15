package com.homework.comments.domain.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 15:53
 */
@Data
public class LoginInVo implements Serializable {

    /**
     * 用户名
     */
    private String uid;

    /**
     * 密码
     */
    private String pwd;

    /**
     * 记住我
     */
    private Boolean remembered;


}
