package com.gaussianwonder.foodpanda.util;

import org.jetbrains.annotations.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;

public class Hash {
    // algorithm passes
    private static final int strength = 12;
    // https://en.wikipedia.org/wiki/Bcrypt#Versioning_history
    private static final BCryptPasswordEncoder.BCryptVersion version = BCryptPasswordEncoder.BCryptVersion.$2B;
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(version, strength, secureRandom);

    public static String bcrypt(@NotNull String toHash)
    {
        return encoder.encode(toHash);
    }

    public static boolean bcryptMatch(@NotNull String raw, @NotNull String hashed)
    {
        return encoder.matches(raw, hashed);
    }
}
