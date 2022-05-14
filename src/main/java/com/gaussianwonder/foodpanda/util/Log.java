package com.gaussianwonder.foodpanda.util;

import com.gaussianwonder.foodpanda.auth.AuthService;

import java.io.IOException;
import java.util.UUID;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class Log {
    public final Logger logger;

    public Log() {
        logger = createLogger(identifier());
    }

    public Log(String name) {
        logger = createLogger(identifier(name));
    }

    private static String identifier() {
        return AuthService.getAuthedId()
                .map(id -> String.format("u_%d_%s", id, unique()))
                .orElse(String.format("u_0_%s", unique()));
    }

    private static String identifier(String name) {
        return String.format("n_%s_%s", name, unique());
    }

    private static String unique() {
        return UUID.randomUUID().toString();
    }

    private Logger createLogger(String name) {
        Logger logger = Logger.getLogger(name);

        try {
            FileHandler fh = new FileHandler(String.format("./logs/%s.log", name));
            logger.addHandler(fh);

            SimpleFormatter formatter = new SimpleFormatter();
            fh.setFormatter(formatter);
        } catch (SecurityException | IOException e) {
            e.printStackTrace();
        }

        return logger;
    }
}
