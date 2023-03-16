import {
  init as openpathInit,
  provision as openpathProvision,
  login as openpathLogin,
  getMobileCredential as openpathGetMobileCredential,
  switchUser as openpathSwitchUser,
  syncUser as openpathSyncUser,
  getErrors as openpathGetErrors,
  requestAuthorization as openpathRequestAuthorization,
  getAuthorizationStatuses as openpathGetAuthorizationStatuses,
  getReadersInRange as openpathGetReadersInRange,
  getUserApiToken as openpathGetUserApiToken,
  openpathEventEmitter,
  OPENPATH_EVENT_NAMES,
} from 'openpath-reactnative';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

const App = () => {
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isSwitchingUser, setIsSwitchingUser] = useState(false);
  const [isSyncingUser, setIsSyncingUser] = useState(false);
  const [isGettingErrorsLog, setIsGettingErrorsLog] = useState(false);
  const [isGettingAuthorization, setIsGettingAuthorization] = useState(false);
  const [isGettingAuthorizationStatuses, setIsGettingAuthorizationStatuses] =
    useState(false);
  const [isGettingReadersInRange, setIsGettingReadersInRange] = useState(false);
  const [isGettingUserApiToken, setIsGettingUserApiToken] = useState(false);

  const startOpenpath = async () => {
    openpathEventEmitter.addListener(OPENPATH_EVENT_NAMES.ON_INIT, (e) => {
      console.log('From event emitter onProvisionResponse ios', e);
    });

    await openpathInit();

    await openpathLogin('account@email.com', 'yourPassword', true);
    await openpathGetMobileCredential();
  };

  useEffect(() => {
    startOpenpath();
  }, []);

  const prettifyResponse = (response: any) => {
    return JSON.stringify(response, null, 2);
  };

  const provision = async () => {
    setIsProvisioning(true);

    const response = await openpathProvision('');

    setIsProvisioning(false);

    console.log(
      `Openpath ${Platform.OS} provision:\n${prettifyResponse(response)}`
    );
  };

  const switchUser = async () => {
    setIsSwitchingUser(true);

    const response = await openpathSwitchUser('yourUserOpal');

    setIsSwitchingUser(false);

    console.log(
      `Openpath ${Platform.OS} switch user:\n${prettifyResponse(response)}`
    );
  };

  const syncUser = async () => {
    setIsSyncingUser(true);

    const response = await openpathSyncUser();

    setIsSyncingUser(false);

    console.log(
      `Openpath ${Platform.OS} sync user:\n${prettifyResponse(response)}`
    );
  };

  const getErrors = async () => {
    setIsGettingErrorsLog(true);

    const response = await openpathGetErrors();

    setIsGettingErrorsLog(false);

    console.log(
      `Openpath ${Platform.OS} get errors:\n${prettifyResponse(response)}`
    );
  };

  const requestAuthorization = async () => {
    setIsGettingAuthorization(true);

    const response = await openpathRequestAuthorization('location');

    setIsGettingAuthorization(false);

    console.log(
      `Openpath ${Platform.OS} request authorization:\n${prettifyResponse(
        response
      )}`
    );
  };

  const getAuthorizationStatuses = async () => {
    setIsGettingAuthorizationStatuses(true);

    const response = await openpathGetAuthorizationStatuses();

    setIsGettingAuthorizationStatuses(false);

    console.log(
      `Openpath ${Platform.OS} get authorization statuses:\n${prettifyResponse(
        response
      )}`
    );
  };

  const getReadersInRange = async () => {
    setIsGettingReadersInRange(true);

    const response = await openpathGetReadersInRange(100);

    setIsGettingReadersInRange(false);

    console.log(
      `Openpath ${Platform.OS} get readers in range:\n${prettifyResponse(
        response
      )}`
    );
  };

  const getUserApiToken = async () => {
    setIsGettingUserApiToken(true);

    const response = await openpathGetUserApiToken('userOpal');

    setIsGettingUserApiToken(false);

    console.log(
      `Openpath ${Platform.OS} get user api token:\n${prettifyResponse(
        response
      )}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {`React Native 0.70.4\nOpenpath Integration`}
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <Pressable
          disabled={isSwitchingUser}
          onPress={switchUser}
          style={styles.button}
        >
          {isSwitchingUser ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Switch User</Text>
        </Pressable>

        <Pressable
          disabled={isProvisioning}
          onPress={provision}
          style={styles.button}
        >
          {isProvisioning ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Provision</Text>
        </Pressable>

        <Pressable
          disabled={isSyncingUser}
          onPress={syncUser}
          style={styles.button}
        >
          {isSyncingUser ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Sync User</Text>
        </Pressable>

        <Pressable
          disabled={isGettingErrorsLog}
          onPress={getErrors}
          style={styles.button}
        >
          {isGettingErrorsLog ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Get Errors</Text>
        </Pressable>

        <Pressable
          disabled={isGettingAuthorization}
          onPress={requestAuthorization}
          style={styles.button}
        >
          {isGettingAuthorization ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Request Authorization</Text>
        </Pressable>

        <Pressable
          disabled={isGettingAuthorizationStatuses}
          onPress={getAuthorizationStatuses}
          style={styles.button}
        >
          {isGettingAuthorizationStatuses ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Get Authorization Statuses</Text>
        </Pressable>

        <Pressable
          disabled={isGettingReadersInRange}
          onPress={getReadersInRange}
          style={styles.button}
        >
          {isGettingReadersInRange ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Get Readers In Range</Text>
        </Pressable>

        <Pressable
          disabled={isGettingUserApiToken}
          onPress={getUserApiToken}
          style={styles.button}
        >
          {isGettingUserApiToken ? (
            <ActivityIndicator
              color="white"
              size="large"
              style={styles.buttonActivityIndicator}
            />
          ) : null}
          <Text style={styles.buttonLabel}>Get User Api Token</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gainsboro',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 40,
  },
  button: {
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 20,
    padding: 15,
    width: 300,
    backgroundColor: 'forestgreen',
    justifyContent: 'center',
  },
  buttonActivityIndicator: {
    marginRight: 10,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
