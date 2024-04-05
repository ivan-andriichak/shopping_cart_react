const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD", // Вказання валюти як USD
    style: "currency", // Вказання стилю як валюта
});

// Функція для форматування заданого числа як валюти
export function formatCurrency(number: number) {
    // Форматування заданого числа за допомогою форматувальника валюти
    return CURRENCY_FORMATTER.format(number);
}
