require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "openpath-reactnative"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.1" }
  s.source       = { :git => "https://github.com/erinapp/openpath-reactnative.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency 'OpenSSL-Universal', '1.1.180'
  s.vendored_frameworks = 'VendoredIOSFrameworks/AWSCore.xcframework', 'VendoredIOSFrameworks/AWSLogs.xcframework', 'VendoredIOSFrameworks/Allegion_Access_BLECredential_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_Access_Hub_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_Access_MobileAccessSDK_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_Analytics_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_BLECore_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_Extensions_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_Logging_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_Security_iOS.xcframework', 'VendoredIOSFrameworks/Allegion_Translation_iOS.xcframework', 'VendoredIOSFrameworks/BCryptSwift.xcframework', 'VendoredIOSFrameworks/CryptoSwift.xcframework', 'VendoredIOSFrameworks/GMEllipticCurveCrypto.xcframework', 'VendoredIOSFrameworks/JOSESwift.xcframework', 'VendoredIOSFrameworks/JWTDecode.xcframework', 'VendoredIOSFrameworks/MQTTClient.xcframework', 'VendoredIOSFrameworks/ObjcExceptionBridging.xcframework', 'VendoredIOSFrameworks/OpenpathMobileAccessCore.xcframework', 'VendoredIOSFrameworks/PromiseKit.xcframework', 'VendoredIOSFrameworks/Reachability.xcframework', 'VendoredIOSFrameworks/SocketRocket.xcframework', 'VendoredIOSFrameworks/SwiftCBOR.xcframework', 'VendoredIOSFrameworks/SwiftSocket.xcframework', 'VendoredIOSFrameworks/XCGLogger.xcframework',
  
  # s.pod_target_xcconfig = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64' }
  # s.user_target_xcconfig = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64' }
  
  # Don't install the dependencies when we run `pod install` in the old architecture.
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    s.pod_target_xcconfig    = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
    }

    s.dependency "React-Codegen"
    s.dependency "RCT-Folly"
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"
  end
end