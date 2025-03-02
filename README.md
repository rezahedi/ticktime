# Tick Time app
Another todo application!

## AirTable format

__The app works without setting up AirTable or env variables__, Use `localStorage` to store todos, but if you want to use AirTable, you need to set up the following:
Create a table in AirTable and give it a name (mine is `Default`), Put the name in .env file. Then create the columns as follow or you can simply copy [my Airtable's base and the data](https://airtable.com/appuFZTTeaDmg0JQa/shrizRcFH1R0MRzCN) for yourself.

__Columns of the main table:__
```
title: string
description: string
completedAt: date (US format)
deadline: date (US format and default value set on today's date)
icon: string
```

## Environment variables

The app works without setting up env variables for AirTable's API, It uses `localStorage` to store todos.
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
