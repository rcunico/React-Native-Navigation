import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, Button, Platform, Image, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TextInput } from 'react-native-gesture-handler';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    const styles = StyleSheet.create({
      textStyle: {
        fontSize: 20,
        justifyContent: "center",
        marginTop: 50,
      },
      activityIndicatorStyle: {
        marginTop: 40
      },
      viewStyle: {
        flex: 1,
        alignItems: "center"
      }
    });
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Signing in, please wait...</Text>
        <ActivityIndicator style={styles.activityIndicatorStyle}/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('AuthLoading');
  };
}
 
  

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    

    return {
      title: "Log In Screen",
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('Info')}
          title="Info"
          color={Platform.OS === 'ios' ? '#fff' : null}
        />
      ),
      // headerRight: () => (
      //   <Button onPress={params.increaseCount} title="+1" color={Platform.OS === 'ios' ? "#fff" : null} />
      // ),
    };
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('AuthLoading');
  };

  render() {
    const styles = StyleSheet.create({
      textHeading: {
        fontSize: 20,
        marginBottom: 15,
      },
      textInput: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da',
        width: "65%",
        height: 40,
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
      },
      viewStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        flex: 1
      }
    });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.textHeading}>Log In Screen</Text>
        {/* <Text>Count: {this.state.count}</Text> */}
        
        <TextInput placeholder="Email address" style={styles.textInput}/>
        <TextInput placeholder="Password" secureTextEntry="true" style={styles.textInput}/>
        <View >
        <Button title="Log in" onPress={() => this.props.navigation.navigate('Details')}/>
        <Button title="Create a new account" onPress={() => this.props.navigation.navigate('SignUp')}/>
        <Button title="Sign in (async method)" onPress={this._signInAsync} />
        </View>
      </View>
    );
  }

  
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'Logged In Screen',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
        {/* <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
        <Button
          title="Change the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: 'Title changed!' })}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class SignUpScreen extends React.Component {
  render() {
    const styles = StyleSheet.create({
      textInput: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da',
        width: "65%",
        height: 40,
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
      },
        textHeading: {
          fontSize: 20,
          marginBottom: 15,
        },
      });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.textHeading}>Sign up for Food Track!</Text>
        <TextInput placeholder="First Name"  style={styles.textInput}/>
        <TextInput placeholder="Last Name"  style={styles.textInput}/>
        <TextInput placeholder="Email address"  style={styles.textInput}/>
        <TextInput placeholder="Date of Birth"  style={styles.textInput}/>
        <TextInput placeholder="Password" secureTextEntry="true" style={styles.textInput}/>
        <TextInput placeholder="Password (2)" secureTextEntry="true" style={styles.textInput}/>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

class InfoScreen extends React.Component {
  render() {
    const styles = StyleSheet.create({
      textInput: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da',
        width: "65%",
        height: 40,
        margin: 5,
      },
      textHeading: {
        fontSize: 20,
        marginBottom: 15,
      },
    });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.textHeading}>Info about the app!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Auth: {
      screen: SignInScreen,
    },
    AuthLoading: {
      screen: AuthLoadingScreen
  }},
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    Info: {
      screen: InfoScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
