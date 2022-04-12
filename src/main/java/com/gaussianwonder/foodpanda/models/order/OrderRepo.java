package com.gaussianwonder.foodpanda.models.order;

import com.gaussianwonder.foodpanda.models.restaurant.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findOrdersByUser_Id(Long userId);

    @Query(value = """
        SELECT *
        FROM orders
        JOIN cart_items ON orders.id = cart_items.order_id
        JOIN foods ON foods.id = cart_items.food_id
        WHERE foods.id IN (
            SELECT id
            FROM foods
            WHERE foods.restaurant_id = :#{#restaurant.id}
        )
""", nativeQuery = true)
    List<Order> findOrdersByRestaurant_Id(@Param("restaurant") Restaurant restaurant);
}
