# frozen_string_literal: true

require "rails_helper"

# Brand-guidance check: the platform's social handle is X / @nodealchemy and the
# channel must never be called "Twitter" in marketing copy.
#
# Reproduces IMP-4cdff56bb3dc — the demo-video script named the channel "Twitter".
# (extensions/marketing/README.md uses the accepted "X / Twitter" disambiguation
# form with an x.com link, so it is intentionally out of this guard's scope.)
RSpec.describe "marketing demo-video script brand naming" do
  ext_root = File.expand_path("../../..", __dir__)
  doc_path = File.join(ext_root, "docs", "marketing", "DEMO_VIDEO_SCRIPT.md")

  it "names the social channel X, never Twitter" do
    skip "DEMO_VIDEO_SCRIPT.md not present" unless File.exist?(doc_path)

    offending = []
    File.readlines(doc_path).each_with_index do |line, idx|
      offending << "line #{idx + 1}: #{line.strip}" if line.match?(/Twitter/i)
    end

    expect(offending).to(
      be_empty,
      "DEMO_VIDEO_SCRIPT.md calls the channel \"Twitter\" (use X / @nodealchemy):\n" \
      "#{offending.join("\n")}"
    )
  end
end
