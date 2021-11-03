import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native'
import RNPickerSelect from "react-native-picker-select"
import { Text,  View } from '../components/Themed'
import { RootStackScreenProps } from '../types'

import { Towns } from "../settings"

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [town, setTown] = React.useState(Towns[0].value)
  const [passwordVisibility, setPasswordVisibility] = React.useState(true)
  const [showTowns, setShowTowns] = React.useState(false)

  const testRef = React.useRef() as any

  const InputAccessoryView = () => {
    return (
      <View>
        <TextInput
            style={styles.input}
            value={town}
            placeholder="Select Town"
            onTouchEnd={() => setShowTowns(true)}
            onBlur={() => setShowTowns(false)}
          />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={passwordVisibility}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Confirm Password"
            secureTextEntry={passwordVisibility}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Street / House Number"
          />
        </View>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            textInputProps={{
              placeholder: "Select Town",
              placeholderTextColor: "#000000",
            }}
            placeholder={"This is a test"}
            items={Towns}
            onValueChange={value => {
              console.log(value)
              setTown(value)
            }}
            style={pickerSelectStyles}
            value={town}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Register")}
          >
            <Text style={styles.buttonText}>{"Register"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    backgroundColor: "#FFFFFF"
  },
  form: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF"
  },
  input: {
    height: 60,
    marginVertical: 12,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 20,
    fontWeight: "600",
    backgroundColor: "#FFFFFF"
  },
  buttonContainer: {
     width: "60%",
     height: 60,
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600"
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    // width: "100%"
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
    // width: "100%"
  },
});