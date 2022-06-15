package com.homework.comments.domain.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.homework.comments.common.domain.BaseDomain;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 16:31
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class User extends BaseDomain implements Serializable {

    private String uid;

    private String pwd;

    private String email;

    private String salt;

    @TableField(exist = false)
    private String token;

    @TableField(exist = false)
    private Long expiredTime;

}
