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
  const [bookings, setBookings] = React.useState<BookingType[]>([])

  // const bookingsRef = firebaseStore.collection(firebaseStore.db, "bookings")
  // const q = firebaseStore.query(bookingsRef, firebaseStore.where("userID", "==", firebaseAuth.getAuth().currentUser?.uid))

  const q = firebaseStore.query(firebaseStore.collection(firebaseStore.db, "bookings"), firebaseStore.where("userID", "==", firebaseAuth.getAuth().currentUser?.uid))

  const test: BookingType[] = [] 

  const getBookings = async () => {
    const querySnapshot = await firebaseStore.getDocs(q) 
    querySnapshot.forEach((doc) => {
      test.push(doc.data() as BookingType)
    })
    
  }

  firebaseStore.onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      return test.push(doc.data() as BookingType);
    })
  })

  React.useEffect(() => {
    getBookings()
  },[])

 React.useEffect(() => {
    // setBookings(test)
    console.log(test, `test`)
  },[test])
  
  return (
    <ScrollView style={styles.wrapper}>
      <View>
        {test?.map((booking) => (
          <View style={{ marginBottom: 10 }}>
            <BookingCard booking={booking} />
          </View>
        ))}
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