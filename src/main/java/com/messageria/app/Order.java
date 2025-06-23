
package com.messageria.app;

import java.util.List;

public class Order {
    private String id;
    private String hora;
    private List<String> items;

    public Order() {}

    public Order(String id, String hora, List<String> items) {
        this.id = id;
        this.hora = hora;
        this.items = items;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String gethora() { return hora; }
    public void sethora(String hora) { this.hora = hora; }

    public List<String> getItems() { return items; }
    public void setItems(List<String> items) { this.items = items; }
}
