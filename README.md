<div align="center">
  <p>Server-side JSX/TSX rendering for your express or NestJS application</p>
</div>

[![npm version](https://badge.fury.io/js/express-tsx-views.svg)](https://www.npmjs.com/package/express-tsx-views)
[![Test Coverage][coveralls-image]][coveralls-url]
[![Build Status][build-image]][build-url]

# Description <!-- omit in toc -->

With this template engine, TSX files can be rendered server-side by your Express application. Unlike other JSX express renderers, this one does not rely on JSX files being transpiled by `babel` at runtime. Instead, TSX files are processed once by the `tsc` compiler.

For this to work, the templates are imported dynamically during rendering. And for this **you have to provide a default export in your main TSX files**. (Embeddable TSX components don't have to use a default export).

# Highlights <!-- omit in toc -->

- Fast, since the JSX/TSX files do not have to be transpiled on-the-fly with every request
- Works with compiled files (`.js` / `node`) and uncompiled files (`.tsx` / `ts-node`, `ts-jest`, ...)
- Provides the definition of React contexts on middleware level
- Supports execution of GraphQL queries from JSX components

# Table of contents <!-- omit in toc -->

- [Usage](#usage)
  - [Express](#express)
  - [NestJS](#nestjs)
- [Render Middlewares](#render-middlewares)
  - [Prettify](#prettify)
  - [Provide React Context](#provide-react-context)
  - [GraphQL](#graphql)
- [License](#license)

# Usage

```sh
$ npm install --save express-tsx-views
```

You have to set the `jsx` setting in your TypeScript configuration `tsconfig.json` to the value `react` and to enable `esModuleInterop`:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "esModuleInterop": true
  }
}
```

This template engine can be used in express and NestJS applications. The function `setupReactViews()` is provided, with which the engine is made available to the application.

```ts
import { setupReactViews } from "express-tsx-views";

const options = {
  viewsDirectory: path.resolve(__dirname, "../views"),
};

setupReactViews(app, options);
```

The following options may be passed:

| Option           | Type                       | Description                                                                                                                                                                                                                           | Default             |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `viewsDirectory` | `string`                   | The directory where your views (`.tsx` files) are stored. Must be specified.                                                                                                                                                          | -                   |
| `doctype`        | `string`                   | [Doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) to be used.                                                                                                                                                      | `<!DOCTYPE html>\n` |
| `transform`      | `(html: string) => string` | With this optional function the rendered HTML document can be modified. For this purpose a function must be defined which gets the HTML `string` as argument. The function returns a modified version of the HTML string as `string`. | -                   |
| `middlewares`    | `TsxRenderMiddleware[]`    | A list of `TsxRenderMiddleware` objects that can be used to modify the render context. See [Render middlewares](#render-middlewares)                                                                                                  | -                   |

## Express

Example express app (See also `example/app.ts` in this project):

```js
import express from "express";
import { resolve } from "path";
import { setupReactViews } from "express-tsx-views";
import { Props } from "./views/my-view";

export const app = express();

setupReactViews(app, {
  viewsDirectory: resolve(__dirname, "views"),
  prettify: true, // Prettify HTML output
});

app.get("/my-route", (req, res, next) => {
  const data: Props = { title: "Test", lang: "de" };
  res.render("my-view", data);
});

app.listen(8080);
```

`views/my-view.tsx`:

```tsx
import React, { Component } from "react";
import MyComponent from "./my-component";
import { MyLayout } from "./my-layout";

export interface Props {
  title: string;
  lang: string;
}

// Important -- use the `default` export
export default class MyView extends Component<Props> {
  render() {
    return <div>Hello from React! Title: {this.props.title}</div>;
  }
}
```

## NestJS

See [nestjs-tsx-views](https://github.com/pmb0/nestjs-tsx-views).

express-tsx-views can also be used in [NestJS](https://nestjs.com/). For this purpose the template engine must be made available in your `main.ts`:

# Render Middlewares

## Prettify

Prettifies generated HTML markup using [prettier](https://github.com/prettier/prettier).

```ts
setupReactViews(app, {
  middlewares: [new PrettifyRenderMiddleware()],
});
```

## Provide React Context

Provides a react context when rendering your react view.

```ts
// my-context.ts
import {createContext} from 'react'

export interface MyContextProps = {name: string}

export const MyContext = createContext<MyContextProps | undefined>(undefined)
```

Use `addReactContext()` to set the context in your route or in any other middleware:

```ts
// app.ts

// Route:
app.get("/", (request: Request, res: Response) => {
  addReactContext(res, MyContext, { name: "philipp" });

  res.render("my-view");
});

// Middleware:
app.use((req: Request, res: Response, next: NextFunction) => {
  addReactContext(res, MyContext, {
    name: "philipp",
  });
  next();
});
```

Now you can consume the context data in any component:

```tsx
// my-component.tsx
import { useContext } from "react";
import { MyContext } from "./my-context";

export function MyComponent() {
  const { name } = useContext(MyContext);
  return <span>Hallo, {name}!</span>;
}
```

## GraphQL

This module supports the execution of GraphQL queries from the TSX template. For this purpose `graphql`, `@apollo/client` and `cross-fetch` have to be installed separately:

```sh
$ npm install --save @apollo/client cross-fetch
```

Now you can create an `ApolloRenderMiddleware` object and configure it as a middleware within `express-tsx-views`:

```ts
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloRenderMiddleware } from "express-tsx-views/dist/apollo";
// needed to create a apollo client HTTP link:
import { fetch } from "cross-fetch";

// Apollo client linking to an example GraphQL server
const apollo = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    fetch,
  }),
  cache: new InMemoryCache(),
});

setupReactViews(app, {
  viewsDirectory: resolve(__dirname, "views"),
  middlewares: [new ApolloRenderMiddleware(apollo)],
});
```

Example view (see the example folder in this project):

```ts
export interface Film {
  id: string;
  title: string;
  releaseDate: string;
}

export interface AllFilms {
  allFilms: {
    films: Film[];
  };
}

const MY_QUERY = gql`
  query AllFilms {
    allFilms {
      films {
        id
        title
        releaseDate
      }
    }
  }
`;

export interface Props {
  title: string;
  lang: string;
}

export default function MyView(props: Props): ReactElement {
  const { data, error } = useQuery<AllFilms>(MY_QUERY);

  if (error) {
    throw error;
  }

  return (
    <MyLayout lang={props.lang} title={props.title}>
      <h2>Films:</h2>
      {data?.allFilms.films.map((film) => (
        <ul key={film.id}>
          {film.title} ({new Date(film.releaseDate).getFullYear()})
        </ul>
      ))}
    </MyLayout>
  );
}
```

# License

express-tsx-views is distributed under the MIT license. [See LICENSE](./LICENSE) for details.

[coveralls-image]: https://img.shields.io/coveralls/pmb0/express-tsx-views/master.svg
[coveralls-url]: https://coveralls.io/r/pmb0/express-tsx-views?branch=master
[build-image]: https://github.com/pmb0/express-tsx-views/workflows/Tests/badge.svg
[build-url]: https://github.com/pmb0/express-tsx-views/actions?query=workflow%3ATests
