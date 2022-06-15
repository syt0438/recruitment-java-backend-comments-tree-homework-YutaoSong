package com.homework.comments.core;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.util.AntPathMatcher;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 11:52
 */
@SpringBootConfiguration
public class BaseConfiguration {

    @Bean
    public AntPathMatcher matcher() {
        return new AntPathMatcher();
    }

}
