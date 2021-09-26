import fetchMock, {enableFetchMocks} from 'jest-fetch-mock';
import React from 'react';
import {render, waitFor, fireEvent} from 'react-native-testing-library';
import App from '../App';
enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

// Snapshot test should ideally be the last
// tests that you write as they will fail a lot
test('it renders as expected', () => {
  const {toJSON} = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});

describe('App Integration Test', () => {
  test('Cards are fetched and displayed', async () => {
    fetchMock.mockResponses([
      JSON.stringify([
        {
          zilchCoinCount: 0,
          id: 0,
        },
        {
          zilchCoinCount: 0,
          id: 1,
        },
        {
          zilchCoinCount: 0,
          id: 2,
        },
      ]),
      {status: 200},
    ]);

    const page = render(<App />);
    const cards = await page.findAllByTestId('card');
    await waitFor(() => {
      expect(cards.length).toEqual(3);
    });
  });

  test('Coin count is reduced to zero when button is pressed', async () => {
    fetchMock.mockResponses(
      [
        JSON.stringify([
          {
            zilchCoinCount: 0,
            id: 0,
          },
          {
            zilchCoinCount: 0,
            id: 1,
          },
          {
            zilchCoinCount: 0,
            id: 2,
          },
        ]),
        {status: 200},
      ],
      [
        JSON.stringify({
          zilchCoinCount: 0,
          id: 0,
        }),
        {status: 200},
      ],
    );

    const page = render(<App />);
    const button = await page.findByTestId('button');
    fireEvent.press(button);
    const coinCountArray = await page.findAllByTestId('coinCount');
    await waitFor(() => {
      expect(coinCountArray[0].props.children).toEqual(0);
    });
  });
});
