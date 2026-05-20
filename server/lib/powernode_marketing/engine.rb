# frozen_string_literal: true

module PowernodeMarketing
  class Engine < ::Rails::Engine
    isolate_namespace PowernodeMarketing

    # Add extension directories to autoload paths
    initializer "powernode_marketing.autoload", before: :set_autoload_paths do |app|
      %w[models services controllers channels].each do |subdir|
        path = root.join("app", subdir)
        app.config.autoload_paths << path.to_s if path.exist?
      end
    end    # Tell Zeitwerk to ignore the decorators directory entirely. Files
    # under app/decorators use Class.class_eval and don't define a constant
    # matching their path — eager_load_all in production raises Zeitwerk::NameError
    # without this. Mirrors the fix in extensions/system's engine.
    initializer "#powernode_marketing.ignore_decorators", before: :set_autoload_paths do |_app|
      decorators_path = root.join("app", "decorators")
      Rails.autoloaders.main.ignore(decorators_path.to_s) if decorators_path.exist?
    end



    # Load decorators that extend core models — explicit via load (path-based, not autoload).
    config.to_prepare do
      Dir[PowernodeMarketing::Engine.root.join("app", "decorators", "**", "*_decorator.rb")].each do |decorator|
        load decorator
      end
    end

    # Add extension migrations to the application migration paths
    initializer "powernode_marketing.migrations" do |app|
      path = root.join("db", "migrate")
      app.config.paths["db/migrate"] << path.to_s if path.exist?
    end

    # Register with the dynamic extension registry
    initializer "powernode_marketing.register", after: :load_config_initializers do
      config.after_initialize do
        Powernode::ExtensionRegistry.register(
          slug: "marketing",
          engine: PowernodeMarketing::Engine,
          version: PowernodeMarketing::VERSION
        )
      end
    end
  end
end
