# Tick Time app
Another todo application!

## AirTable format

Create a table in AirTable and give it a name (mine is `Default`), Put the name in .env file. Then create the columns as follow or you can simply copy [my Airtable's base and the data](https://airtable.com/appuFZTTeaDmg0JQa/shrizRcFH1R0MRzCN) for yourself.

__Columns of the main table:__
```
title: string
description: string
completedAt: date (US format)
deadline: date (US format)
icon: string
categoryId: link to categories table
categoryName: string (Normalized from categories table)
```

__Columns of the categories:__
```
name: string
description: string
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
