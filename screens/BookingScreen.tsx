import * as React from "react"
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, TextInput, Text } from "react-native"
import RNPickerSelect from "react-native-picker-select"
import { RootStackScreenProps } from '../types'

import {
  TypeOfCars,
  TypeOfServices,
  Towns,
} from "../settings"
 

type CarServiceType = {
  key: string
  typeOfCar: string
  typeOfService: string
}

export default function BookingScreen({ navigation }: RootStackScreenProps<"Booking">) {

  const [step, setStep] = React.useState(1)

  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [mobileNumber, setMobileNumber] = React.useState("")
  const [town, setTown] = React.useState(Towns[0].value)
  const [address, setAddress] = React.useState("")
  const [carType, setCarType] = React.useState("")
  const [serviceType, setServiceType] = React.useState("")

  const [inputs, setInputs] = React.useState<CarServiceType[]>([])
  const isCarLimit = inputs.length === 2

  const addHandler = ()=>{
    const _inputs = [...inputs];
    _inputs.push({key: '', typeOfCar: '', typeOfService: ""});
    setInputs(_inputs);
  }

  const inputTypeCarHandler = (text: any, key: any)=>{
    const _inputs = [...inputs]
    _inputs[key].key   = key
    _inputs[key].typeOfCar   = text
    setInputs(_inputs)
  }

  const inputTypeServiceHandler = (text: any, key: any)=>{
    const _inputs = [...inputs]
    _inputs[key].key   = key
    _inputs[key].typeOfService   = text
    setInputs(_inputs)
  }

  const RenderInputs = () => {
    return (
      <>
        {inputs.map((input, key)=>(
          <View style={styles.inputContainer} key={Math.random()}>
            <View>
              <Text style={styles.carNumber}>{`Car ${key + 1}`}</Text>
            </View>
            <View>
              <RNPickerSelect
                textInputProps={{
                  placeholder: "Type of Car",
                  placeholderTextColor: "#CCCCCC",
                }}
                placeholder={"Type of Car"}
                items={TypeOfCars}
                onValueChange={value => {
                  inputTypeCarHandler(value, key)
                }}
                style={pickerSelectStyles}
                value={inputs[key].typeOfCar}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View>
              <RNPickerSelect
                textInputProps={{
                  placeholder: "Type of Service",
                  placeholderTextColor: "#CCCCCC",
                }}
                placeholder={"Type of Service"}
                items={TypeOfServices}
                onValueChange={value => {
                  inputTypeServiceHandler(value, key)
                }}
                style={pickerSelectStyles}
                value={inputs[key].typeOfService}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </>
    )
  }

  const RenderStepOne = (): JSX.Element => {
    if (step !== 1) {
      return <View />
    }

    return (
      <>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="First Name"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Street / House Number"
          />
        </View>
        <View>
          <RNPickerSelect
            textInputProps={{
              placeholder: "Select Town",
              placeholderTextColor: "#CCCCCC",
            }}
            items={Towns}
            onValueChange={value => {
              setTown(value)
            }}
            style={pickerSelectStyles}
            value={town}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setMobileNumber}
            value={mobileNumber}
            keyboardType="numeric"
            placeholder="Mobile Number"
          />
        </View>
      </>
    )
  }

   const RenderStepTwo = (): JSX.Element => {
    if (step !== 2) {
      return <View />
    }

    if (inputs.length === 0) {
      return (
        <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", paddingTop: 50, paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 20, textAlign: "center", lineHeight: 30 }}>{`Click Add Car to continue with the booking process.`}</Text>
        </View>
      )
    }

    return (
      <View>
        {RenderInputs()}
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      <View style={styles.step}>
        <Text style={styles.stepTitle}>{`Step ${step}`}</Text>
        {step === 2
          ?
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={isCarLimit ? styles.buttonDisabled : styles.button}
              onPress={addHandler}
              disabled={ isCarLimit }
            >
              <Text style={styles.buttonText}>{"Add Car"}</Text>
            </TouchableOpacity>
          </View>
          :
          <View />
        }
      </View>
      <View style={styles.container}>
        <ScrollView>
          <RenderStepOne />
          <RenderStepTwo />
        </ScrollView>
      </View>

      <View style={styles.buttonGroup}>
        {step !== 1 ?
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => setStep(step !== 1 ? step - 1 : step)}
            >
              <Text style={styles.buttonBackText}>{"Back"}</Text>
            </TouchableOpacity>
          </View>
          : <View />}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStep(step !== 2 ? step + 1 : step)}
          >
            <Text style={styles.buttonText}>{"Next"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  container: {
    flex: 7,
    backgroundColor: "#FFFFFF",
    paddingTop: 20
  },
  step: {
    flex: 1,
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#CCCCCC"
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "700"
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  input: {
    height: 60,
    marginVertical: 12,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 20,
    fontWeight: "600"
  },
  buttonGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 24,
  },
  buttonContainer: {
    flex: 1,
    maxWidth: "30%",
    height: 40,
    marginVertical: 12,
    borderRadius: 8,
    overflow: "hidden"
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#270773",
    width: "100%",
    height: "100%",
  },
  buttonDisabled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCCCCC",
    width: "100%",
    height: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600"
  },
   buttonBack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCCCCC",
    width: "100%",
    height: "100%",
  },
  buttonBackText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600"
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 10,
    marginBottom: 20
  },
  carNumber: {
    marginHorizontal: 24,
    fontSize: 18,
    fontWeight: "700"
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    marginVertical: 12,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 20,
    fontWeight: "600",
    backgroundColor: "#FFFFFF",
    color: "#000000"
  },
  inputAndroid: {
    height: 60,
    marginVertical: 12,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 20,
    fontWeight: "600",
    backgroundColor: "#FFFFFF",
    color: "#000000"
  },
}); 