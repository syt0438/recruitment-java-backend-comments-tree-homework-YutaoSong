package com.homework.comments.core.interceptors;

import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;
import com.homework.comments.common.exceptions.TokenValidateException;
import com.homework.comments.core.configs.AuthConfiguration;
import com.homework.comments.domain.vo.TokenVo;
import com.homework.comments.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 11:24
 */
@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private AuthConfiguration config;

    @Autowired
    private AntPathMatcher matcher;

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();

        boolean matchedWhiteUri = config.getWhileTokenUris()
                .stream()
                .anyMatch(whiteUri -> matcher.match(whiteUri, requestURI));

        if (matchedWhiteUri) {
            return true;
        }

        TokenVo token = parseToken(request.getHeader("token"));

        if (System.currentTimeMillis() > token.getExpiredTime()) {
            throw new TokenValidateException("Token already expired.");
        }

        RequestContextHolder.currentRequestAttributes().setAttribute("tokenData", token, SCOPE_REQUEST);

        return true;
    }

    public static TokenVo parseToken(String token) {
        try {
            JWT jwt = JWTUtil.parseToken(token);

            TokenVo outVo = new TokenVo();
            outVo.setUid(jwt.getPayloads().getStr("uid"));
            outVo.setEmail(jwt.getPayloads().getStr("email"));
            outVo.setToken(token);
            outVo.setExpiredTime(jwt.getPayloads().getLong("expiredTime"));

            return outVo;
        } catch (Exception ex) {
            log.info("token parse failed: {}, exMsg: {}", token, ex.getMessage());

            throw new TokenValidateException();
        }
    }

}
