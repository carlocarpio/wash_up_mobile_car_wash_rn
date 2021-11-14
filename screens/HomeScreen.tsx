import * as React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { RootStackScreenProps } from '../types'

import ServiceCard from "../components/Card"

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Available Services</Text>
      </View>
      <View style={styles.cardContainer}>
        <ServiceCard
          name="premuim car wash"
          color="rgba(245, 215, 66, 0.5)"
          priceColor="rgba(245, 215, 66, 1)"
          details={[
            "Hi-foam Wash Protection w/ Wax Booster Formula",
            "Wheel and Tire Cleaning w/ Moisturizing Tire Lotion",
            "Interior Vaccuum Cleaning",
            "Anti-Bac Protectant",
            "Back-to-Zero Disinfection",
          ]}
          prices={[
            {
              name: "sedan",
              price: "190"
            },
             {
              name: "suv",
              price: "220"
            },
             {
              name: "van",
              price: "250"
            }
          ]}
        />
      </View>
      <View style={styles.cardContainer}>
        <ServiceCard
          name="premuim car wax"
          color="rgba(66, 153, 245, 0.5)"
          priceColor="rgba(66, 153, 245, 1)"
          details={[
            "Cleaner Wax",
            "3 in 1 Protection w/ Carnauna Wax",
            "Crystal effects to improve clarity and repels water",
          ]}
          prices={[
            {
              name: "sedan",
              price: "500"
            },
             {
              name: "suv",
              price: "600"
            },
             {
              name: "van",
              price: "700"
            }
          ]}
        />
      </View>

      <View style={styles.cardContainer}>
        <ServiceCard
          name="premuim engine wash"
          color="rgba(122, 207, 140, 0.5)"
          priceColor="rgba(122, 207, 140, 1)"
          details={[
            "Waterless Engine",
            "Engine Shine Protect Dressing Application",
          ]}
          prices={[
            {
              name: "sedan",
              price: "220"
            },
             {
              name: "suv",
              price: "250"
            },
             {
              name: "van",
              price: "280"
            }
          ]}
        />
      </View>

      <View style={styles.cardContainer}>
        <ServiceCard
          name="premuim glass treatment"
          color="rgba(242, 102, 156, 0.5)"
          priceColor="rgba(242, 102, 156, 1)"
          details={[
            "Water Marks Removal",
            "Improve Glass Clarity",
            "Water Repellant Coating",
          ]}
          prices={[
            {
              name: "sedan",
              price: "700"
            },
             {
              name: "suv",
              price: "750"
            },
             {
              name: "van",
              price: "800"
            }
          ]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 60,
    paddingHorizontal: 20
  },
  cardContainer: {
    width: "100%",
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginVertical: 30
  }
})
