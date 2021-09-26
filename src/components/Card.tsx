import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
export const assets = [
  require('../assets/card1.png'),
  require('../assets/card2.png'),
  require('../assets/card3.png'),
];

export enum Cards {
  Card1 = 0,
  Card2 = 1,
  Card3 = 2,
}

interface CardProps {
  card: Cards;
}

const Card = ({card}: CardProps) => {
  return <Image testID="card" style={styles.card} source={assets[card]} />;
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
  },
});

export default Card;
