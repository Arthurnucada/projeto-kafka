
# Kafka Ecommerce - Sistema Distribuído com Apache Kafka e Java

## Arquitetura

### Serviços:

1. **Order Service (produtor)**  
   Expõe uma API REST (`POST /orders`) que envia um pedido para o tópico `orders`.

2. **Inventory Service (consumidor + produtor)**  
   Consome mensagens do tópico `orders`, simula a reserva de estoque e publica o resultado no tópico `inventory-events`.

3. **Notification Service (consumidor)**  
   Consome o tópico `inventory-events` e exibe no console uma simulação de notificação (SMS/email).

---

## Tecnologias utilizadas

- Java 21
- Spring Boot
- Apache Kafka
- Docker
- React
- NodeJs
---

## Como executar

### 1. Clonar o projeto

```bash
git clone <https://github.com/Arthurnucada/projeto-kafka>
```

### 2. Subir a aplicação

#### 2.1. Backend

```bash
cd backend
```

```bash
docker-compose up -d
```

(Passo opcional) Verificar os tópicos com:

```bash
docker exec -it kafka-ecommerce-kafka-1 kafka-topics --list --bootstrap-server localhost:9092
```

O resultado deve ser:
```
orders
inventory-events
```

### 3. Executar a aplicação Java

```bash
mvn clean install
mvn spring-boot:run
```

#### 2.2. Frontend

```bash
cd frontend
```

```bash
npm install
npm run dev
```
Com isso: O frontEnd da aplicação estará rodando em http://localhost:5173

---

## Testes

### Enviar um pedido:

```bash
curl -X POST http://localhost:8080/orders \
     -H "Content-Type: application/json" \
     -d '["notebook", "fone", "carregador"]'
```

### Resultado esperado:

No console do Spring:

```
[Aviso] Pedido 'id' registrado
```
---

## Requisitos não funcionais

### Escalabilidade
Kafka permite criar múltiplas partições em um tópico. Isso possibilita o paralelismo do processamento das mensagens por múltiplos consumidores (consumer groups), aumentando a escalabilidade.

### Tolerância a falhas
Kafka persiste as mensagens no disco e permite múltiplos brokers com replicação. Assim, se um broker cair, outro pode assumir sem perda de dados.

---

## Autor

- Arthur Nucada
---
