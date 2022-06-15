package com.homework.comments.domain.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 15:57
 */
@Data
public class RegisterInVo implements Serializable {

    /**
     * 用户名
     */
    private String uid;

    /**
     * 密码
     */
    private String pwd;

    /**
     * 邮箱
     */
    private String email;

}
