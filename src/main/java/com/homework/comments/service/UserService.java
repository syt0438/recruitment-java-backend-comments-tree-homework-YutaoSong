package com.homework.comments.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.comments.domain.entity.User;
import com.homework.comments.domain.vo.LoginInVo;
import com.homework.comments.domain.vo.RegisterInVo;
import com.homework.comments.domain.vo.TokenVo;

import java.util.Optional;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 16:35
 */
public interface UserService extends IService<User> {

    /**
     * 验证用户名在库中是否已经存在，存在则抛出验证异常
     */
    void validateUidNotExists(String uid);

    /**
     * 验证邮件在库中是否已经存在，存在则抛出验证异常
     */
    void validateEmailNotExists(String email);

    /**
     * 注册
     */
    void registry(RegisterInVo inVo);

    /**
     * 登录并返回用户信息
     */
    TokenVo loginByUid(LoginInVo inVo);

    /**
     * 登录并返回用户信息
     */
    TokenVo loginByEmail(LoginInVo inVo);

    /**
     * 通过uid查找用户
     */
    Optional<User> findByUid(String uid);

    /**
     * 通过email查找用户
     */
    Optional<User> findByEmail(String email);
}
