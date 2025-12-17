# Product Catalog - URL-синхронизированные фильтры

Современный каталог товаров с продвинутой системой фильтрации, полностью синхронизированной с URL. Демонстрационный проект для портфолио.

**Демо**: [https://react-url-synced-filters.netlify.app](https://react-url-synced-filters.netlify.app)

## Особенности

- ✅ **URL-синхронизация** — все фильтры хранятся в query string, поддержка истории браузера
- ✅ **Продвинутая фильтрация** — категории, бренды, теги, цена, скидки, рейтинг, наличие
- ✅ **Debounced inputs** — оптимизированный ввод цены без лишних обновлений URL
- ✅ **Пагинация** — встроенная постраничная навигация с сохранением в URL
- ✅ **Адаптивный дизайн** — работает на всех устройствах
- ✅ **Modern UI** — Material UI v5 с кастомной темой
- ✅ **TypeScript strict mode** — полная типизация

## Технологии

**Frontend:**
- React 18 + TypeScript
- React Router v6
- Material UI v5
- Vite

**Архитектура:**
- Feature-Sliced Design (FSD)
- URL как single source of truth
- Мемоизация и оптимизация производительности

**Качество кода:**
- ESLint + Prettier
- Vitest для unit-тестов
- Чистые функции для бизнес-логики

## Структура проекта

```
src/
├── app/          # Корень приложения, роутинг, провайдеры
├── pages/        # Страницы (CatalogPage)
├── widgets/      # Композитные блоки (FiltersPanel, ProductsGrid)
├── features/     # Фичи (urlSyncedFilters, activeFilterChips)
├── entities/     # Доменные сущности (product)
└── shared/       # Общая утилиты, API, моки
```

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`

## Демо функционала

- Выберите категорию → URL обновится → можно поделиться ссылкой
- Укажите диапазон цен → дебаунс 400мс → URL обновится
- Кнопка "назад" в браузере → восстановятся все фильтры
- Пагинация → переход на страницу 2 → URL: `?page=2`

## Контакты

- [GitHub](https://github.com/aminredfield)
- [Telegram](https://t.me/cntz_001)
- [LinkedIn](https://linkedin.com/in/amin-redfield-98a10b365)
