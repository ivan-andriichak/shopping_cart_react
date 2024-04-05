import {createContext, ReactNode, useContext, useState} from "react"

import {ShoppingCart} from "../components/ShoppingCart"
import {useLocalStorage} from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number // Ідентифікатор товару
    quantity: number // Кількість товару
}

type ShoppingCartContext = {
    openCart: () => void // Функція відкриття кошика
    closeCart: () => void // Функція закриття кошика
    getItemQuantity: (id: number) => number // Функція отримання кількості товару за його ідентифікатором
    increaseCartQuantity: (id: number) => void // Функція збільшення кількості товару у кошику за його ідентифікатором
    decreaseCartQuantity: (id: number) => void // Функція зменшення кількості товару у кошику за його ідентифікатором
    removeFromCart: (id: number) => void // Функція видалення товару з кошика за його ідентифікатором
    cartQuantity: number // Загальна кількість товарів у кошику
    cartItems: CartItem[] // Масив елементів кошика
}

// Створення контексту для кошика покупок
const ShoppingCartContext = createContext({} as ShoppingCartContext)

// Функція для використання контексту кошика покупок
function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

// Компонент ShoppingCartProvider для надання доступу до функціоналу кошика покупок
const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false) // Стан для визначення відкриття/закриття кошика
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>( // Стан для зберігання елементів кошика у локальному сховищі
        "shopping-cart", // Ключ для зберігання у локальному сховищі
        [] // Початкове значення - порожній масив
    )

    // Обчислення загальної кількості товарів у кошику
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    // Функція для відкриття кошика
    const openCart = () => setIsOpen(true)
    // Функція для закриття кошика
    const closeCart = () => setIsOpen(false)

    // Функція для отримання кількості товару за його ідентифікатором
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    // Функція для збільшення кількості товару у кошику за його ідентифікатором
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // Функція для зменшення кількості товару у кошику за його ідентифікатором
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // Функція для видалення товару з кошика за його ідентифікатором
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}

export {
    useShoppingCart,
    ShoppingCartProvider
}