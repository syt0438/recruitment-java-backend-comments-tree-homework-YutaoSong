package com.homework.comments.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.core.lang.Validator;
import com.homework.comments.common.domain.BaseVo;
import com.homework.comments.domain.entity.Message;
import com.homework.comments.domain.vo.MessageInVo;
import com.homework.comments.domain.vo.MessageOutVo;
import com.homework.comments.domain.vo.TokenVo;
import com.homework.comments.service.CommentService;
import com.homework.comments.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 留言Api
 *
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 12:28
 */
@Slf4j
@RequestMapping("/api/message")
@RestController
public class MessageController {

    @Autowired
    private MessageService service;

    @Autowired
    private CommentService commentService;

    /**
     * 发表留言
     */
    @PutMapping
    public BaseVo<Void> write(@RequestBody MessageInVo inVo, TokenVo tokenVo) {
        Validator.validateNotEmpty(inVo.getMsg(), "msg must be present.");

        int msgLen = inVo.getMsg().length();

        if (msgLen > 200 || msgLen < 3) {
            throw new ValidateException("msg length must be 3-200.");
        }

        Message entity = BeanUtil.toBean(inVo, Message.class);
        entity.setUid(tokenVo.getUid());
        entity.setCreateTime(System.currentTimeMillis());

        service.save(entity);

        return BaseVo.succeed();
    }

    /**
     * 查询留言列表
     */
    @GetMapping("/list")
    public BaseVo<List<MessageOutVo>> list() {
        List<MessageOutVo> list = service.list()
                .stream()
                .map(item -> BeanUtil.toBean(item, MessageOutVo.class))
                .sorted(Comparator.comparingLong(MessageOutVo::getCreateTime).reversed())
                .peek(item -> item.setChildren(commentService.findCommentTree(item.getId())))
                .collect(Collectors.toList());

        return BaseVo.succeed(list);
    }
}
