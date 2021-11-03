import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { Text,  View } from '../components/Themed'
import { RootStackScreenProps } from '../types'

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [passwordVisibility, setPasswordVisibility] = React.useState(true)

  const goToRegisterView = () => {
    navigation.navigate("Register")
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Logo Placeholder</Text>
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
            inlineImageLeft='search_icon'
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Login")}
          >
            <Text style={styles.buttonText}>{"Login"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.info}>{`Don't have an account?`}</Text>
        <TouchableOpacity
          onPress={goToRegisterView}
        >
          <Text style={styles.registerLink}>{"Register an account."}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF"
  },
  form: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF"
  },
  title: {
    color: "#000000",
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
    fontWeight: "600"
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
  signupContainer: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    color: "#000000"
  },
  info: {
    color: "#000000"
  },
  registerLink: {
    color: "#270773",
    paddingLeft: 5
  }
})
