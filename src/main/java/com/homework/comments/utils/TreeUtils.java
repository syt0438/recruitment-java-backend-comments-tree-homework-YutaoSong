package com.homework.comments.utils;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * 通过范型和接口约束，实现通用的构造树结构工具
 *
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 16:52
 */
public abstract class TreeUtils {

    /**
     * 构建树结构
     *
     * @param list          原始数据列表
     * @param rootPredicate 根节点判断工具
     * @param comparator    自定义排序器
     * @param <PK>          id和parentId类型的范型声明
     * @param <T>           数据对象类型的范型声明
     */
    public static <PK, T extends TreeConstraint<PK, T>, S> List<T> buildTree(List<T> list, Predicate<T> rootPredicate, Comparator<T> comparator) {
        return list.parallelStream()
                .filter(rootPredicate)
                .sorted(comparator)
                .peek(item -> item.setChildren(findChildren(item, list, comparator)))
                .collect(Collectors.toList());
    }

    private static <PK, T extends TreeConstraint<PK, T>, S> List<T> findChildren(T root, List<T> list, Comparator<T> comparator) {
        return list.stream()
                .filter(item -> Objects.equals(item.getParentId(), root.getId()))
                .sorted(comparator)
                .peek(item -> item.setChildren(findChildren(item, list, comparator)))
                .collect(Collectors.toList());
    }

    /**
     * 树结构的接口约束
     */
    public interface TreeConstraint<PK, T> {
        PK getId();

        PK getParentId();

        void setChildren(List<T> children);
    }

}
