## About
This project is a first version of web crawler.

## Build
```
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

## Next Improvements
- Finish the generic configuration strategy to support crawling from tables and scripts with different properties;
- Externalize hostname and config inside docker as env
- Building specific errors to not_found or generic error in Axios integration to improve readability and testability
- Testing crawler when get script without valid JSON (nowadays the code crashes)
- Apply `loadsh` library to traverse the JSON providing a string like `path.sub_path`