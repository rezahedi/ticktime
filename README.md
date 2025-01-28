# Tick Time app
Another todo application!

## AirTable format

Create a table in AirTable and give it a name, Put name in .env file.

__Our AirTable's table columns:__
```
title: string
completedAt: date
deadline: date
icon: string
```

## Environment variables

To configure the environment variables, create a `.env.local` file at the root of your project and copy the content of `.env.example` file into it. Then modify the values as needed.

```env
VITE_AIRTABLE_API_TOKEN=""
VITE_AIRTABLE_BASE_ID=""
VITE_TABLE_NAME=""
```

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
