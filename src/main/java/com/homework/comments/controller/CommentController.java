package com.homework.comments.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.core.lang.Validator;
import cn.hutool.core.util.StrUtil;
import com.homework.comments.common.domain.BaseVo;
import com.homework.comments.domain.entity.Comment;
import com.homework.comments.domain.vo.CommentInVo;
import com.homework.comments.domain.vo.TokenVo;
import com.homework.comments.service.CommentService;
import com.homework.comments.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 评论Api
 *
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 12:28
 */
@Slf4j
@RequestMapping("/api/comment")
@RestController
public class CommentController {

    @Autowired
    private CommentService service;

    @Autowired
    private MessageService messageService;

    /**
     * 发表评论
     */
    @PutMapping
    public BaseVo<Void> write(@RequestBody CommentInVo inVo, TokenVo tokenVo) {
        Validator.validateNotEmpty(inVo.getMessageId(), "messageId must be present.");
        Validator.validateNotEmpty(inVo.getMsg(), "msg must be present.");

        int msgLen = inVo.getMsg().length();

        if (msgLen > 200 || msgLen < 3) {
            throw new ValidateException("msg length must be 3-200.");
        }

        messageService.validateMessageExists(inVo.getMessageId());

        if (!StrUtil.equals(inVo.getMessageId(), inVo.getParentId())) {
            // 如果不是回复消息，验证父级评论是否存在
            service.validateCommentExists(inVo.getParentId());
            inVo.setParentUid(service.getParentCommentUid(inVo.getParentId()));
        } else {
            inVo.setParentId(null);
            inVo.setParentUid(messageService.getMessageUid(inVo.getMessageId()));
        }

        Comment entity = BeanUtil.toBean(inVo, Comment.class);
        entity.setUid(tokenVo.getUid());
        entity.setCreateTime(System.currentTimeMillis());

        service.save(entity);

        return BaseVo.succeed();
    }
}
