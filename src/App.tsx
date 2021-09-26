import * as React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import StyleGuide from './theme/StyleGuide';
import Button from './components/Button';
import {CardInterface, fetchAllCards, cashInCoins, AsyncStatus} from './api';
import CardSlider from './components/CardSlider';

const App = () => {
  const [cards, setCards] = React.useState<CardInterface[]>([]);
  const [currentCard, setCurrentCard] = React.useState<CardInterface | null>(
    null,
  );
  const [fetchCardsAsyncStatus, setFetchCardsAsyncStatus] =
    React.useState<AsyncStatus>('IDLE');

  const [cashInCoinsAsyncStatus, setcashInCoinsAsyncStatus] =
    React.useState<AsyncStatus>('IDLE');

  React.useEffect(() => {
    setFetchCardsAsyncStatus('PENDING');
    fetchAllCards()
      .then(cardData => {
        setCards(cardData);
        setCurrentCard(cardData[0]);
        // fake lagging connection
        setTimeout(() => {
          setFetchCardsAsyncStatus('RESOlVED');
        }, 1000);
      })
      .catch(error => {
        setFetchCardsAsyncStatus('REJECTED');
        console.error(error);
      });
  }, []);

  const handleOnPress = () => {
    if (!currentCard) {
      return;
    }
    setcashInCoinsAsyncStatus('PENDING');
    cashInCoins(currentCard.id)
      .then(newCardData => {
        const newCards = cards.map(card => {
          if (card.id === currentCard.id) {
            return newCardData;
          } else {
            return card;
          }
        });
        setCards(newCards);
        // fake lagging connection
        setTimeout(() => {
          setcashInCoinsAsyncStatus('RESOlVED');
        }, 1000);
      })
      .catch(error => {
        setcashInCoinsAsyncStatus('REJECTED');
        console.error(error);
      });
  };

  if (fetchCardsAsyncStatus === 'PENDING') {
    return <ActivityIndicator style={styles.activityIndicator} />;
  }

  if (fetchCardsAsyncStatus !== 'IDLE' && !cards.length) {
    return (
      <View style={styles.reminderScreen}>
        <Text style={styles.reminderText}>
          Don't forget to start the server!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cards.length > 0 && (
        <CardSlider
          cards={cards}
          setCurrentCard={setCurrentCard}
          asyncStatus={cashInCoinsAsyncStatus}
        />
      )}
      <Button
        text={'Cash in card!'}
        isLoading={cashInCoinsAsyncStatus === 'PENDING'}
        onPress={handleOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  reminderText: {
    fontSize: 40,
    textAlign: 'center',
  },
  reminderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
