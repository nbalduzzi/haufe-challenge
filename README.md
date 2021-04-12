![alt text](https://pngimg.com/uploads/rick_morty/rick_morty_PNG40.png)

# Haufe Challenge API

Haufe Challenge API is a NodeJS/ExpressJS API RESTFul.

## Considerations

This API was built on NodeJS and Typescript.

1. I choose to use an implementation of IoC on typescript (inversion of control) called [typescript-ioc](https://www.npmjs.com/package/typescript-ioc) to have an annotation bassed dependency injection container. This lightweight library help me to inject dependencies and define as singletons when i believe is necesary.

2. I choose to use the express middlewares:
    - `json` - It parses incoming requests with JSON payloads and is based on `body-parser`.
    - `urlencoded` - Is based on `body-parser` too and help to parse from url
    - `helmet` - It helps to protect the application from some known web vulnerabilities by properly setting HTTP headers.
    - `cors` - Allows restricted resources to be requested from another domain outside the domain from which the first resource was served *(basic config for challenge purpose)*
    - `compression` - Will attempt to compress response bodies for all request that traverse through the middleware. *(on basic config will compress all responses)*

3. [Mongoose](https://mongoosejs.com/) library was chosen for MongoDB object modeling.

4. The `.env.production` file is in the repository and the information inside is the same as `.env.development` for challenge purpose, but this must not be like this. The production enviroment variables must be in some `vpc` or some secured storage and encrypted, and must be injected (or replaced) on deploy step.
The `SECRET` inside must be different of `development env`, the `RICK_AND_MORTY_API_URL` should point to the production url *(if have one)* and the `MONGODB` variables must be all different as `development env` and that mongo must be in a sharded cluster for distribute across multiple machines.

## Docker

Build the image:

```bash
docker build . -t haufe-challenge-api
```

run the image and exposed to the local selected port number

```bash
docker run -p3000:{PORT} haufe-challenge-api
```

### Docker compose

```bash
# Up containers
$ docker-compose up

# Clean and up containers
$ docker-compose up --build --force-recreate
```

## Installation

1. Use the package manager [npm](https://www.npmjs.com/) to install the application dependencies.

2. Use the node version manager [nvm](https://github.com/nvm-sh/nvm) to handle the nodejs version.

```bash
# Define the specified version on .nvmrc file
nvm use

# Install dependencies
npm install
```

## Third-Party Libraries

### **tsoa**

tsoa is a framework with integrated OpenAPI compiler to build Node.js serve-side applications using TypeScript. It can target express, hapi, koa and more frameworks at runtime. tsoa applications are type-safe by default and handle runtime validation seamlessly.

#### Why?

- TypeScript controllers and models as the single source of truth for your API
- A valid OpenAPI (formerly Swagger) spec (2.0 or 3.0) is generated from your controllers and models, including:
    - Paths (e.g. GET /Users)
    - Definitions based on TypeScript interfaces (models)
    - Parameters/model properties marked as required or optional based on TypeScript (e.g. myProperty?: string is optional in the OpenAPI spec)
    - jsDoc supported for object descriptions (most other metadata can be inferred from TypeScript types)
- Routes are generated for middleware of choice
    - Express, Hapi, and Koa currently supported, other middleware can be supported using a simple handlebars template
    - Seamless runtime validation

### **Prettier**
Im used [Prettier](https://prettier.io/) as code formatter

#### Why?
- An opinionated code formatter
- Supports many languages
- Integrates with most editors
- Has few options

### **ESLint**
Im used [ESLint](https://eslint.org/) as syntax analyzer

#### Why?
- Find Problems
    - statically analyzes your code to quickly find problems
    - is built into most text editors and you can run ESLint as part of your continuous integration pipeline
- Fix Automatically
    - Many problems ESLint finds can be automatically fixed
    - fixes are syntax-aware so you won't experience errors introduced by traditional find-and-replace algorithms
- Customize
    - use custom parsers, and write your own rules that work alongside ESLint's built-in rules
    - You can customize ESLint to work exactly the way you need it for your project.

### **Nock**
Im used [Nock](https://github.com/nock/nock) as http mock

#### Why?
- Nock works by overriding Node's http.request function. Also, it overrides http.ClientRequest too to cover for modules that use it directly.

## Development

### Running Server

1. Run the mongo db instance:

```bash
# Run the MongoDB instance
$ docker-compose up mongo
```

2. Run the server in dev mode you need to execute the command:

```bash
# Run development instance
npm run dev
```

### Running Server on different port


```bash
# Run development instance on port 8082
PORT=8082 npm run dev
```

### Documentation

When dev server is running, you can access to the API Swagger Documentation on [`http://localhost:3000/api`](http://localhost:3000/api)

## Test

### Full Tests Execution
```bash
# Will run unit and integration test with coverage report
npm run test
```

### Unit Tests
```bash
# Will run only the unit test with coverage report
npm run test:unit
```

### Integration Tests
```bash
# Will run only the integration test with coverage report
npm run test:integration
```

> Each test execution will generate a coverage report inside the porject on `coverage` folder, if you want to see de coverage report

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
