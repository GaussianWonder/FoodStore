package com.gaussianwonder.foodpanda.config;

import io.github.cdimascio.dotenv.Dotenv;

public class Env {
    public static final Dotenv vars = Dotenv.load();

    /**
     * Check if a key is defined in .env
     * @param key the key to look for
     * @return boolean
     */
    private static boolean exists(String key) {
        String val = vars.get(key);
        if (val == null) return false;
        return !val.isEmpty();
    }

    /**
     * Check if the dotenv instance contains all the necessary keys
     * @return boolean
     */
    public static boolean isValid() {
        return exists("JWT_SECRET") &&
                exists("JWT_ISSUER") &&
                exists("EMAIL_USER") &&
                exists("EMAIL_PASSWORD") &&
                exists("EMAIL_SENDER");
    }

    /**
     * Exists alias
     * @param key the key to look for
     * @return boolean
     */
    public static boolean isValid(String key) {
        return exists(key);
    }

    /**
     * Alias to Env.dotenv.get()
     * @param key the key to look for
     * @return boolean
     */
    public static String get(String key) {
        return vars.get(key);
    }
}
