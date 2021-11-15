import * as React from "react"
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView
} from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import dateFnsFormat from 'date-fns/format'
import { RootTabScreenProps } from '../types'

import { firebaseStore, firebaseAuth } from "../firebase/config"

import BookingCard from "../components/BookingCard"

type BookingType = {
  name: string
  mobile: string
  town: string
  address: string
  date: string
  time: string
  recurring: string
  recurrences: string
  cars: string
  userID: string
}

export default function MyBookingScreen({ navigation }: RootTabScreenProps<"Booking">) {
  const [bookings, setBookings] = React.useState<any>([])

  const q = firebaseStore.query(firebaseStore.collection(firebaseStore.db, "bookings"), firebaseStore.where("userID", "==", firebaseAuth.getAuth().currentUser?.uid))



  React.useEffect(() => {
    const getBookings = firebaseStore.onSnapshot(q, (querySnapshot) => {
      const bookingsArray: BookingType[] = [];
      querySnapshot.forEach((doc) => {
        bookingsArray.push(doc.data() as BookingType)
      })
      // setBookings((previousBookings: any) => [...previousBookings, ...bookingsArray])
      setBookings(bookingsArray)
    })

    return () => getBookings()
  }, [])


 React.useEffect(() => {
    const unsubscribe = firebaseStore.onSnapshot(q, (querySnapshot) => {
      const bookingFirestore = querySnapshot.docChanges().map(({ doc }) => {
        const booking = doc.data()
        return booking
      })

      // console.log(bookingFirestore, `1111`)

     setBookings((previousBookings: any) => [...previousBookings, bookingFirestore])
    })

    return () => unsubscribe()
  },[])

  return (
    <ScrollView style={styles.wrapper}>
      <View>
        {bookings?.map((booking: any, index: number) => {
          console.log(booking.date, `booking`)

          if (booking.date === undefined) {
            return
          }

          return (
            <View style={{ marginBottom: 10 }}>
              <BookingCard booking={booking} />
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20
  },
})