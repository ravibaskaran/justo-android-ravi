import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ViewMoreText = ({
  text = "",
  numberOfLines = 2,
  textStyle = {},
  toggleStyle = {},
  notFoundText = "Not Found",
}) => {
  const [showMore, setShowMore] = useState(false);

  if (!text || text.trim() === "") {
    return <Text style={textStyle}>{notFoundText}</Text>;
  }

  const toggleText = showMore ? "View Less" : "View More";

  return (
    <View>
      <Text
        style={textStyle}
        numberOfLines={showMore ? 0 : numberOfLines}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
      {text.length > 80 && (
        <TouchableOpacity
          style={styles.alignRight}
          onPress={() => setShowMore(!showMore)}
        >
          <Text style={styles.viewMoreText}>{toggleText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewMoreText: {
    color: "#007AFF",
    fontSize: 12,
  },
  alignRight: {
    alignSelf: "flex-end",
    marginTop: 4,
  },
});

export default ViewMoreText;
