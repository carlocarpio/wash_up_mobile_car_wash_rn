import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import dateFnsFormat from 'date-fns/format'


import {

  TypeOfCarsValue,
  TypeOfServicesValue
} from "../settings"

interface iBookingCard {
  booking: any
}

export default function BookingCard({ booking }: iBookingCard) {


  return (
    <View style={[styles.container]}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{booking?.date !== undefined ? dateFnsFormat(booking?.date.toDate(), 'iiii - MMMM dd, yyyy') : ""}</Text>

      {booking?.cars && booking?.cars.map((car: any, index: number) => (
        <View style={styles.carServiceItem} key={Math.random()}>
          <View>
            <Text style={styles.carServiceNumber}>{index + 1}</Text>
          </View>
          <View style={styles.carServiceItemType}>
            <Text style={styles.carServiceItemName}>{TypeOfCarsValue[car.typeOfCar]}</Text>
            <Text style={styles.carServiceItemName}>{TypeOfServicesValue[Number(car.typeOfService)]}</Text>
          </View>
        </View>
      ))}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#CCCCCC",
    width: "100%",
    borderWidth: 2,
    padding: 20
  },
  carServiceItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10
  },
  carServiceNumber: {
    fontSize: 34,
    fontWeight: "700",
    marginRight: 15
  },
  carServiceItemType: {
    display: "flex"
  },
  carServiceItemName: {
    fontWeight: "700"
  }
})
