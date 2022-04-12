package com.gaussianwonder.foodpanda.models.order.dto;

import javax.validation.constraints.NotNull;
import java.util.List;

public class NewOrderDto {
    @NotNull(message = "List cannot be null")
    List<Long> foodIds;

    public NewOrderDto(List<Long> foodIds) {
        this.foodIds = foodIds;
    }

    public List<Long> getFoodIds() {
        return foodIds;
    }

    public void setFoodIds(List<Long> foodIds) {
        this.foodIds = foodIds;
    }
}
