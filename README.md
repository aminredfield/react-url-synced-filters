# React URL Synced Filters

## Purpose

This repository contains a small e‑commerce catalogue written in **React + TypeScript + Vite** that demonstrates how to implement reusable filters whose state is fully synchronised with the URL query string.

The project exists to showcase the following skills:

- **URL‑synced filters** – the query string is the single source of truth for the current filter state. Changing the filters updates the URL and vice versa.
- **E‑commerce filtering** – users can narrow down the product list by category, price range, stock availability and minimum rating.
- **Debounced inputs** – price fields update the URL only after the user stops typing for ~400 ms.
- **Correct back/forward behaviour** – navigating through history restores both the UI and the filtered results.
- **Type‑safe implementation** – all domain entities and filters are fully typed; TypeScript runs in `strict` mode.

## Stack

The project uses the following technologies and libraries:

- **React 18** with **TypeScript** (strict mode) and **Vite** as the build tool.
- **React Router v6** for routing and access to `useSearchParams`.
- **Material UI (MUI v5)** for theming and ready‑made UI components.
- **Zustand** was considered but not used; local state plus React Router query APIs are sufficient for this demo. See the explanation below.
- **Vitest** and **@testing-library/react** for unit tests.
- **ESLint** and **Prettier** for code quality and formatting.

## Features

The catalogue implements a set of common filters often found in on‑line stores:

| Filter      | Implementation                                                                                                                                 |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **Category**| Multi‑select dropdown. Unknown categories in the URL are ignored.                                                                           |
| **Price**   | Min/max numeric inputs with debounce (≈400 ms). Negative or NaN values are discarded; min>max results in values being swapped.             |
| **In Stock**| Checkbox. Truthy values like `1`, `true`, `yes`, `on` in the URL enable the filter.                                                           |
| **Rating ≥**| Select box (Any, 5, 4, 3, 2, 1). Values are clamped between 0 and 5.                                                                            |

Additional behaviour:

- Filter chips summarise the active filters and allow clearing them individually.
- A **Reset Filters** button clears the UI and the URL to their default state.
- Loading, error and empty states provide clear feedback to the user.
- When a public API is reachable (e.g. DummyJSON), products are fetched remotely. If the request fails (for example offline) the app automatically falls back to a local mock data set with ~200 deterministic products. No API keys are required.

## Architecture (FSD)

The project follows a **Feature‑Sliced Design (FSD)** structure to keep components, business logic and shared code well organised:

- `app/` – application root (`App.tsx`) where routing and theme providers live.
- `pages/` – individual pages of the application. Here there is a single `CatalogPage` which orchestrates filters, data loading and rendering.
- `widgets/` – large blocks that combine multiple entities and features, e.g. `FiltersPanel` and `ProductsGrid`.
- `features/` – encapsulated functionality that can be reused across pages. Examples include `urlSyncedFilters` (hook to read/write filter state to the URL), `resetFilters` (button) and `activeFilterChips` (chips summarising the active filters).
- `entities/` – domain entities such as `product` with its types, filtering logic (`applyFilters`) and UI (`ProductCard`).
- `shared/` – low‑level utilities, custom hooks, mock data and API functions.

All pure functions, such as query parsing/serialisation and product filtering, reside in `shared` or `entities` and are unit tested. UI components do not contain business logic; instead they invoke hooks and call handlers passed via props.

### Why no global store?

The filters in this demo are fully derived from the URL using React Router’s `useSearchParams`. Because the query string is the single source of truth, there is no need for a separate global state manager like Zustand. Using local state for the debounced price inputs keeps the implementation simple while still meeting the requirements. Should the application grow more complex, introducing a state library would be straightforward.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

3. Run the unit tests:

   ```bash
   npm run test
   ```

4. Lint the codebase:

   ```bash
   npm run lint
   ```

## How URL synchronisation works

The heart of this project is the `useUrlSyncedFilters` hook in `features/urlSyncedFilters/hooks.ts`. It reads the current query string via `useSearchParams`, converts it into a strongly typed `Filters` object using `parseQueryToFilters`, and then exposes setter functions which write changes back into the URL using `filtersToQuery`.

- **Reading from the URL:** The hook calls `parseQueryToFilters(searchParams, availableCategories)` to normalise and validate incoming values. For example, unknown categories are discarded, negative prices become `null`, and out‑of‑range ratings are clamped.
- **Writing to the URL:** Whenever a filter changes, the hook creates a new `Filters` object, serialises it with `filtersToQuery` and calls `setSearchParams`. For price inputs, updates are debounced and use the `{ replace: true }` option so that intermediate keystrokes do not clutter the browser history.
- **Back/forward navigation:** Because the URL is the single source of truth, using the browser’s back and forward buttons automatically restores the correct filter state and therefore the correct list of products. The hook listens to changes in `searchParams` and updates its internal state accordingly.

## Key decisions

- **Type safety:** All domain entities (`Product`, `Filters`) are explicitly typed. The TypeScript compiler is configured in strict mode.
- **Query normalisation:** Pure functions `parseQueryToFilters` and `filtersToQuery` encapsulate the logic for interpreting and constructing query strings. They are thoroughly tested with Vitest.
- **Debounced price inputs:** A custom `useDebouncedValue` hook prevents updating the URL on every keystroke. Once the user pauses typing, the values are validated and written back. If `min > max`, they are automatically swapped to match user intent.
- **Material UI:** MUI provides consistent spacing, typography and form controls with minimal configuration. A simple theme is defined in `src/main.tsx`.
- **Clean UI:** The interface prioritises clarity over flair. Filters are placed in a sidebar on desktop and stacked above the product grid on small screens. Active filter chips and a reset button improve discoverability of the current state.

## Demo

You can deploy this application to a static host (e.g. Vercel, Netlify or GitHub Pages) to see it in action. After deployment, replace the placeholder below with your live demo link:

```
<PLACE_DEMO_URL_HERE>
```

### Preview screenshots

You can include one or more screenshots or an animated GIF here to showcase the UI. Replace the placeholders with actual images if desired:

```
<PLACE_SCREENSHOTS_HERE>
```

## Notes

- No secrets or API keys are stored in this repository. If you choose to add environment variables in the future, document them in a `.env.example` file.
- Docker files are intentionally omitted for this simple front‑end demo. Running `npm install` and `npm run dev` is sufficient to start the application locally.
- The mock dataset lives in `shared/mock/products.ts`. Should you wish to add more realism, you can adjust the generation logic or fetch data from a public API.

Happy hacking!