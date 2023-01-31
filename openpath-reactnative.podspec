

Pod::Spec.new do |spec|

  spec.name         = "openpath-reactnative"
  spec.version      = "0.0.1"
  spec.summary      = "A short description of openpath-reactnative."

  spec.description  = <<-DESC
                   DESC

  spec.homepage     = "https://github.com/erinapp/openpath-reactnative"
  spec.license      = "MIT (example)"

  spec.author             = { "Erin Living" => "info@erinliving.com" }

  spec.source       = { :git => "https://github.com/erinapp/openpath-reactnative.git", :tag => "#{spec.version}" }

  spec.source_files  = "Classes", "Classes/**/*.{h,m}"
  spec.exclude_files = "Classes/Exclude"

end
