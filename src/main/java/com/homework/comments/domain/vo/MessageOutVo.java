package com.homework.comments.domain.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 14:32
 */
@Data
public class MessageOutVo implements Serializable {

    private String id;

    /**
     * 留言用户名
     */
    private String uid;

    /**
     * 留言内容
     */
    private String msg;

    /**
     * 创建时间
     */
    private Long createTime;

    /**
     * 留言的评论内容(树形结构)
     */
    private List<CommentOutVo> children = Collections.emptyList();

}
