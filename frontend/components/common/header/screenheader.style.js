import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  TouchableOpacityStyle: {
  //Here is the trick
  position: 'absolute',
  width: 50,
  height: 80,
  alignItems: 'center',
  justifyContent: 'center',
  right: 20,
  bottom: 30,
  }
});

export default styles;
