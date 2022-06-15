package com.homework.comments.core.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.List;

/**
 * @author LinShu
 * Just contact me if you have any questions.
 * My e-mail is syt0438@163.com.
 * Date: 2022/6/7
 * Time: 11:46
 */
@Setter
@Getter
@ConfigurationProperties(prefix = "auth")
@Configuration
public class AuthConfiguration {

    private List<String> whileTokenUris = Collections.emptyList();

}
