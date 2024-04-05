import {Button, Card} from "react-bootstrap"

import {useShoppingCart} from "../context/ShoppingCartContext"
import {formatCurrency} from "../utilities/formatCurrency"

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

// Компонент StoreItem для відображення окремого товару
const StoreItem = ({id, name, price, imgUrl}: StoreItemProps) => {
    // Використання хука useShoppingCart для доступу до функціоналу кошика покупок
    const {
        getItemQuantity, // Функція для отримання кількості товару у кошику за його ідентифікатором
        increaseCartQuantity, // Функція для збільшення кількості товару у кошику за його ідентифікатором
        decreaseCartQuantity, // Функція для зменшення кількості товару у кошику за його ідентифікатором
        removeFromCart, // Функція для видалення товару з кошика за його ідентифікатором
    } = useShoppingCart()

    // Отримання кількості товару у кошику
    const quantity = getItemQuantity(id)


    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{objectFit: "cover"}}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title
                    className="d-flex justify-content-between align-items-baseline mb-4"> {/* Назва товару та ціна */}
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {/* Перевірка чи товар є у кошику */}
                    {quantity === 0 ? ( // Якщо товару немає у кошику
                        <Button className="w-100"
                                onClick={() => increaseCartQuantity(id)}> {/* Кнопка "Додати у кошик" */}
                            + Add To Cart
                        </Button>
                    ) : ( // Якщо товар є у кошику
                        <div className="d-flex align-items-center flex-column"
                             style={{gap: ".5rem"}}> {/* Блок кількості товару та дій */}
                            <div className="d-flex align-items-center justify-content-center"
                                 style={{gap: ".5rem"}}> {/* Блок кількості товару */}
                                <Button
                                    onClick={() => decreaseCartQuantity(id)}>-</Button> {/* Кнопка зменшення кількості товару */}
                                <div> {/* Кількість товару у кошику */}
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                                <Button
                                    onClick={() => increaseCartQuantity(id)}>+</Button> {/* Кнопка збільшення кількості товару */}
                            </div>
                            <Button // Кнопка видалення товару з кошика
                                onClick={() => removeFromCart(id)}
                                variant="danger"
                                size="sm"
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export {
    StoreItem
}