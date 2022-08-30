import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  useWindowDimensions,
  UIManager,
  View,
} from "react-native";

const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  renderNoMoreCards,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
}) => {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (gesture.dx > swipeTreshold) {
          forceSwipe("right");
        } else if (gesture.dx < -swipeTreshold) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;
  const position = useRef(new Animated.ValueXY()).current;
  const swipeTreshold = 0.25 * width;

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data !== props.data) {
  //     setIndex(0);
  //   }
  // }

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  });

  const forceSwipe = (direction) => {
    const x = direction === "right" ? width : -width;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = data[index];

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setIndex((index) => index + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (index >= data.length) return renderNoMoreCards();

    return data
      .map((item, i) => {
        if (i < index) return null;

        if (i === index) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle, { width, zIndex: 99 }]}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={item.id}
            style={[
              styles.cardStyle,
              { width, top: 10 * (i - index), zIndex: 5 },
            ]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
  },
});

export default Deck;
