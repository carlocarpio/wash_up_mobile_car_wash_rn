import * as React from "react"
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from "react-native"
import Checkbox from 'expo-checkbox'
import uuid from 'react-native-uuid'
import RNPickerSelect from "react-native-picker-select"
import DateTimePicker from '@react-native-community/datetimepicker'
import dateFnsFormat from 'date-fns/format'
import { RootTabScreenProps } from '../types'

import { firebaseStore, firebaseAuth } from "../firebase/config"

import {
  TypeOfCars,
  TypeOfServices,
  Towns,
  BookingTime,
  NumberOFRecurrences,
  TypeOfCarsValue,
  TypeOfServicesValue
} from "../settings"
 

type CarServiceType = {
  key: string | null
  typeOfCar: string | null
  typeOfService: string | null
}

export default function BookingScreen({ navigation }: RootTabScreenProps<"Booking">) {

  const [step, setStep] = React.useState(1)

  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [mobileNumber, setMobileNumber] = React.useState("")
  const [town, setTown] = React.useState(Towns[0].value)
  const [address, setAddress] = React.useState("")
  const [date, setDate] = React.useState(new Date())
  const [show, setShow] = React.useState(false)
  const [acceptTerms, setTerms] = React.useState(false)
  const [recurring, setRecurring] = React.useState(false)
  const [recurrences, setRecurrences] = React.useState(null)
  const [time, setTime] = React.useState("")
  const [isSubmitting, setSubmitting] = React.useState(false)

  const [inputs, setInputs] = React.useState<CarServiceType[]>([])
  const isCarLimit = inputs.length === 8

  const isStepOneValid = firstName !== "" && lastName !== "" && mobileNumber !== "" && town !== "" && address !== ""
  const isStepTwoValid = inputs.length !== 0 && Object.values(inputs).every(x => (x.typeOfService !== null && x.typeOfCar !== null))
  const isStepThreeValidRecurring = date !== null && time !== "" && acceptTerms && recurrences !== null
  const isStepThreeValidNotRecurring = date !== null && time !== "" && acceptTerms
  const isStepThreeValid = recurring ? isStepThreeValidRecurring : isStepThreeValidNotRecurring

  const reset = () => {
    setFirstName("")
    setLastName("")
    setMobileNumber("")
    setTown(Towns[0].value)
    setAddress("")
    setDate(new Date())
    setTerms(false)
    setRecurring(false)
    setRecurrences(null)
    setTime("")
    setSubmitting(false)
    setInputs([])
    setStep(1)
  }

  const submitBooking = async () => {
    setSubmitting(true)

    await firebaseStore.setDoc(firebaseStore.doc(firebaseStore.db, "bookings", String(uuid.v4())), {
      name: `${firstName} ${lastName}`,
      mobile: mobileNumber,
      town: town,
      address: address,
      date: date,
      time: time,
      recurring: recurring,
      recurrences: recurrences,
      cars: inputs,
      userID: firebaseAuth.getAuth().currentUser?.uid
    }).then((data: any) => {
      setSubmitting(false)
      reset()
      navigation.navigate("MyBookings")
    }).catch((error) => {
      setSubmitting(false)
    })
  }

  const addHandler = ()=>{
    const _inputs = [...inputs];
    _inputs.push({key: null, typeOfCar: null, typeOfService: null});
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

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(false)
    setDate(currentDate)
  }

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true)
  }

  const showDatepicker = () => {
    showMode('date')
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
                key={Math.random()}
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
                key={Math.random()}
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

  const RenderStepOne = () => {
    if (step !== 1) {
      return <View />
    }

    return (
      <>
        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setFirstName(text)}
            value={firstName}
            placeholder="First Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            // onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
            onChangeText={v => setLastName(v)}
            onEndEditing={() => setLastName(lastName)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Address</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Street / House Number"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Town</Text>
          <RNPickerSelect
            key={Math.random()}
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
        <View style={styles.inputContainer}>
          <Text>Mobile Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMobileNumber}
            value={mobileNumber}
            keyboardType="numeric"
            placeholder="Mobile Number"
          />
        </View>

        <View style={[{...styles.buttonGroup, justifyContent: "flex-end"}]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[{...styles.button, backgroundColor: !isStepOneValid ? "#CCCCCC" : "#270773"}]}
              onPress={() =>  setStep(2)}
              disabled={!isStepOneValid}
            >
              <Text style={styles.buttonText}>{"Next"}</Text>
            </TouchableOpacity>
          </View>
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
          <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => setStep(1)}
            >
              <Text style={styles.buttonBackText}>{"Back"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      )
    }

    return (
      <View>
        {RenderInputs()}

        <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => setStep(1)}
            >
              <Text style={styles.buttonBackText}>{"Back"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[{...styles.button, backgroundColor: !isStepTwoValid ? "#CCCCCC" : "#270773"}]}
              onPress={() => setStep(3)}
            >
              <Text style={styles.buttonText}>{"Next"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const RenderStepThree = (): JSX.Element => {
    if (step !== 3) {
      return <View />
    }

    return (
      <View>
        <View style={styles.inputContainer}>
          <Text>Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={showDatepicker}
          >
            <Text>{dateFnsFormat(date, 'iiii - MMMM dd, yyyy')}</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.inputContainer}>
          <Text>Time</Text>
          <RNPickerSelect
            key={Math.random()}
            textInputProps={{
              placeholder: "Select Time",
              placeholderTextColor: "#CCCCCC",
            }}
            placeholder={"Select Time"}
            items={BookingTime}
            onValueChange={value => {
              setTime(value)
            }}
            style={pickerSelectStyles}
            value={time}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        {recurring &&
          <View style={styles.inputContainer}>
            <Text>Number of Recurrences</Text>
            <RNPickerSelect
              key={Math.random()}
              textInputProps={{
                placeholder: "Select Number of Recurrences",
                placeholderTextColor: "#CCCCCC",
              }}
              placeholder={"Select Number of Recurrences"}
              items={NumberOFRecurrences}
              onValueChange={value => {
                setRecurrences(value)
              }}
              style={pickerSelectStyles}
              value={recurrences}
              useNativeAndroidPickerStyle={false}
            />
          </View>}

        <View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={recurring}
              onValueChange={() => setRecurring(!recurring)}
              style={styles.checkbox}
            />
            <TouchableOpacity onPress={() => setRecurring(!recurring)}>
              <Text style={styles.label}>Recurring?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={acceptTerms}
              onValueChange={() => setTerms(!acceptTerms)}
              style={styles.checkbox}
            />
            
              <View style={styles.label}>
                <Text>Accept</Text>
                 <TouchableOpacity onPress={() => navigation.navigate('Terms')}><Text style={styles.labelTerms}>Terms and conditions</Text></TouchableOpacity>
              </View>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => setStep(2)}
            >
              <Text style={styles.buttonBackText}>{"Back"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[{...styles.button, backgroundColor: !isStepThreeValid ? "#CCCCCC" : "#270773"}]}
              onPress={() => setStep(4)}
            >
              <Text style={styles.buttonText}>{"Next"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChange}
              maximumDate={new Date(new Date().getFullYear(), 11, 30)}
              minimumDate={new Date()}
            />
          )}
        </View>
      </View>
    )
  }

  const RenderStepFour = (): JSX.Element => {
    if (step !== 4) {
      return <View />
    }

    return (
      <View>
        <View style={styles.sectionSummary}>
          <Text style={[styles.sectionInfo, styles.carServiceItemName]}>{`${firstName} ${lastName}`}</Text>
          <Text style={[styles.sectionInfo, styles.carServiceItemName]}>{`${address}, ${town}, S.T.B`}</Text>
          <Text style={[styles.sectionInfo, styles.carServiceItemName]}>{`${mobileNumber}`}</Text>
        </View>

         <View style={styles.sectionSummary}>
          {inputs.map((carService, index) => {
            return (
              <View style={styles.carServiceItem} key={Math.random()}>
                <View>
                  <Text style={styles.carServiceNumber}>{index + 1}</Text>
                </View>
                <View style={styles.carServiceItemType}>
                  <Text style={styles.carServiceItemName}>{TypeOfCarsValue[carService.typeOfCar]}</Text>
                  <Text style={styles.carServiceItemName}>{TypeOfServicesValue[Number(carService.typeOfService)]}</Text>
                </View>
              </View>
            )
          })}
        </View>

         <View style={styles.sectionSummary}>
          <Text style={[{...styles.sectionInfo, ...styles.carServiceItemName, textTransform: "uppercase"}]}>{`Date: ${dateFnsFormat(date, 'iiii - MMMM dd, yyyy')}`}</Text>
          <Text style={[{...styles.sectionInfo, ...styles.carServiceItemName, textTransform: "uppercase"}]}>{`Time: ${time}`}</Text>
          {recurring && <Text style={[styles.sectionInfo, styles.carServiceItemName]}>{`Number of Recurrences: ${recurrences}`}</Text>}
        </View>

        <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => setStep(3)}
            >
              <Text style={styles.buttonBackText}>{"Back"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[{...styles.button, backgroundColor: !isStepThreeValid ? "#CCCCCC" : "#270773"}]}
              disabled={isSubmitting}
              onPress={() => submitBooking()}
            >
              <Text style={styles.buttonText}>{"Book"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }


  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      <View style={styles.step}>
       {step === 4 ?  <Text style={styles.stepTitle}>{`Summary`}</Text> :  <Text style={styles.stepTitle}>{`Step ${step}`}</Text>}
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
          <View>{RenderStepOne()}</View>
          <View>{RenderStepTwo()}</View>
          <View>{RenderStepThree()}</View>
          <View>{RenderStepFour()}</View>
        </ScrollView>
      </View>

      {/* <View style={styles.buttonGroup}>
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
            onPress={() => setStep(step !== 4 ? step + 1 : step)}
          >
            <Text style={styles.buttonText}>{"Next"}</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#FFFFFF",
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
    fontSize: 18,
    fontWeight: "700"
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
  },
  input: {
    height: 60,
    marginVertical: 12,
    
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
    fontSize: 18,
    fontWeight: "700"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    marginHorizontal: 24
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  },
  labelTerms: {
    // paddingTop: 10
    paddingLeft: 5,
    color: "#270773",
    fontWeight: "700"
  },
  sectionSummary: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingBottom: 20,
    marginTop: 20,
    marginHorizontal: 24
  },
  sectionInfo: {
    paddingVertical: 10
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    marginVertical: 12,
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
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 20,
    fontWeight: "600",
    backgroundColor: "#FFFFFF",
    color: "#000000"
  },
}); 