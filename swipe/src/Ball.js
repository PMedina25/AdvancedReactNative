import React, { useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

const Ball = ({ position }) => {
  useEffect(() => {
    position = new Animated.ValueXY(0, 0);
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
    }).start();
  }, [position]);

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black",
  },
});

export default Ball;
