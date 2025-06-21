package com.project.exam.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User register(User user) {
        if (userRepository.findByPassword(user.getPassword()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        return userRepository.save(user);
    }

    public User login(User user) {
        System.out.println(user);
        return userRepository.findByPassword(user.getPassword()).orElseThrow();
    }
}
