import {Offcanvas, Stack} from "react-bootstrap"

import {useShoppingCart} from "../context/ShoppingCartContext"
import {formatCurrency} from "../utilities/formatCurrency"
import {CartItem} from "./CartItem"
import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
}
// Компонент ShoppingCart для відображення кошика покупок
const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    // Використання хука useShoppingCart для доступу до функціоналу кошика покупок
    const { closeCart, cartItems } = useShoppingCart()

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {/* Відображення кожного товару у кошику */}
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    {/* Відображення загальної вартості кошика */}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "} {/* Загальна сума */}
                        {/* Відображення загальної вартості кошика з використанням функції formatCurrency */}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => { // Обчислення загальної вартості кошика
                                // Знаходження товару за його ідентифікатором
                                const item = storeItems.find(i => i.id === cartItem.id)
                                // Додавання вартості товару до загальної вартості кошика
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0) // Початкове значення загальної вартості - 0
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export {
    ShoppingCart
}