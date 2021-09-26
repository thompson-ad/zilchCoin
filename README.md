# Zilch Coin

Welcome to Zilch Coin! A place where you can cash in your Zilch Coins on any of your Zilch Cards.

## Getting Started

- Clone this repository.
- Install `node_modules` by running `yarn`.
- Install `pods` by running `cd ios && pod install && cd ..`.
- Start the local server by running `yarn server`.
- In a new terminal window, run `yarn ios` to start development server and build the app to an iOS simulator. Or run `yarn android` to start development server and build the app to an Android simulator.

## Tests

- Run `yarn test` to run the test suite with jest.

_Note - if jest times out, it is because `App.tsx` uses `setTimeout` to fake a slower connection. Remove the timeouts if errors are thrown._

## Architecture

- All source files are found in `src/`.
- Tests are located in `src/__tests__`.
- The API client and available methods are in `src/api`
- Credit card images can be found in `src/assets`
- Components used are in `src/components`
- A small theme is available in `src/theme`
