import {client} from './client';

export interface CardInterface {
  id: number;
  zilchCoinCount: number;
}

export type AsyncStatus = 'IDLE' | 'PENDING' | 'RESOlVED' | 'REJECTED';

export const fetchAllCards = (): Promise<CardInterface[]> => {
  return client('cards', {method: 'GET'});
};

export const cashInCoins = (cardId: number): Promise<CardInterface> => {
  return client(`cards/${cardId}`, {
    method: 'PUT',
    body: JSON.stringify({zilchCoinCount: 0}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
