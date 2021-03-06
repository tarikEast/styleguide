module NodeStyleguide
  module Rails
    class Engine < ::Rails::Engine
      initializer 'node-styleguide.assets.precompile' do |app|
        %w(stylesheets fonts images).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end

        # sprockets-rails 3 tracks down the calls to `font_path` and `image_path`
        # and automatically precompiles the referenced assets.
        unless Sprockets::Rails::VERSION.split('.', 2)[0].to_i >= 3
          app.config.assets.precompile << 'icons/*.svg'
        end
      end
    end
  end
end
