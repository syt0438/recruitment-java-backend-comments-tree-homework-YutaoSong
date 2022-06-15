package com.homework.comments.common.exceptions;

import cn.hutool.core.util.StrUtil;

import static com.homework.comments.common.enums.StatusCode.TOKEN_VALIDATE_ERROR;

/**
 * token验证异常
 *
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 12:01
 */
public class TokenValidateException extends BizException {
    public TokenValidateException() {
        super(TOKEN_VALIDATE_ERROR.getCode(), TOKEN_VALIDATE_ERROR.getMsg());
    }

    public TokenValidateException(String message) {
        super(TOKEN_VALIDATE_ERROR.getCode(), StrUtil.nullToDefault(message, TOKEN_VALIDATE_ERROR.getMsg()));
    }
}
