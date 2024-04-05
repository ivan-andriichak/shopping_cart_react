import {Button, Stack} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";

import {formatCurrency} from "../utilities/formatCurrency";

type CartItemProps = {
    id: number
    quantity: number
}

// Компонент CartItem для відображення елемента кошика покупок
const CartItem = ({ id, quantity }: CartItemProps) => {
    // Використання хука useShoppingCart для доступу до функціоналу кошика покупок
    const { removeFromCart } = useShoppingCart()
    // Пошук товару за його ідентифікатором
    const item = storeItems.find(i => i.id === id)
    // Якщо товар не знайдено, повертаємо null
    if (item == null) return null

    // Повертаємо компонент Stack для відображення елемента кошика покупок
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center"> {/* Стек для відображення елемента кошика */}
            {/* Зображення товару */}
            <img
                src={item.imgUrl} // URL зображення товару
                style={{ width: "125px", height: "75px", objectFit: "cover" }} // Стилі зображення
            />
            <div className="me-auto"> {/* Блок з інформацією про товар */}
                <div>
                    {item.name}{" "} {/* Назва товару */}
                    {quantity > 1 && ( // Якщо кількість товару більше одного
                        <span className="text-muted" style={{ fontSize: ".65rem" }}> {/* Додаткова інформація про кількість товару */}
                            x{quantity} {/* Відображення кількості товару */}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}> {/* Ціна товару */}
                    {formatCurrency(item.price)} {/* Форматована ціна товару */}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div> {/* Загальна вартість товару */}
            <Button // Кнопка для видалення товару з кошика
                variant="outline-danger" // Вид кнопки
                size="sm" // Розмір кнопки
                onClick={() => removeFromCart(item.id)} // Обробник кліку (видалення товару з кошика)
            >
                &times; {/* Знак "х" */}
            </Button>
        </Stack>
    )
}

export {
    CartItem
}
