package com.gaussianwonder.foodpanda.models.user;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    final UserRepo repo;

    @Autowired
    public UserService(
        UserRepo repo
    ) {
        this.repo = repo;
    }

    public User save(final User user) {
        return repo.save(user);
    }

    public Optional<User> find(final @NotNull Long id) {
        return repo.findById(id);
    }

    public Optional<User> findByUsername(final @NotNull String username) {
        return repo.findByUsername(username);
    }
}
