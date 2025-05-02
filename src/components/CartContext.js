import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  //tworzenie pustego koszyka 
  const [cartItems, setCartItems] = useState([])

  //sprawdzenie czy jakiś koszyk jest zapisany w pamięci przeglądarki podczas ładowania strony
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  //za każdą zmianą koszyka, jest on zapisywany w pamięci przegldąrki
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  //funkcja do dodawania produktów do koszyka
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      //sprawdzanie czy produkt jest w koszyku
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // jeśli produkt już jest w koszyku, jego ilośc jest zwiększana o 1
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // jeśli produktu nie ma w koszyku, zostaje dodany z ilościa 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  //funkcja do usuwania produktów z koszyka
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  //funkcja do zmiany ilości produktu w koszyku
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    // aktualizacja ilości produktu
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  //funkcja do obliczania łącznej ceny 
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  //funkcja do obliczania łącznej liczby produktów w koszyuk
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  //wszystkie funkcje i dane w jednym obiekcie
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getCartCount,
  }

  //obiekt udostępnionyn dla wszystkich komponentów
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}