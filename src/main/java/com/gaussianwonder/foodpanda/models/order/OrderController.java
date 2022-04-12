package com.gaussianwonder.foodpanda.models.order;

import com.gaussianwonder.foodpanda.models.order.dto.NewOrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RestController
public class OrderController {
    final OrderService orderService;

    @Autowired
    public OrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }

    @RolesAllowed({"ADMIN", "USER"})
    @PostMapping("/orders")
    public ResponseEntity<Order> newOrder(
            @Valid
            @RequestBody
            NewOrderDto orderDto
    ) {
        List<Long> foodIds = orderDto.getFoodIds();

        if (foodIds == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        if (foodIds.size() == 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Order order = this.orderService
                .createFrom(new ArrayList<>(foodIds))
                .orElse(null);

        if (order == null)
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RolesAllowed({"ADMIN", "USER"})
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getUserOrders() {
        Optional<List<Order>> orders = this.orderService.ofCurrentUser();

        if (orders.isEmpty())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(orders.get(), HttpStatus.OK);
    }

    @RolesAllowed("ADMIN")
    @GetMapping("admin/orders")
    public ResponseEntity<List<Order>> getRestaurantOrders() {
        Optional<List<Order>> orders = this.orderService.ofCurrentAdminRestaurant();

        if (orders.isEmpty())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(orders.get(), HttpStatus.OK);
    }

    @RolesAllowed("ADMIN")
    @PutMapping("admin/orders/{orderID}/next")
    public ResponseEntity<Order> nextOrderState(
            @PathVariable(value="orderID")
            @NotNull(message = "ID cannot be null")
            @Positive(message = "Invalid ID")
            final Long id
    ) {
        Order order = this.orderService
                .nextOrderState(id)
                .orElse(null);

        if (order == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @RolesAllowed("ADMIN")
    @PutMapping("admin/orders/{orderID}/decline")
    public ResponseEntity<Order> declineOrder(
            @PathVariable(value="orderID")
            @NotNull(message = "ID cannot be null")
            @Positive(message = "Invalid ID")
            final Long id
    ) {
        Order order = this.orderService
                .declineOrder(id)
                .orElse(null);

        if (order == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
