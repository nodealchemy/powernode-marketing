# frozen_string_literal: true

# Marketing extension seed orchestrator (formal contract — explicit list, no
# glob). Invoked by the parent platform's db/seeds.rb extension loop. These are
# demo/content seeds (no KB articles in this extension); they remain operator/
# demo data — core/demo gating is applied by the parent seed flow.
ext_seeds = File.expand_path("seeds", __dir__)

MARKETING_SEED_FILES = %w[
  marketing_demo_data_seed.rb
  launch_blog_post_seed.rb
].freeze

MARKETING_SEED_FILES.each do |seed_file|
  path = File.join(ext_seeds, seed_file)
  next unless File.exist?(path)

  begin
    load path
  rescue StandardError => e
    Rails.logger.error("[marketing seeds] #{seed_file} failed: #{e.class}: #{e.message}")
    puts "  ❌ #{seed_file} failed: #{e.message}"
  end
end
