package com.gaussianwonder.foodpanda.models.order;

import java.util.HashMap;
import java.util.Optional;

public class OrderState {
    public interface IState {
        Optional<State> next();
        boolean isFinal();
        boolean isInitial();
        boolean isOk();
    }

    public static abstract class State implements IState {
        OrderStatus status;

        State(OrderStatus orderStatus) {
            this.status = orderStatus;
        }

        public OrderStatus getStatus() {
            return this.status;
        }

        public Optional<State> next() { return Optional.empty(); }
        public boolean isFinal() { return false; }
        public boolean isInitial() { return false; }
        public boolean isOk() { return false; }
    }

    public static final HashMap<OrderStatus, OrderStatus> stateRelation = new HashMap<>() {{
        put(OrderStatus.PENDING, OrderStatus.ACCEPTED);
        put(OrderStatus.ACCEPTED, OrderStatus.IN_DELIVERY);
        put(OrderStatus.IN_DELIVERY, OrderStatus.DELIVERED);
    }};

    public static Optional<State> of(OrderStatus status) {
        if (status == null) return Optional.empty();
        switch (status) {
            case PENDING -> {
                return Optional.of(initialState);
            }
            case DELIVERED -> {
                return Optional.of(finalState);
            }
            case DECLINED -> {
                return Optional.of(declined);
            }
            default -> {
                return Optional.of(
                        new State(status) {
                            @Override
                            public Optional<State> next() {
                                OrderStatus nextStatus = OrderState.stateRelation.get(this.getStatus());
                                return OrderState.of(nextStatus);
                            }
                        }
                );
            }
        }
    }

    public static final State declined = new State(OrderStatus.DECLINED) {
        @Override
        public boolean isFinal() {
            return true;
        }
    };

    public static final State finalState = new State(OrderStatus.DELIVERED) {
        @Override
        public boolean isFinal() {
            return true;
        }

        @Override
        public boolean isOk() {
            return true;
        }
    };

    public static final State initialState = new State(OrderStatus.PENDING) {
        @Override
        public Optional<State> next() {
            return OrderState.of(OrderStatus.ACCEPTED);
        }

        @Override
        public boolean isInitial() {
            return true;
        }
    };
}
