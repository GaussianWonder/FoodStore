package com.gaussianwonder.foodpanda.models.order;

import com.gaussianwonder.foodpanda.auth.AuthService;
import com.gaussianwonder.foodpanda.email.Email;
import com.gaussianwonder.foodpanda.models.food.Food;
import com.gaussianwonder.foodpanda.models.food.FoodService;
import com.gaussianwonder.foodpanda.models.restaurant.Restaurant;
import com.gaussianwonder.foodpanda.models.restaurant.RestaurantService;
import com.gaussianwonder.foodpanda.models.user.User;
import com.gaussianwonder.foodpanda.util.Log;
import com.gaussianwonder.foodpanda.util.Loggers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    final OrderRepo orderRepo;
    final FoodService foodService;
    final RestaurantService restaurantService;

    @Autowired
    public OrderService(
            OrderRepo orderRepo,
            FoodService foodService,
            RestaurantService restaurantService
    ) {
        this.orderRepo = orderRepo;
        this.foodService = foodService;
        this.restaurantService = restaurantService;
    }

    public List<Order> of(User user) {
        if (user == null) return Collections.emptyList();
        return this.orderRepo.findOrdersByUser_Id(user.getId());
    }

    public List<Order> of(Restaurant restaurant) {
        if (restaurant == null) return Collections.emptyList();
        return this.orderRepo.findOrdersByRestaurant_Id(restaurant);
    }

    public Optional<Order> createFrom(ArrayList<Long> foodIds) {
        ArrayList<Food> foods = new ArrayList<>(
                this.foodService.findByIds(foodIds)
        );

        if (foodIds.size() != foods.size() || foods.size() == 0) {
            return Optional.empty();
        }

        Order order = new Order(foods);

        return AuthService
                .getAuthed()
                .map(user -> {
                    order.setUser(user);
                    this.orderRepo.save(order);
                    try {
                        new Email("New order", "You placed a new order").send();
                    } catch (MessagingException e) {
                        Loggers.global.logger.warning("Error while trying to send order email!");
                        new Log().logger.warning(e.getMessage());
                    }
                    return order;
                });
    }

    public Optional<List<Order>> ofCurrentUser() {
        return AuthService
                .getAuthed()
                .map(this::of);
    }

    public Optional<List<Order>> ofCurrentAdminRestaurant() {
        return this.restaurantService
                .ofAuthed()
                .map(this::of);
    }

    public Optional<Order> nextOrderState(Long orderId) {
        return this.orderRepo
                .findById(orderId)
                .flatMap(order -> OrderState.of(order.getOrderStatus())
                        .flatMap(OrderState.State::next)
                        .map(nextState -> {
                            order.setOrderStatus(nextState.getStatus());
                            this.orderRepo.save(order);
                            return order;
                        })
                );
    }

    public Optional<Order> declineOrder(Long orderId) {
        return this.orderRepo
                .findById(orderId)
                .map(order -> {
                    order.setOrderStatus(OrderState.declined.getStatus());
                    this.orderRepo.save(order);
                    return order;
                });
    }
}
