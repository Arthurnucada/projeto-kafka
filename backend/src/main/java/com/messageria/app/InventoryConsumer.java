
package com.messageria.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class InventoryConsumer {
    private final Set<String> pedidosProc = new HashSet<>();

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @KafkaListener(topics = "orders", groupId = "inventory-group")
    public void processarPedido(String message) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Order order = mapper.readValue(message, Order.class);

        if (pedidosProc.contains(order.getId())) return;

        pedidosProc.add(order.getId());
        InventoryEvent event = new InventoryEvent(order.getId(), "");

        kafkaTemplate.send("inventory-events", order.getId(), mapper.writeValueAsString(event));
    }
}
