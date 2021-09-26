import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ViewToken,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {AsyncStatus, CardInterface} from '../api';
import Card from './Card';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

interface CardSliderProps {
  cards: CardInterface[];
  setCurrentCard: React.Dispatch<React.SetStateAction<CardInterface | null>>;
  asyncStatus: AsyncStatus;
}

const CardSlider = ({cards, setCurrentCard, asyncStatus}: CardSliderProps) => {
  const viewabilityConfig = React.useRef({
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 1,
  });

  const onViewableItemsChanged = React.useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems) {
        setCurrentCard(viewableItems[0].item);
      }
    },
  );

  return (
    <FlatList
      horizontal
      data={cards}
      snapToInterval={SCREEN_WIDTH}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      scrollEnabled={asyncStatus !== 'PENDING'}
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.textContainer}>
              <Text testID="coinCount" style={styles.text}>
                {item.zilchCoinCount}
              </Text>
            </View>
            <Card card={item.id} />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: SCREEN_HEIGHT / 6,
  },
  text: {
    fontSize: 40,
  },
});

export default CardSlider;
