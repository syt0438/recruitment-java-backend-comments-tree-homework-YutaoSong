package com.homework.comments.controller;

import lombok.SneakyThrows;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/9
 * Time: 21:11
 */
@Controller
public class IndexController {

    @SneakyThrows
    @RequestMapping
    public ModelAndView index(HttpServletResponse response) {
        response.sendRedirect("/index.html");

        return null;
    }

}
