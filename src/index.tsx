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
    const initResponse = await OpenpathReactnative.openpathInit().catch(
      (e: any) => console.error(`Openpath init error : ${JSON.stringify(e)}`)
    );

    return initResponse;
  }
}

export async function login(
  email: string,
  password: string,
  forMobileLogin: boolean
) {
  const loginResponse = await axios
    .post(`${BASE_URL}/auth/login`, {
      email,
      password,
      forMobileLogin,
    })
    .catch((e: any) =>
      console.error(`Openpath login error : ${JSON.stringify(e)}`)
    );

  orgId = loginResponse?.data?.data?.tokenScopeList[0]?.org?.id;
  userId = loginResponse?.data?.data?.tokenScopeList[0]?.user?.id;
  bearerToken = `Bearer ${loginResponse?.data?.data?.token}`;

  return loginResponse?.data?.data;
}

export async function getMobileCredential() {
  const getMobileCredentialResponse = await axios
    .get(`${BASE_URL}/orgs/${orgId}/users/${userId}/credentials`, {
      headers: {
        Authorization: bearerToken!,
      },
    })
    .catch((e: any) =>
      console.error(`Openpath getMobileCredential error : ${JSON.stringify(e)}`)
    );

  const mobileCredentials = getMobileCredentialResponse?.data?.data?.filter(
    (item: any) => item.credentialType.modelName === 'mobile'
  );

  if (mobileCredentials.length > 0) {
    mobileCredentialId = mobileCredentials[0].id;
  }

  return getMobileCredentialResponse?.data?.data;
}

export async function getSetupMobileToken() {
  const getSetupMobileTokenResponse = await axios
    .post(
      `${BASE_URL}/orgs/${orgId}/users/${userId}/credentials/${mobileCredentialId}/generateSetupMobileToken`,
      null,
      {
        headers: {
          Authorization: bearerToken!,
        },
      }
    )
    .catch((e: any) =>
      console.error(`Openpath getSetupMobileToken error : ${JSON.stringify(e)}`)
    );

  return getSetupMobileTokenResponse?.data?.data?.setupMobileToken;
}

export async function provision(setupMobileToken: string) {
  const provisionResponse = await OpenpathReactnative.openpathProvision(
    setupMobileToken
  ).catch((e: any) =>
    console.error(`Openpath provision error : ${JSON.stringify(e)}`)
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
  ).catch((e: any) =>
    console.error(`Openpath switchUser error : ${JSON.stringify(e)}`)
  );

  const returnedSwitchUserResponse =
    typeof switchUserResponse === 'string'
      ? JSON.parse(switchUserResponse)
      : switchUserResponse;

  return returnedSwitchUserResponse;
}

export async function syncUser() {
  const syncUserResponse = await OpenpathReactnative.openpathSyncUser().catch(
    (e: any) => console.error(`Openpath syncUser error : ${JSON.stringify(e)}`)
  );

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
  ).catch((e: any) =>
    console.error(`Openpath unlock error : ${JSON.stringify(e)}`)
  );

  const returnedUnlockResponse =
    typeof unlockResponse === 'string'
      ? JSON.parse(unlockResponse)
      : unlockResponse;

  return returnedUnlockResponse;
}

export async function getErrors() {
  const getErrorsResponse = await OpenpathReactnative.openpathGetErrors().catch(
    (e: any) => console.error(`Openpath getErrors error : ${JSON.stringify(e)}`)
  );

  const returnedGetErrorsResponse =
    typeof getErrorsResponse === 'string'
      ? JSON.parse(getErrorsResponse)
      : getErrorsResponse;

  return returnedGetErrorsResponse;
}

export async function requestAuthorization(type: string) {
  const requestAuthorizationResponse =
    await OpenpathReactnative.openpathRequestAuthorization(type).catch(
      (e: any) =>
        console.error(
          `Openpath requestAuthorization error : ${JSON.stringify(e)}`
        )
    );

  return requestAuthorizationResponse;
}

export async function getAuthorizationStatuses() {
  const getAuthorizationStatusesResponse =
    await OpenpathReactnative.openpathGetAuthorizationStatuses().catch(
      (e: any) =>
        console.error(
          `Openpath getAuthorizationStatuses error : ${JSON.stringify(e)}`
        )
    );

  const returnedGetAuthorizationStatusesResponse =
    typeof getAuthorizationStatusesResponse === 'string'
      ? JSON.parse(getAuthorizationStatusesResponse)
      : getAuthorizationStatusesResponse;

  return returnedGetAuthorizationStatusesResponse;
}

export async function getReadersInRange(rssiThreshold: number) {
  const getReadersInRangeResponse =
    await OpenpathReactnative.openpathGetReadersInRange(rssiThreshold).catch(
      (e: any) =>
        console.error(`Openpath getReadersInRange error : ${JSON.stringify(e)}`)
    );

  const returnedGetReadersInRangeResponse =
    typeof getReadersInRangeResponse === 'string'
      ? JSON.parse(getReadersInRangeResponse)
      : getReadersInRangeResponse;

  return returnedGetReadersInRangeResponse;
}

export async function getUserApiToken(userOpal: string) {
  const getUserApiTokenResponse =
    await OpenpathReactnative.openpathGetUserApiToken(userOpal).catch(
      (e: any) =>
        console.error(`Openpath getUserApiToken error : ${JSON.stringify(e)}`)
    );

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
    ).catch((e: any) =>
      console.error(
        `Openpath enableErrorNotificationForItem error : ${JSON.stringify(e)}`
      )
    );

  const returnedGetReadersInRangeResponse =
    typeof enableErrorNotificationsForItemResponse === 'string'
      ? JSON.parse(enableErrorNotificationsForItemResponse)
      : enableErrorNotificationsForItemResponse;

  return returnedGetReadersInRangeResponse;
}

export async function setForegroundServiceEnabled(enabled: boolean) {
  const setForegroundServiceEnabledResponse =
    await OpenpathReactnative.openpathSetForegroundServiceEnabled(
      enabled
    ).catch((e: any) =>
      console.error(
        `Openpath setForegroundServiceEnabled error : ${JSON.stringify(e)}`
      )
    );

  return setForegroundServiceEnabledResponse;
}
