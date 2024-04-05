import { useEffect, useState } from "react";

// Власний хук для роботи з локальним сховищем з використанням дженериків
const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
    // Встановлення стану для збереження значення з локального сховища
    const [value, setValue] = useState<T>(() => {
        // Отримання значення з локального сховища за вказаним ключем
        const jsonValue = localStorage.getItem(key);
        // Розбір значення JSON, якщо воно існує, в іншому випадку використовується початкове значення
        if (jsonValue != null) return JSON.parse(jsonValue);

        // Обробка випадку, коли початкове значення є функцією
        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });

    // Ефект для оновлення локального сховища при зміні ключа або значення
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // Повернення значення та функції для оновлення значення у вигляді кортежу
    return [value, setValue] as [typeof value, typeof setValue];
};

export { useLocalStorage };
