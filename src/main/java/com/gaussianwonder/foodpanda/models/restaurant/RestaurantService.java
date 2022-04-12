package com.gaussianwonder.foodpanda.models.restaurant;

import com.gaussianwonder.foodpanda.auth.AuthService;
import com.gaussianwonder.foodpanda.models.restaurant.dto.RestaurantDto;
import com.gaussianwonder.foodpanda.models.restaurant.dto.UpdateRestaurantDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantService {
    final RestaurantRepo restaurantRepo;

    @Autowired
    public RestaurantService(
            RestaurantRepo restaurantRepo
    ) {
        this.restaurantRepo = restaurantRepo;
    }

    public Optional<Restaurant> find(String name) {
        return this.restaurantRepo.findByName(name);
    }

    public Optional<Restaurant> of(Long id) {
        return this.restaurantRepo.findFirstByUser_Id(id);
    }

    public Optional<Restaurant> ofAuthed() {
        return AuthService
                .getAuthedId()
                .flatMap(this::of);
    }

    public Optional<Restaurant> create(RestaurantDto restaurantDto) {
        return AuthService
                .getAuthed()
                .filter(authed -> of(authed.getId()).isEmpty())
                .map(authed -> {
                    Restaurant restaurant = new Restaurant(restaurantDto.getName(), authed);
                    this.restaurantRepo.save(restaurant);
                    return restaurant;
                });
    }

    public Optional<Restaurant> update(UpdateRestaurantDto restaurantDto) {
        return AuthService
                .getAuthedId()
                .flatMap(this::of)
                .filter(restaurant -> restaurant.getId().equals(restaurantDto.getId()))
                .map(restaurant -> {
                    restaurant.setName(restaurantDto.getName());
                    this.restaurantRepo.save(restaurant);
                    return restaurant;
                });
    }

    public Restaurant updateComputed(Restaurant restaurant) {
        return this.restaurantRepo.save(restaurant);
    }
}
