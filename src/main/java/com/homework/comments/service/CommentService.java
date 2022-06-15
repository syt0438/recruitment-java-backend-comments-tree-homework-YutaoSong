package com.homework.comments.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.homework.comments.domain.entity.Comment;
import com.homework.comments.domain.vo.CommentOutVo;

import java.util.List;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 16:35
 */
public interface CommentService extends IService<Comment> {


    void validateCommentExists(String messageId);

    /**
     * 查询并构造留言下的评论树
     */
    List<CommentOutVo> findCommentTree(String messageId);

    /**
     * 获取上级评论的uid
     */
    String getParentCommentUid(String parentId);
}
