package com.project.exam.user;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return this.userService.login(user);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        System.out.println(user);
        return this.userService.register(user);
    }
}
