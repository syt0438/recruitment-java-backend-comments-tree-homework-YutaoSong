package com.homework.comments.domain.vo;

import com.homework.comments.utils.TreeUtils;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 15:17
 */
@Data
public class CommentOutVo implements TreeUtils.TreeConstraint<String, CommentOutVo>, Serializable {

    private String id;

    private String parentId;

    private String parentUid;

    private String messageId;

    private String uid;

    private String msg;

    private Long createTime;

    private List<CommentOutVo> children;

}
