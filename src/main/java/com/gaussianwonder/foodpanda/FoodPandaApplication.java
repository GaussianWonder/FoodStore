package com.gaussianwonder.foodpanda;

import com.gaussianwonder.foodpanda.config.Env;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodPandaApplication {

    public static void main(String[] args) throws Exception {
        if (!Env.isValid()) {
            throw new Exception("The .env is invalid. Check .env.example and define each mandatory field");
        }
        SpringApplication.run(FoodPandaApplication.class, args);
    }

}
