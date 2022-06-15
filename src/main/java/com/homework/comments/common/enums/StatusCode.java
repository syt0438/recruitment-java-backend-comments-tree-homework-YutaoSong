package com.homework.comments.common.enums;

import lombok.Getter;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 17:38
 */
@Getter
public enum StatusCode {

    OK(0, "ok!!"),
    SYSTEM_ERROR(100000, "System error, please try again later!!"),
    DYNAMIC_PARAM_VALIDATE_ERROR(100001, "Parameter error, please request after verification!!"),
    TOKEN_VALIDATE_ERROR(200000, "Token validate error."),
    ;

    private final int code;
    private final String msg;

    StatusCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
