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

    # Register marketing permissions + role grants via the catalog DSL.
    # Replaces the retired imperative db/seeds/marketing_permissions_seed.rb (whose
    # role grants Role#sync_permissions! wiped on every db:seed anyway). The
    # resource tiers (campaigns/calendar/email_lists/social/analytics/content) map
    # to controller enforcement and are granted to admin + owner. The two
    # admin.marketing.* perms are ADMIN-tier and currently UNENFORCED; they are
    # kept (owned by this extension) via the permission() escape hatch, granted to
    # admin only.
    initializer "powernode_marketing.register_permissions", after: :load_config_initializers do
      config.after_initialize do
        next unless defined?(::Permissions) && ::Permissions.respond_to?(:register_catalog)

        ::Permissions.register_catalog(namespace: "marketing") do
          resource :campaigns, actions: %i[read manage execute],
                   grant: { owner: :all, admin: :all },
                   descriptions: {
                     read: "View marketing campaigns and their status",
                     manage: "Create, update, and delete marketing campaigns",
                     execute: "Launch, pause, and resume marketing campaigns"
                   }
          resource :content, actions: %i[approve],
                   grant: { owner: :all, admin: :all },
                   descriptions: { approve: "Approve marketing content for publication" }
          resource :calendar, actions: %i[read manage],
                   grant: { owner: :all, admin: :all },
                   descriptions: {
                     read: "View the marketing calendar and scheduled events",
                     manage: "Create, update, and delete marketing calendar entries"
                   }
          resource :email_lists, actions: %i[read manage],
                   grant: { owner: :all, admin: :all },
                   descriptions: {
                     read: "View email lists and subscriber counts",
                     manage: "Create, update, and delete email lists and subscribers"
                   }
          resource :social, actions: %i[read manage],
                   grant: { owner: :all, admin: :all },
                   descriptions: {
                     read: "View social media accounts and scheduled posts",
                     manage: "Create, update, and delete social media posts and connections"
                   }
          resource :analytics, actions: %i[read],
                   grant: { owner: :all, admin: :all },
                   descriptions: { read: "View marketing analytics, conversion rates, and ROI metrics" }

          # ADMIN-tier, currently UNENFORCED — kept via escape hatch, admin only.
          permission "admin.marketing.manage", "Full administrative control over marketing features",
                     grant: { admin: true }
          permission "admin.marketing.settings", "Configure marketing integrations and global settings",
                     grant: { admin: true }
        end
      end
    end
  end
end
