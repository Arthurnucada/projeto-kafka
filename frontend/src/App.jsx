import React, { useState, useEffect } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'Notebook', price: 3500 },
  { id: 2, name: 'Fone de Ouvido', price: 199 },
  { id: 3, name: 'Carregador', price: 89 },
  { id: 4, name: 'Teclado', price: 149 },
  { id: 5, name: 'Mouse', price: 99 },
  { id: 6, name: 'Monitor 24"', price: 899 },
  { id: 7, name: 'Webcam HD', price: 229 },
  { id: 8, name: 'Hub USB-C', price: 179 },
  { id: 9, name: 'SSD 1TB', price: 599 },
  { id: 10, name: 'Cadeira Gamer', price: 1299 }
]

export default function App() {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('cart-open', isOpen)
  }, [isOpen])

  const addToCart = (product) => {
    const index = cart.findIndex(item => item.id === product.id)
    let updatedCart

    if (index >= 0) {
      updatedCart = [...cart]
      updatedCart[index].quantity += 1
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }]
    }

    setCart(updatedCart)
    setIsOpen(true)
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const confirmOrder = async () => {
    if (cart.length === 0) {
      alert("Carrinho vazio!")
      return
    }

    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart.map(p => `${p.name} x${p.quantity}`))
      })

      if (response.ok) {
        alert("Pedido confirmado!")
        setCart([])
      } else {
        alert("Erro ao enviar pedido")
      }
    } catch (err) {
      alert("Erro de conexão com o backend")
    }
  }

  return (
      <div className="app">
        <h1>Produtos</h1>
        <div className="product-list">
          {products.map((p) => (
              <div key={p.id} className="product-card">
                <h3>{p.name}</h3>
                <p>R$ {p.price.toFixed(2)}</p>
                <button onClick={() => addToCart(p)}>Adicionar</button>
              </div>
          ))}
        </div>

        <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
          <h2>Carrinho</h2>

          <div className="cart-list-container">
            {cart.length === 0 ? (
                <p>Sua cesta está vazia</p>
            ) : (
                <ul>
                  {cart.map((item, index) => (
                      <li key={index}>
                        {item.name} x{item.quantity} — R$ {item.price.toFixed(2)} <br />
                        <small>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</small>
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="cart-footer">
            <strong>Total: R$ {total.toFixed(2)}</strong>
            <button onClick={confirmOrder}>Finalizar Pedido</button>
            {cart.length > 0 && (
                <button onClick={clearCart} className="clear-cart">🗑 Limpar carrinho</button>
            )}
          </div>
        </div>

        <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
          🛒 ({cart.reduce((sum, i) => sum + i.quantity, 0)})
        </button>
      </div>
  )
}