# Users Search Client

A small React app that searches users through the [Users API](https://github.com/JoseCarlosAispuro/users-api). I built it to practice fetching data in React: loading and error states, request cancellation and passing data between components.

## Tech stack

- React [19] with Vite
- Plain `fetch` with `AbortController`
- Talks to a separate Express API (see the link above)

## Getting started

This app needs the API running locally and allowed by its CORS configuration.

1. Start the [Users API](https://github.com/JoseCarlosAispuro/users-api) on `http://localhost:3000`, with `CORS_ORIGIN=http://localhost:5173` in its environment.
2. Install and configure this app:

```bash
git clone [repo-url]
cd [repo-folder]
npm install
cp .env.example .env
npm run dev
```

3. Open `http://localhost:5173`.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Base URL of the API, without a trailing slash, e.g. `http://localhost:3000`. |

Vite only exposes variables that start with `VITE_`, and they end up in the browser bundle, so never put secrets here. Restart the dev server after changing the `.env` file.

## Features

- Lists all users on load
- Search by name (calls `GET /users?name=...`)
- Loading state, empty-results message and error message when the server is unreachable or returns an error

## How it works

- `App` owns the state (`query`, `users`, `loading`, `error`) and performs the request.
- `SearchBox` is a form that calls an `onSearch` callback with the typed text. It does not know anything about the API.
- `UsersList` receives the users as a prop and renders them, or a "No Results" message.

## Design decisions

- **Request cancellation.** The effect creates an `AbortController` and aborts it on cleanup. If a user searches "an" and then "ana" quickly, a slow response for "an" can no longer overwrite the newer results. It also removes the duplicate request React Strict Mode causes in development.
- **Checks `response.ok`.** `fetch` does not reject on HTTP errors, so a `400` or `500` would otherwise be treated as data. Non-OK responses go to the error state.
- **Safe query strings.** The search text goes through `encodeURIComponent`, so spaces or characters like `&` do not break the URL.
- **No `name=` for an empty search.** An empty search requests `/users`, because the API rejects an empty `name` parameter.
- **Configurable API URL.** The base URL comes from `VITE_API_URL`, so the app is not tied to a fixed address.
- **Data flows down, events flow up.** The child component reports the search through a callback and the parent owns the state.

## Known limitations and next steps

- The search runs when the form is submitted, not as you type. A debounced live search would be a natural next step.
- No pagination.
- Migrate to TypeScript.

## Author

José Carlos Aispuro Beltrán · [jocaibe.com](https://jocaibe.com) · [LinkedIn](https://www.linkedin.com/in/jc-aispuro-beltran/)