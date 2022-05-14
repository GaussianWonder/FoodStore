package com.gaussianwonder.foodpanda;

import com.gaussianwonder.foodpanda.auth.AuthService;
import com.gaussianwonder.foodpanda.models.user.User;
import com.gaussianwonder.foodpanda.models.user.UserRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class AuthTest {
    private final AuthService auth;
    private final UserRepo userRepo;

    private final String rawUsername = UUID.randomUUID().toString();
    private final String rawPassword = UUID.randomUUID().toString();
    private final User testUser = new User(rawUsername, rawPassword);

    @Autowired
    public AuthTest(
            final AuthService auth,
            final UserRepo userRepo
    ) {
        this.auth = auth;
        this.userRepo = userRepo;
    }

    @BeforeEach
    void registerUser() {
        userRepo.save(testUser);
    }

    @AfterEach
    public void destroyAll() {
        userRepo.delete(testUser);
    }

    @Test
    void login_success() {
        assertThat(auth.login(rawUsername, rawPassword)).isPresent();
    }


    @Test
    void login_fail() {
        assertThat(auth.login(rawUsername, "not-a-uuid-invalid-password")).isNotPresent();
    }
}
