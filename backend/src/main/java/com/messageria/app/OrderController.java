
package com.messageria.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping
    public ResponseEntity<String> criarPedido(@RequestBody List<String> items) throws Exception {
        Order order = new Order(UUID.randomUUID().toString(), Instant.now().toString(), items);
        String json = new ObjectMapper().writeValueAsString(order);
        kafkaTemplate.send("orders", order.getId(), json);
        return ResponseEntity.ok("Pedido criado com sucesso!");
    }
}
