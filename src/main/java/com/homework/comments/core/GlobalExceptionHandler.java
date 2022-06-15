package com.homework.comments.core;

import cn.hutool.core.exceptions.ValidateException;
import com.homework.comments.common.domain.BaseVo;
import com.homework.comments.common.exceptions.TokenValidateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

import static com.homework.comments.common.enums.StatusCode.DYNAMIC_PARAM_VALIDATE_ERROR;
import static com.homework.comments.common.enums.StatusCode.SYSTEM_ERROR;

/**
 * 全局异常处理器
 *
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 10:17
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = ValidateException.class)
    public BaseVo<Void> validateExceptionHandle(HttpServletResponse response, ValidateException ex) {
        response.setStatus(HttpStatus.BAD_REQUEST.value());

        return BaseVo.failed(DYNAMIC_PARAM_VALIDATE_ERROR.getCode(), ex.getMessage());
    }

    @ExceptionHandler(value = Exception.class)
    public BaseVo<Void> validateExceptionHandle(HttpServletResponse response, Exception ex) {
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

        if (log.isDebugEnabled()) {
            ex.printStackTrace();

            return BaseVo.failed(SYSTEM_ERROR);
        }

        log.error("An unknown error occurred: " + ex.getMessage());

        return BaseVo.failed(SYSTEM_ERROR);
    }

    @ExceptionHandler(value = TokenValidateException.class)
    public BaseVo<Void> validateTokenHandle(HttpServletResponse response, TokenValidateException ex) {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        return BaseVo.failed(ex.getCode(), ex.getMessage());
    }

}
