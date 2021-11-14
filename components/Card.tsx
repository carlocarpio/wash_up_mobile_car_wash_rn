import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

interface iServiceCard {
  name: string
  color: string
  details: string[]
  prices: {name: string, price: string}[]
  priceColor: string
}

export default function ServiceCard({ name, color, priceColor, details, prices }: iServiceCard) {
  return (
    <View style={[{...styles.container, backgroundColor: color || "#CCCCCC", borderColor: priceColor || "#FFFFFF"}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.detailContainer}>
        {details.map((detail, index) => {
          return (
            <Text key={detail} style={styles.detailItem}>{detail}</Text>
          )
        })}
      </View>
      <View style={[{...styles.pricesContainer, borderColor: priceColor || "#FFFFFF"}]}>
        {prices.map((priceDetail, index) => {
          return (
            <Text style={styles.priceItem} key={`${name}-${priceDetail.name}-${priceDetail.price}`}>{`${priceDetail.name} - ${priceDetail.price}`}</Text>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#CCCCCC",
    width: "100%",
    borderWidth: 2,
  },
  titleContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    marginBottom: 10,
    padding: 20,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "700"
  },
  detailContainer: {
    padding: 20,
  },
  detailItem: {
    lineHeight: 24,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  pricesContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  priceItem: {
    textTransform: "uppercase",
    fontWeight: "700",
    marginHorizontal: 5
  }
})
