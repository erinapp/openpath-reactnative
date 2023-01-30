# openpath-reactnative

## Installation

### On Android

- Install npm package
- Add foreground service into AndroidManifest.xml

```
<service android:name="com.openpath.mobileaccesscore.OpenpathForegroundService" android:foregroundServiceType="location" android:exported="false"/>
<receiver android:name="com.openpath.mobileaccesscore.OpenpathBroadcastReceiver" android:enabled="true" android:exported="false">
  <intent-filter>
    <action android:name="android.intent.action.BOOT_COMPLETED" />
    <category android:name="android.intent.category.DEFAULT" />
  </intent-filter>
  <intent-filter>
    <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
  </intent-filter>
</receiver>
<receiver android:name="com.openpath.mobileaccesscore.OpenpathAlarmReceiver" android:process=":remote" android:exported="false" />
```

### On iOS

> Note: You must using XCode 13.2.x version to be able build on iOS

- Install npm package
- Run pod install
- Add permissions into info.plist

```
<key>UIBackgroundModes</key>
<array>
    <string>bluetooth-central</string>
    <string>fetch</string>
    <string>location</string>
    <string>remote-notification</string>
  </array>
```

### Example Usage

You can see example usage [here](./example/src/App.tsx)

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
