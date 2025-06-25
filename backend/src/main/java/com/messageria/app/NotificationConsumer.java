
package com.messageria.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {
    @KafkaListener(topics = "inventory-events", groupId = "notification-group")
    public void notificaCliente(String message) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InventoryEvent event = mapper.readValue(message, InventoryEvent.class);
        System.out.printf("[Aviso] Pedido %s registrado\n", event.getOrderId(), event.getStatus());
    }
}
