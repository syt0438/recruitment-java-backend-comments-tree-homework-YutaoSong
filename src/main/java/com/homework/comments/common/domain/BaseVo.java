package com.homework.comments.common.domain;

import com.homework.comments.common.enums.StatusCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import static com.homework.comments.common.enums.StatusCode.OK;
import static com.homework.comments.common.enums.StatusCode.SYSTEM_ERROR;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 15:54
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BaseVo<T> implements Serializable {

    private Integer code;

    private String msg;

    private T data;

    public static <T> BaseVo<T> succeed() {
        return new BaseVo<>(OK.getCode(), OK.getMsg(), null);
    }

    public static <T> BaseVo<T> succeed(T data) {
        return new BaseVo<>(OK.getCode(), OK.getMsg(), data);
    }

    public static <T> BaseVo<T> failed() {
        return new BaseVo<>(SYSTEM_ERROR.getCode(), SYSTEM_ERROR.getMsg(), null);
    }

    public static <T> BaseVo<T> failed(StatusCode code) {
        return new BaseVo<>(code.getCode(), code.getMsg(), null);
    }

    public static <T> BaseVo<T> failed(int code, String msg) {
        return new BaseVo<>(code, msg, null);
    }

    public static <T> BaseVo<T> failed(T data) {
        return new BaseVo<>(SYSTEM_ERROR.getCode(), SYSTEM_ERROR.getMsg(), data);
    }
}
