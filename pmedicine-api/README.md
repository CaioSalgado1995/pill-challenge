## About
This project is a first version of web crawler.

## Build
Make sure you have `node` and `yarn` both installed (You can check the versions using the following commands in your terminal)
```
node --version
> v16.20.0

yarn --version
> 1.22.19

yarn install
```

### Running Tests
- Running all tests
```
yarn test
```
- Check coverage
```
yarn test:cov
```

## Run locally
```
yarn dev
```

## Libraries
- `cheerio` - To crawling throught html string and find the expected properties
- `express` - To expose API's to the front end layer
- `jest` - To mocking and testing
- `supertest` - To simulate htt requests through the current exposed API
- `axios` - To execute http calls to other layers
- `lodash` - To traverse JSON with path as string

## Next Improvements
- ~~Finish the generic configuration strategy to support crawling from tables and scripts with different properties;~~
- ~~Apply `loadsh` library to traverse the JSON providing a string like `path.sub_path`;~~
- Externalize hostname and config inside docker as env
- Building specific errors to not_found or generic error in Axios integration to improve readability and testability
- Testing crawler when get script without valid JSON (nowadays the code crashes)