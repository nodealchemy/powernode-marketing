# frozen_string_literal: true

# Marketing extension seed orchestrator (formal contract — explicit list, no
# glob). Invoked by the parent platform's db/seeds.rb extension loop. All of
# marketing's seeds are demo/content data (no account-independent core seeds),
# so they're gated by Powernode::Seeds.demo? (POWERNODE_SEED_DEMO / dev-test).
ext_seeds = File.expand_path("seeds", __dir__)
seed_demo = !defined?(Powernode::Seeds) || Powernode::Seeds.demo?

load_seed = lambda do |seed_file|
  path = File.join(ext_seeds, seed_file)
  next unless File.exist?(path)

  begin
    load path
  rescue StandardError => e
    Rails.logger.error("[marketing seeds] #{seed_file} failed: #{e.class}: #{e.message}")
    puts "  ❌ #{seed_file} failed: #{e.message}"
  end
end

DEMO_SEED_FILES = %w[
  marketing_demo_data_seed.rb
  launch_blog_post_seed.rb
].freeze

DEMO_SEED_FILES.each(&load_seed) if seed_demo
