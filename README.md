# Zilch Coin

Welcome to Zilch Coin! A place where you can cash in your Zilch Coins on any of your Zilch Cards.

## Getting Started

- Clone this repository.
- Install `node_modules` by running `yarn`.
- Install `pods` by running `cd ios && pod install && cd ..`.
- Start the local server by running `yarn server`.
- In a new terminal window, run `yarn ios` to start development server and build the app to an iOS simulator.

### Running on Android

If run on Android, you may encounter an error: `This project's Gradle Plugin requires Java 11 or higher to run`.

If so, please open the project in android studio and follow the steps outlined [here](https://nkaushik.com/android/gradle-plugin-requires-java-to-run/) (I advise installing the latest JDK), clean the build with `cd android && ./gradlew clean && cd ..`, and rebuild.

Then run `yarn android` to start development server and build the app to an Android simulator.

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
