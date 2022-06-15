package com.homework.comments.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.comments.domain.entity.Message;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 16:35
 */
public interface MessageService extends IService<Message> {

    void validateMessageExists(String messageId);

    String getMessageUid(String messageId);

}
