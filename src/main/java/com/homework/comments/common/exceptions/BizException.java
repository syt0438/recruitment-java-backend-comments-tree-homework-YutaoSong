package com.homework.comments.common.exceptions;

import static cn.hutool.core.text.CharSequenceUtil.EMPTY;

/**
 * 业务异常
 *
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 11:59
 */
public class BizException extends RuntimeException {

    private final int code;

    public BizException(int errorCode) {
        super(EMPTY);
        this.code = errorCode;
    }

    public BizException(int errorCode, String message) {
        super(message);
        this.code = errorCode;
    }

    public BizException(int errorCode, String message, Throwable clauses) {
        super(message, clauses);
        this.code = errorCode;
    }

    public int getCode() {
        return this.code;
    }

    public String getMessage() {
        return super.getMessage();
    }

}
