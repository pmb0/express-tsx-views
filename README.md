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

# Table of contents <!-- omit in toc -->

- [Usage](#usage)
  - [Express](#express)
  - [NestJS](#nestjs)
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
| `prettify`       | `boolean`                  | If activated, the generated HTML string is formatted using [prettier](https://github.com/prettier/prettier).                                                                                                                          | `false`             |
| `transform`      | `(html: string) => string` | With this optional function the rendered HTML document can be modified. For this purpose a function must be defined which gets the HTML `string` as argument. The function returns a modified version of the HTML string as `string`. | -                   |

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

express-tsx-views can also be used in [NestJS](https://nestjs.com/). For this purpose the template engine must be made available in your `main.ts`:

```ts
import { setupReactViews } from "express-tsx-views";

async function bootstrap() {
  // ...
  setupReactViews(app.getHttpAdapter().getInstance(), {
    viewsDirectory: resolve(__dirname, "../views"),
  });
}
// ...
```

Example controller:

```ts
import { Props } from './views/my-view'

@Get('/my-route')
@Render('my-view')
getMyRoute(): Props {
  return { title: "Hello from NestJS", lang: "de" }
}
```

# License

express-tsx-views is distributed under the MIT license. [See LICENSE](./LICENSE) for details.

[coveralls-image]: https://img.shields.io/coveralls/pmb0/express-tsx-views/master.svg
[coveralls-url]: https://coveralls.io/r/pmb0/express-tsx-views?branch=master
[build-image]: https://github.com/pmb0/express-tsx-views/workflows/Tests/badge.svg
[build-url]: https://github.com/pmb0/express-tsx-views/actions?query=workflow%3ATests
