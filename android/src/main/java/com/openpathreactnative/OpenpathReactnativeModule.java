package com.openpathreactnative;


import android.app.Activity;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import com.google.gson.Gson;
import org.json.JSONObject;

import com.openpath.mobileaccesscore.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

@ReactModule(name = OpenpathReactnativeModule.NAME)
public class OpenpathReactnativeModule extends ReactContextBaseJavaModule implements OpenpathMobileAccessCore.OpenpathEventHandler  {
  public static final String NAME = "OpenpathReactnative";

  ReactApplicationContext reactContext;

  public OpenpathReactnativeModule(ReactApplicationContext reactContext) {
    super(reactContext);

    this.reactContext = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  boolean isOpenpathInitialized = false;
  Promise currentPromise;

  @ReactMethod
  public void openpathInit(Promise promise) {
    this.currentPromise = promise;

    OpenpathMobileAccessCore.OpenpathEventHandler openpathEventHandler = this;

    Activity activity = getCurrentActivity();

    activity.runOnUiThread(() -> {
      OpenpathMobileAccessCore.getInstance().init(activity.getApplication(), openpathEventHandler);
    });
  }

  @ReactMethod
  public void openpathProvision(String setupMobileToken, Promise promise) {
    if (this.isOpenpathInitialized) {
      this.currentPromise = promise;

      String APP_NAME = "Erin Living";
      OpenpathMobileAccessCore.getInstance().provision(APP_NAME, setupMobileToken);
    }
  }

  @ReactMethod
  public void openpathSwitchUser(String userOpal, Promise promise) {
    this.currentPromise = promise;

    OpenpathMobileAccessCore.getInstance().switchUser(userOpal);
  }

  @ReactMethod
  public void openpathSyncUser(Promise promise) {
    this.currentPromise = promise;

    OpenpathMobileAccessCore.getInstance().syncUser();
  }

  @ReactMethod
  public void openpathUnlock(String itemType, int itemId, int requestId, int timeout, Promise promise) {
    this.currentPromise = promise;

    OpenpathMobileAccessCore.getInstance().unlock(itemType, itemId, requestId, timeout);
  }

  @ReactMethod
  public void openpathGetErrors(Promise promise) {
    ArrayList<OpenpathError> errors = OpenpathMobileAccessCore.getInstance().getErrors();

    Gson gson = new Gson();
    String json = gson.toJson(errors);

    promise.resolve(json);
  }

  @ReactMethod
  public void openpathRequestAuthorization(String type, Promise promise) {
    Activity activity = getCurrentActivity();

    OpenpathMobileAccessCore.getInstance().requestAuthorization(activity, type);

    promise.resolve("Openpath android authorization request submitted with type " + type);
  }

  @ReactMethod
  public void openpathGetAuthorizationStatuses(Promise promise) {
    ArrayList<OpenpathAuthorizationStatus> statuses = OpenpathMobileAccessCore.getInstance().getAuthorizationStatuses();

    Gson gson = new Gson();
    String json = gson.toJson(statuses);

    promise.resolve(json);
  }

  @ReactMethod
  public void openpathGetReadersInRange(int rssiThreshold, Promise promise) {
    ArrayList<OpenpathReader> readers = OpenpathMobileAccessCore.getInstance().getReadersInRange(rssiThreshold);

    Gson gson = new Gson();
    String json = gson.toJson(readers);

    promise.resolve(json);
  }

  @ReactMethod
  public void openpathGetUserApiToken(String userOpal, Promise promise) throws InvalidAlgorithmParameterException, UnrecoverableKeyException, NoSuchPaddingException, IllegalBlockSizeException, CertificateException, IOException, NoSuchAlgorithmException, BadPaddingException, KeyStoreException, InvalidKeyException, NoSuchProviderException {
    String userApiToken = OpenpathMobileAccessCore.getInstance().getUserApiToken(userOpal);

    promise.resolve(userApiToken);
  }

  @ReactMethod
  public void openpathEnableErrorNotificationsForItem(boolean enabled, String itemType, int itemId, Promise promise) {
    this.currentPromise = promise;

    OpenpathMobileAccessCore.getInstance().enableErrorNotificationsForItem(enabled, itemType, itemId);
  }

  @Override
  public void onInit() {
    this.isOpenpathInitialized = true;

    if (this.currentPromise != null) {
      this.currentPromise.resolve("Openpath android initialized");
      this.currentPromise = null;
    }

    WritableMap payload = Arguments.createMap();

    payload.putString("status", "Openpath android initialized");

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onInit", payload);
  }

  @Override
  public void onProvisionResponse(OpenpathProvisionResponse openpathProvisionResponse) {
    Gson gson = new Gson();
    String json = gson.toJson(openpathProvisionResponse);

    if (this.currentPromise != null) {
      this.currentPromise.resolve(json);
      this.currentPromise = null;
    }

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onProvisionResponse", json);
  }

  @Override
  public void onSwitchUserResponse(OpenpathSwitchUserResponse openpathSwitchUserResponse) {
    Gson gson = new Gson();
    String json = gson.toJson(openpathSwitchUserResponse);

    if (this.currentPromise != null) {
      this.currentPromise.resolve(json);
      this.currentPromise = null;
    }

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onSwitchUserResponse", json);
  }

  @Override
  public void onSyncUserResponse(OpenpathSyncUserResponse openpathSyncUserResponse) {
    Gson gson = new Gson();
    String json = gson.toJson(openpathSyncUserResponse);

    if (this.currentPromise != null) {
      this.currentPromise.resolve(json);
      this.currentPromise = null;
    }

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onSyncUserResponse", json);
  }

  @Override
  public void onUnlockResponse(OpenpathRequestResponse openpathRequestResponse) {
    Gson gson = new Gson();
    String json = gson.toJson(openpathRequestResponse);

    if (this.currentPromise != null) {
      this.currentPromise.resolve(json);
      this.currentPromise = null;
    }

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onUnlockResponse", json);
  }

  @Override
  public void onItemsSet(ArrayList<OpenpathItem> arrayList, ArrayList<OpenpathOrderingItem> arrayList1) {
     WritableMap payload = Arguments.createMap();

     Gson gsonArrayList = new Gson();
     String jsonArrayList = gsonArrayList.toJson(arrayList);

     Gson gsonArrayList1 = new Gson();
     String jsonArrayList1 = gsonArrayList1.toJson(arrayList);

     payload.putString("arrayList", jsonArrayList);
     payload.putString("arrayList1", jsonArrayList1);

     this.reactContext
     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
     .emit("onItemsSet", payload);
  }

  @Override
  public void onItemsUpdated(ArrayList<OpenpathItem> arrayList) {
    Gson gson = new Gson();
    String json = gson.toJson(arrayList);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onItemsUpdated", json);
  }

  @Override
  public void onUnprovisionResponse(OpenpathUnprovisionResponse openpathUnprovisionResponse) {
    Gson gson = new Gson();
    String json = gson.toJson(openpathUnprovisionResponse);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onUnprovisionResponse", json);
  }

  @Override
  public void onUserSettingsSet(OpenpathUserSettings openpathUserSettings) {
    Gson gson = new Gson();
    String json = gson.toJson(openpathUserSettings);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onUserSettingsSet", json);
  }

  @Override
  public void onLocationStatusChanged(OpenpathLocationStatus openpathLocationStatus) {
    Gson gson = new Gson();
    String json = gson.toJson(openpathLocationStatus);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onLocationStatusChanged", json);
  }

  @Override
  public void onBluetoothStatusChanged(boolean b, boolean b1) {
    WritableMap payload = Arguments.createMap();

    payload.putBoolean("b", b);
    payload.putBoolean("b1", b1);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onBluetoothStatusChanged", payload);
  }

  @Override
  public void onInternetStatusChanged(boolean b) {
    WritableMap payload = Arguments.createMap();

    payload.putBoolean("b", b);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onInternetStatusChanged", payload);
  }

  @Override
  public void onNotificationClicked(String s, int i) {
    WritableMap payload = Arguments.createMap();

    payload.putString("s", s);
    payload.putInt("i", i);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onNotificationClicked", payload);
  }

  @Override
  public void onBluetoothError(int i, String s) {
    WritableMap payload = Arguments.createMap();

    payload.putInt("i", i);
    payload.putString("s", s);

    this.reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("onBluetoothError", payload);
  }

  @Override
  public void onBatteryOptimizationStatusChanged(boolean b) {

  }

  @Override
  public void onFeedbackResponse(OpenpathResponse openpathResponse) {

  }

  @Override
  public void onRevertResponse(OpenpathRequestResponse openpathRequestResponse) {

  }

  @Override
  public void onOverrideResponse(OpenpathRequestResponse openpathRequestResponse) {

  }

  @Override
  public void onTriggerLockdownPlanResponse(OpenpathRequestResponse openpathRequestResponse) {

  }

  @Override
  public void onRevertLockdownPlanResponse(OpenpathRequestResponse openpathRequestResponse) {

  }

  @Override
  public void onLockdownPlansSet(ArrayList<OpenpathLockdownPlan> arrayList) {

  }

  @Override
  public void onEvent(JSONObject jsonObject) {

  }
}
