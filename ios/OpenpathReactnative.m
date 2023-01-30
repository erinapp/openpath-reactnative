#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(OpenpathReactnative, NSObject)

RCT_EXTERN_METHOD(openpathProvision: (NSString)setupMobileToken withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathSwitchUser: (NSString)userOpal withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathSyncUser: (RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathUnlock: (NSString)itemType withItemId:(int)itemId withRequestId:(int)requestId withTimeoutLong:(int)timeoutLong withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathGetErrors: (RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathRequestAuthorization: (NSString)type withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathGetAuthorizationStatuses: (RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathGetReadersInRange: (NSNumber)rssiThreshold withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathGetUserApiToken: (NSString)userOpal withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openpathEnableErrorNotificationsForItem: (bool)enabled withItemType:(NSString)itemType withItemId:(int)itemId withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
