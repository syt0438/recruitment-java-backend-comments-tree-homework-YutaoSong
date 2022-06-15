package com.homework.comments.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.ObjectUtil;
import com.homework.comments.common.domain.BaseVo;
import com.homework.comments.domain.entity.User;
import com.homework.comments.domain.vo.LoginInVo;
import com.homework.comments.domain.vo.RegisterInVo;
import com.homework.comments.domain.vo.TokenVo;
import com.homework.comments.domain.vo.UserOutVo;
import com.homework.comments.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.homework.comments.common.domain.BaseVo.succeed;

/**
 * 登录/注册 Api
 *
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 15:46
 */
@RequestMapping("/api/auth")
@RestController
public class AuthController {

    public static final String UID_REGEX = "^[A-Za-z0-9]{5,20}$";
    public static final String PWD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&_#]{8,20}";

    @Autowired
    private UserService userService;

    /**
     * 注册
     */
    @PutMapping("/register")
    public BaseVo<Void> register(@RequestBody RegisterInVo inVo) {
        Validator.validateNotEmpty(inVo.getUid(), "uid must be present.");
        Validator.validateNotEmpty(inVo.getEmail(), "email must be present.");
        Validator.validateNotEmpty(inVo.getPwd(), "password must be present.");

        Validator.validateMatchRegex(UID_REGEX, inVo.getUid(), "uid[5~20] only use letters and numbers.");
        Validator.validateEmail(inVo.getEmail(), "email format is incorrect.");
        Validator.validateMatchRegex(PWD_REGEX, inVo.getPwd(), "password[8~20] must contain one uppercase letter, one lowercase letter, one number, and one special character");

        userService.validateUidNotExists(inVo.getUid());
        userService.validateEmailNotExists(inVo.getEmail());

        userService.registry(inVo);

        return succeed();
    }

    /**
     * 登录
     */
    @PostMapping("/login")
    public BaseVo<TokenVo> login(@RequestBody LoginInVo inVo) {
        if (ObjectUtil.isAllEmpty(inVo.getUid())) {
            throw new ValidateException("uid or email must be present.");
        }

        Validator.validateNotEmpty(inVo.getPwd(), "password must be present.");

        if (Validator.isEmail(inVo.getUid())) {
            return succeed(userService.loginByEmail(inVo));
        }

        return succeed(userService.loginByUid(inVo));
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/{uid}")
    public BaseVo<UserOutVo> getUserInfo(@PathVariable("uid") String uid) {
        if (ObjectUtil.isAllEmpty(uid)) {
            throw new ValidateException("uid or email must be present.");
        }

        User user = userService.findByUid(uid)
                .orElseThrow(() -> new ValidateException("user not found."));

        return succeed(BeanUtil.toBean(user, UserOutVo.class));
    }

}
