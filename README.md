# StarWiki

#### Star Wars wiki app using [Swapi](https://swapi.dev/)

<!-- TABLE OF CONTENTS -->

  <summary><h3 style="display: inline-block">Table of Contents</h3></summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#development">Development</a></li>
    <li><a href="#testing">Testing</a></li>
  </ol>

![image](https://user-images.githubusercontent.com/22510441/111149506-b9322c00-856b-11eb-8b22-f9024e7d9058.png)

![image](https://user-images.githubusercontent.com/22510441/111149658-e8489d80-856b-11eb-900d-b1c809264163.png)






### Getting started

Installing Dependencies:

```bash
$ yarn
```

Running the app:

```bash
$ yarn start
```

For starting the app on a specific OS:

```bash
$ yarn ios | yarn android
```

<br />

### ‍Development

- Eslint is used in the project to enforce code style and should be configured in your [editor](https://eslint.org/docs/user-guide/integrations).

- Prettier is also used and applied automatically by eslint

- Typescript is used in the project for type-checking and should be configured in your [editor](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

You can check this manually by running:

```bash
$ yarn lint
```

You can ask eslint to fix issues by running:

```bash
$ yarn lint:fix
```

<br />

### Testing

Use the following command to run unit tests with coverage:

```bash
$ yarn test
```

Use the following to update unit tests

```bash
$ yarn test -u
```

Use the following to run unit tests in watch mode while developing:

```bash
$ yarn test --watch
```

<br />
