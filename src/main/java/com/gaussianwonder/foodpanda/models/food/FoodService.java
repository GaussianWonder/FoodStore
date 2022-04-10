package com.gaussianwonder.foodpanda.models.food;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    final FoodRepo foodRepo;

    @Autowired
    public FoodService(
            FoodRepo foodRepo
    ) {
        this.foodRepo = foodRepo;
    }

    public List<Food> of(Long restaurantId) {
        return this.foodRepo.findFoodsByRestaurant_Id(restaurantId);
    }
}
