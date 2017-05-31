# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'node-styleguide/version'

Gem::Specification.new do |s|
  s.name          = "node-styleguide"
  s.version       = NodeStyleguide::VERSION
  s.authors       = ["Andreas Böhrnsen"]
  s.email         = ["andreas@frontrunner.io"]

  s.summary       = %q{Styleguide for Node}
  s.description   = %q{Sass styles and styleguide for Node}
  s.homepage      = "http://itsinthenode.github.io/styleguide/"

  # Prevent pushing this gem to RubyGems.org by setting 'allowed_push_host', or
  # delete this section to allow pushing this gem to any host.
  if s.respond_to?(:metadata)
    s.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  end

  s.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  s.bindir        = "exe"
  s.executables   = s.files.grep(%r{^exe/}) { |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_runtime_dependency 'sass', '>= 3.3.4'
  s.add_runtime_dependency 'autoprefixer-rails', '>= 5.2.1'
  s.add_runtime_dependency 'rails-assets-normalize.css', '>= 4'

  s.add_development_dependency "bundler", "~> 1.11"
  s.add_development_dependency "rake", "~> 10.0"
end
