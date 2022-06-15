package com.homework.comments.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.jwt.JWTUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.comments.dao.UserMapper;
import com.homework.comments.domain.entity.User;
import com.homework.comments.domain.vo.LoginInVo;
import com.homework.comments.domain.vo.RegisterInVo;
import com.homework.comments.domain.vo.TokenVo;
import com.homework.comments.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Optional;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 16:35
 */
@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    /**
     * JWT签名使用的key
     */
    private static final byte[] SECRET = "9a96349e2345385785e804e0f4254dee".getBytes(StandardCharsets.UTF_8);

    /**
     * TOKEN expired 时间30分钟
     */
    private static final long EXPIRED_TIME_30MINUTES = 30 * 60 * 1000L;

    /**
     * TOKEN expired 时间30天
     */
    private static final long EXPIRED_TIME_30DAY = 30 * 24 * 60 * 60 * 1000L;

    @Override
    public void validateUidNotExists(String uid) {
        LambdaQueryWrapper<User> queryWrapper = Wrappers.lambdaQuery(User.class)
                .eq(User::getUid, uid);

        int count = super.count(queryWrapper);

        if (count >= 1) {
            throw new ValidateException("uid already exists.");
        }
    }

    @Override
    public void validateEmailNotExists(String email) {
        LambdaQueryWrapper<User> queryWrapper = Wrappers.lambdaQuery(User.class)
                .eq(User::getEmail, email);

        int count = super.count(queryWrapper);

        if (count >= 1) {
            throw new ValidateException("email already exists.");
        }
    }

    @Override
    public void registry(RegisterInVo inVo) {
        long current = System.currentTimeMillis();

        User entity = BeanUtil.toBean(inVo, User.class);
        entity.setCreateTime(current);
        entity.setSalt(RandomUtil.randomString(32));
        entity.setPwd(SecureUtil.md5(entity.getPwd() + entity.getSalt()));

        save(entity);
    }

    @Override
    public TokenVo loginByUid(LoginInVo inVo) {
        User user = findByUid(inVo.getUid())
                .orElseThrow(() -> new ValidateException("uid not found!!"));

        return login(inVo, user);
    }

    @Override
    public TokenVo loginByEmail(LoginInVo inVo) {
        User user = findByEmail(inVo.getUid())
                .orElseThrow(() -> new ValidateException("email not found!!"));

        return login(inVo, user);
    }

    @Override
    public Optional<User> findByUid(String uid) {
        LambdaQueryWrapper<User> queryWrapper = Wrappers.lambdaQuery(User.class)
                .eq(User::getUid, uid)
                .last("limit 1");

        return Optional.ofNullable(getOne(queryWrapper));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        LambdaQueryWrapper<User> queryWrapper = Wrappers.lambdaQuery(User.class)
                .eq(User::getEmail, email)
                .last("limit 1");

        return Optional.ofNullable(getOne(queryWrapper));
    }

    private String buildToken(User user, long expiredTime) {
        HashMap<String, Object> payload = new HashMap<>();
        payload.put("uid", user.getUid());
        payload.put("email", user.getEmail());
        payload.put("expiredTime", expiredTime);

        return JWTUtil.createToken(payload, SECRET);
    }

    private TokenVo login(LoginInVo inVo, User user) {
        long current = System.currentTimeMillis();
        String pwd = SecureUtil.md5(inVo.getPwd() + user.getSalt());

        Validator.validateNotEmptyAndEqual(pwd, user.getPwd(), "username passwords do not match!!");

        long expiredTime = ObjectUtil.equals(true, inVo.getRemembered()) ? current + EXPIRED_TIME_30DAY : current + EXPIRED_TIME_30MINUTES;

        user.setExpiredTime(expiredTime);
        user.setToken(buildToken(user, expiredTime));

        return BeanUtil.toBean(user, TokenVo.class);
    }

}
