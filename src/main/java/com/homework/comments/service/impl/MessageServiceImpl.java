package com.homework.comments.service.impl;

import cn.hutool.core.exceptions.ValidateException;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.comments.dao.MessageMapper;
import com.homework.comments.domain.entity.Message;
import com.homework.comments.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements MessageService {


    @Override
    public void validateMessageExists(String messageId) {
        LambdaQueryWrapper<Message> queryWrapper = Wrappers.lambdaQuery(Message.class)
                .eq(Message::getId, messageId);

        int count = super.count(queryWrapper);

        if (count == 0) {
            throw new ValidateException("message not found.");
        }
    }

    @Override
    public String getMessageUid(String messageId) {
        LambdaQueryWrapper<Message> queryWrapper = Wrappers.lambdaQuery(Message.class)
                .select(Message::getUid)
                .eq(Message::getId, messageId);

        return Optional.ofNullable(getOne(queryWrapper))
                .map(Message::getUid)
                .orElse(null);
    }

}
