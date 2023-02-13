import { NativeModules, Platform } from 'react-native';
import axios from 'axios';

const LINKING_ERROR =
  `The package 'openpath-reactnative' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const OpenpathReactnative = NativeModules.OpenpathReactnative
  ? NativeModules.OpenpathReactnative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const BASE_URL = 'https://api.openpath.com';
let orgId: number | null = null;
let userId: number | null = null;
let mobileCredentialId: number | null = null;
let bearerToken: string | number | boolean | null = null;

export async function init() {
  if (Platform.OS === 'ios') {
    return 'Openpath iOS is already initialized by default';
  } else {
    const initResponse = await OpenpathReactnative.openpathInit();

    return initResponse;
  }
}

export async function login(
  email: string,
  password: string,
  forMobileLogin: boolean
) {
  const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
    forMobileLogin,
  });

  orgId = loginResponse.data.data.tokenScopeList[0].org.id;
  userId = loginResponse.data.data.tokenScopeList[0].user.id;
  bearerToken = `Bearer ${loginResponse.data.data.token}`;

  return loginResponse.data.data;
}

export async function getMobileCredential() {
  const getMobileCredentialResponse = await axios.get(
    `${BASE_URL}/orgs/${orgId}/users/${userId}/credentials`,
    {
      headers: {
        Authorization: bearerToken!,
      },
    }
  );

  const mobileCredentials = getMobileCredentialResponse.data.data.filter(
    (item: any) => item.credentialType.modelName === 'mobile'
  );

  if (mobileCredentials.length > 0) {
    mobileCredentialId = mobileCredentials[0].id;
  }

  return getMobileCredentialResponse.data.data;
}

export async function getSetupMobileToken() {
  const getSetupMobileTokenResponse = await axios.post(
    `${BASE_URL}/orgs/${orgId}/users/${userId}/credentials/${mobileCredentialId}/generateSetupMobileToken`,
    null,
    {
      headers: {
        Authorization: bearerToken!,
      },
    }
  );

  return getSetupMobileTokenResponse.data?.data?.setupMobileToken;
}

export async function provision(setupMobileToken: string) {
  const provisionResponse = await OpenpathReactnative.openpathProvision(
    setupMobileToken
  );

  const returnedProvisionResponse =
    typeof provisionResponse === 'string'
      ? JSON.parse(provisionResponse)
      : provisionResponse;

  return returnedProvisionResponse;
}

export async function switchUser(userOpal: string) {
  const switchUserResponse = await OpenpathReactnative.openpathSwitchUser(
    userOpal
  );

  const returnedSwitchUserResponse =
    typeof switchUserResponse === 'string'
      ? JSON.parse(switchUserResponse)
      : switchUserResponse;

  return returnedSwitchUserResponse;
}

export async function syncUser() {
  const syncUserResponse = await OpenpathReactnative.openpathSyncUser();

  const returnedSyncUserResponse =
    typeof syncUserResponse === 'string'
      ? JSON.parse(syncUserResponse)
      : syncUserResponse;

  return returnedSyncUserResponse;
}

export async function unlock(
  itemType: string,
  itemId: number,
  requestId: number,
  timeoutLong: number
) {
  const unlockResponse = await OpenpathReactnative.openPathUnlock(
    itemType,
    itemId,
    requestId,
    timeoutLong
  );

  const returnedUnlockResponse =
    typeof unlockResponse === 'string'
      ? JSON.parse(unlockResponse)
      : unlockResponse;

  return returnedUnlockResponse;
}

export async function getErrors() {
  const getErrorsResponse = await OpenpathReactnative.openpathGetErrors();

  const returnedGetErrorsResponse =
    typeof getErrorsResponse === 'string'
      ? JSON.parse(getErrorsResponse)
      : getErrorsResponse;

  return returnedGetErrorsResponse;
}

export async function requestAuthorization(type: string) {
  const requestAuthorizationResponse =
    await OpenpathReactnative.openpathRequestAuthorization(type);

  return requestAuthorizationResponse;
}

export async function getAuthorizationStatuses() {
  const getAuthorizationStatusesResponse =
    await OpenpathReactnative.openpathGetAuthorizationStatuses();

  const returnedGetAuthorizationStatusesResponse =
    typeof getAuthorizationStatusesResponse === 'string'
      ? JSON.parse(getAuthorizationStatusesResponse)
      : getAuthorizationStatusesResponse;

  return returnedGetAuthorizationStatusesResponse;
}

export async function getReadersInRange(rssiThreshold: number) {
  const getReadersInRangeResponse =
    await OpenpathReactnative.openpathGetReadersInRange(rssiThreshold);

  const returnedGetReadersInRangeResponse =
    typeof getReadersInRangeResponse === 'string'
      ? JSON.parse(getReadersInRangeResponse)
      : getReadersInRangeResponse;

  return returnedGetReadersInRangeResponse;
}

export async function getUserApiToken(userOpal: string) {
  const getUserApiTokenResponse =
    await OpenpathReactnative.openpathGetUserApiToken(userOpal);

  return getUserApiTokenResponse;
}

export async function enableErrorNotificationsForItem(
  enabled: boolean,
  itemType: string,
  itemId: number
) {
  const enableErrorNotificationsForItemResponse =
    await OpenpathReactnative.openPathEnableErrorNotificationsForItem(
      enabled,
      itemType,
      itemId
    );

  const returnedGetReadersInRangeResponse =
    typeof enableErrorNotificationsForItemResponse === 'string'
      ? JSON.parse(enableErrorNotificationsForItemResponse)
      : enableErrorNotificationsForItemResponse;

  return returnedGetReadersInRangeResponse;
}
