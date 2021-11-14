import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';

import { RootStackScreenProps } from '../types'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen({ navigation }: RootStackScreenProps<"Terms">) {
  return (
    <ScrollView style={styles.container}>
      <View>
      <View style={styles.section}>
        <Text style={styles.title}>
          Terms and Conditions of Service
        </Text>

        <Text>
          Please read the following terms carefully. This agreement contains warranty and liability disclaimer. By using this application, you accept and agree to the terms and conditions hereof without any modifications, additions or deletions.  You agree to abide by and be bound by the terms described herein and by all terms, policies and guidelines incorporated by reference as well as any additional terms and restrictions presented in relation to specific content or a service or feature offered by Wash Up Mobile Car Wash. 
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          Limitation of Liability
        </Text>

        <Text style={{ marginBottom: 10 }}>
          Washup Mobile Car Wash will not be liable for any loss or damage of personal belonging inside the car and within the premise of car wash.  It is solely the responsibility of the car’s owner to secure personal belongings.
        </Text>
        <Text>To the fullest extent permitted by law, you agree to release, defend, indemnify, and hold Washup Mobile Car Wash and its owner, and employees, harmless from and against any claims, liabilities, damages, losses of any personal belonging during the scheduled of our service. </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          Cancellation and Rescheduling of Booking
        </Text>

        <Text style={{ marginBottom: 10 }}>
          Customer may be able to cancel or postpone their reservation an hour before the scheduled booking by contacting Washup Mobile Car Wash.  In the event that, customer cancelled or change the scheduled booking upon arrival of the team at your house, customer should pay 40% of the amount of service booked.  
        </Text>
        <Text>Washup Mobile Car Wash has the right to reschedule bookings in the event that the weather doesn’t permit the team to proceed with the service requested. Customer will be offered with the available schedules and has the right to cancel their booking with no charge.</Text>
      </View>

      <View >
        <TouchableOpacity style={styles.accept} onPress={() => navigation.goBack()}>
          <Text style={styles.acceptLabel}>Accept</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF"
  },
  separator: {
    height: 1,
    width: '80%',
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    paddingBottom: 15
  },
  section: {
    marginHorizontal: 30,
    marginTop: 20,
    backgroundColor: "#FFFFFF"
  },
  accept: {
    backgroundColor: "#270773",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 30,
    borderRadius: 10
  },
  acceptLabel: {
    color: "#FFFFFF",
    fontSize: 20
  }
});
