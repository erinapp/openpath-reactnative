import Foundation
import OpenpathMobileAccessCore

@objc(OpenpathReactnative)
class OpenpathReactnative: RCTEventEmitter, OpenpathMobileAccessCoreDelegate {
    public static var emitter: RCTEventEmitter!

    open override func supportedEvents() -> [String] {
      ["onProvisionResponse",
      "onSwitchUserResponse", "onSyncUserResponse",
      "onUnlockResponse", "onItemsSet",
      "onItemsUpdated", "onUnprovisionResponse",
      "onUserSettingsSet", "onLocationStatusChanged",
      "onBluetoothStatusChanged", "onInternetStatusChanged"]
    }

    var resolver: RCTPromiseResolveBlock? = nil
      
      override init() {
        super.init()
        
        OpenpathReactnative.emitter = self
        OpenpathMobileAccessCore.shared.delegate = self
      }
      
      @objc(openpathProvision:withResolver:withRejecter:)
      func openpathProvision(setupMobileToken: String, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        self.resolver = resolve
        
        OpenpathMobileAccessCore.shared.provision(setupMobileToken: setupMobileToken)
      }
      
      @objc(openpathSwitchUser:withResolver:withRejecter:)
      func openpathSwitchUser(userOpal: String, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        self.resolver = resolve
        
        OpenpathMobileAccessCore.shared.switchUser(userOpal: userOpal)
      }
      
      @objc(openpathSyncUser:withRejecter:)
      func openpathSyncUser(resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        self.resolver = resolve
        
        OpenpathMobileAccessCore.shared.syncUser()
      }
      
      @objc(openpathUnlock:withItemId:withRequestId:withTimeoutLong:withResolver:withRejecter:)
      func openpathUnlock(itemType: String, itemId: Int, requestId: Int, timeoutLong: Int, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        self.resolver = resolve
        
        OpenpathMobileAccessCore.shared.unlock(itemType: itemType, itemId: itemId, requestId: requestId, timeout: timeoutLong)
      }
      
      @objc(openpathGetErrors:withRejecter:)
      func openpathGetErrors(resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        let errors = OpenpathMobileAccessCore.shared.getErrors()
        
        resolve(errors)
      }
      
      @objc(openpathRequestAuthorization:withResolver:withRejecter:)
      func openpathRequestAuthorization(type: String, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        OpenpathMobileAccessCore.shared.requestAuthorization(type)
        
        resolve("Openpath ios authorization request submitted with type " + type)
      }
      
      @objc(openpathGetAuthorizationStatuses:withRejecter:)
      func openpathGetAuthorizationStatuses(resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        let statuses = OpenpathMobileAccessCore.shared.getAuthorizationStatuses()
        
        resolve(statuses)
      }
      
      @objc(openpathGetReadersInRange:withResolver:withRejecter:)
      func openpathGetReadersInRange(rssiThreshold: Int, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        let readers = OpenpathMobileAccessCore.shared.getReadersInRange()
        
        resolve(readers)
      }
      
      @objc(openpathGetUserApiToken:withResolver:withRejecter:)
      func openpathGetUserApiToken(userOpal: String, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        let token = OpenpathMobileAccessCore.shared.getUserApiToken(userOpal: userOpal)
        
        resolve(token)
      }
      
      @objc(openpathEnableErrorNotificationsForItem:withItemType:withItemId:withResolver:withRejecter:)
      func openpathEnableErrorNotificationsForItem(enabled: Bool, itemType: String, itemId: Int, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        self.resolver = resolve
        
        OpenpathMobileAccessCore.shared.enableNotificationsForItem(enabled: enabled, itemType: itemType, itemId: itemId)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onProvisionResponse message: [String : Any]) {
        if (self.resolver != nil) {
          self.resolver!(message)
          self.resolver = nil
        }
          
          OpenpathReactnative.emitter.sendEvent(withName: "onProvisionResponse", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onSwitchUserResponse message: [String : Any]) {
        if (self.resolver != nil) {
          self.resolver!(message)
          self.resolver = nil
        }
          
          OpenpathReactnative.emitter.sendEvent(withName: "onSwitchUserResponse", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onSyncUserResponse message: [String : Any]) {
        if (self.resolver != nil) {
          self.resolver!(message)
          self.resolver = nil
        }
          
          OpenpathReactnative.emitter.sendEvent(withName: "onSyncUserResponse", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onUnlockRequest message: [String : Any]) {
        if (self.resolver != nil) {
          self.resolver!(message)
          self.resolver = nil
        }
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onItemsSet message: [String : Any]) {
          OpenpathReactnative.emitter.sendEvent(withName: "onItemsSet", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onItemsUpdated message: [String : Any]) {
        if (self.resolver != nil) {
          self.resolver!(message)
          self.resolver = nil
        }
          
          OpenpathReactnative.emitter.sendEvent(withName: "onItemsUpdated", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onDebug message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onRevertResponse message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onUnlockResponse message: [String : Any]) {
          OpenpathReactnative.emitter.sendEvent(withName: "onUnlockResponse", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onOverrideResponse message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onUnprovisionResponse message: [String : Any]) {
          OpenpathReactnative.emitter.sendEvent(withName: "onUnprovisionResponse", body: message)
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onAppUpdatePaused message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onUserSettingsSet message: [String : Any]) {
          OpenpathReactnative.emitter.sendEvent(withName: "onUserSettingsSet", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onLockdownPlansSet messages: [String : [Any]]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onCredentialConfigSet message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onMotionStatusChanged message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onSendFeedbackRequest message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onSendFeedbackResponse message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onInitializeUserRequest message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onInternetStatusChanged message: [String : Any]) {
          OpenpathReactnative.emitter.sendEvent(withName: "onInternetStatusChanged", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onLocationStatusChanged message: [String : Any]) {
          OpenpathReactnative.emitter.sendEvent(withName: "onLocationStatusChanged", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onBluetoothStatusChanged message: [String : Any]) {
          OpenpathReactnative.emitter.sendEvent(withName: "onBluetoothStatusChanged", body: message)
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onNotificationStatusChanged message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onProtectedDataStatusChanged message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onRevertLockdownPlanResponse message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onTriggerLockdownPlanResponse message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onRevertByConnectionTypeResponse message: [String : Any]) {
          
      }
      
      func openpathMobileAccessCore(_ openpathMobileAccessCore: OpenpathMobileAccessCore, onUnlockByConnectionTypeResponse message: [String : Any]) {
          
      }
}
