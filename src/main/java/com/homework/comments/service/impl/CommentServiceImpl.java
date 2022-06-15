package com.homework.comments.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.exceptions.ValidateException;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.homework.comments.dao.CommentMapper;
import com.homework.comments.domain.entity.Comment;
import com.homework.comments.domain.vo.CommentOutVo;
import com.homework.comments.service.CommentService;
import com.homework.comments.utils.TreeUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/6
 * Time: 16:35
 */
@Slf4j
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    @Override
    public void validateCommentExists(String commentId) {
        LambdaQueryWrapper<Comment> queryWrapper = Wrappers.lambdaQuery(Comment.class)
                .eq(Comment::getId, commentId);

        int count = super.count(queryWrapper);

        if (count == 0) {
            throw new ValidateException("comment not found.");
        }
    }

    @Override
    public List<CommentOutVo> findCommentTree(String messageId) {
        LambdaQueryWrapper<Comment> queryWrapper = Wrappers.lambdaQuery(Comment.class)
                .eq(Comment::getMessageId, messageId);

        List<CommentOutVo> list = list(queryWrapper)
                .stream()
                .map(item -> BeanUtil.toBean(item, CommentOutVo.class))
                .collect(Collectors.toList());

        return TreeUtils.buildTree(
                list,
                item -> Objects.isNull(item.getParentId()),
                Comparator.comparingLong(CommentOutVo::getCreateTime).reversed()
        );
    }

    @Override
    public String getParentCommentUid(String parentId) {
        LambdaQueryWrapper<Comment> queryWrapper = Wrappers.lambdaQuery(Comment.class)
                .select(Comment::getUid)
                .eq(Comment::getId, parentId);

        return Optional.ofNullable(getOne(queryWrapper))
                .map(Comment::getUid)
                .orElse(null);
    }

}
