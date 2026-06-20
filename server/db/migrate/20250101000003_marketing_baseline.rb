# frozen_string_literal: true
class MarketingBaseline < ActiveRecord::Migration[8.1]
  def change
  # These are extensions that must be enabled in order to support this database

  create_table "marketing_campaign_contents", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.boolean "ai_generated", default: false
    t.datetime "approved_at"
    t.uuid "approved_by_id"
    t.text "body"
    t.uuid "campaign_id", null: false
    t.string "channel", null: false
    t.datetime "created_at", null: false
    t.string "cta_text"
    t.string "cta_url"
    t.jsonb "media_urls", default: []
    t.jsonb "platform_specific", default: {}
    t.string "preview_text"
    t.string "status", default: "draft"
    t.string "subject"
    t.datetime "updated_at", null: false
    t.string "variant_name", default: "default"
    t.index ["approved_by_id"]
    t.index ["campaign_id", "channel", "variant_name"], unique: true
    t.index ["campaign_id"]
    t.index ["channel"]
    t.check_constraint "status::text = ANY (ARRAY['draft'::character varying::text, 'approved'::character varying::text, 'rejected'::character varying::text])", name: "marketing_contents_status_check"
  end

  create_table "marketing_campaign_email_lists", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.uuid "campaign_id", null: false
    t.datetime "created_at", null: false
    t.uuid "email_list_id", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id", "email_list_id"], unique: true
    t.index ["campaign_id"]
    t.index ["email_list_id"]
  end

  create_table "marketing_campaign_metrics", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.integer "bounces", default: 0
    t.uuid "campaign_id", null: false
    t.string "channel", null: false
    t.integer "clicks", default: 0
    t.integer "conversions", default: 0
    t.integer "cost_cents", default: 0
    t.datetime "created_at", null: false
    t.jsonb "custom_metrics", default: {}
    t.integer "deliveries", default: 0
    t.integer "engagements", default: 0
    t.integer "impressions", default: 0
    t.date "metric_date", null: false
    t.integer "opens", default: 0
    t.integer "reach", default: 0
    t.integer "revenue_cents", default: 0
    t.integer "sends", default: 0
    t.integer "unique_opens", default: 0
    t.integer "unsubscribes", default: 0
    t.datetime "updated_at", null: false
    t.index ["campaign_id", "channel", "metric_date"], unique: true
    t.index ["campaign_id"]
    t.index ["metric_date"]
  end

  create_table "marketing_campaigns", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.integer "budget_cents", default: 0
    t.string "campaign_type", null: false
    t.jsonb "channels", default: []
    t.datetime "completed_at"
    t.datetime "created_at", null: false
    t.uuid "created_by_id", null: false
    t.string "name", null: false
    t.datetime "paused_at"
    t.datetime "scheduled_at"
    t.jsonb "settings", default: {}
    t.string "slug", null: false
    t.integer "spent_cents", default: 0
    t.datetime "started_at"
    t.string "status", default: "draft"
    t.jsonb "tags", default: []
    t.jsonb "target_audience", default: {}
    t.datetime "updated_at", null: false
    t.index ["account_id", "name"], unique: true
    t.index ["account_id"]
    t.index ["campaign_type"]
    t.index ["created_by_id"]
    t.index ["scheduled_at"], name: "index_marketing_campaigns_on_scheduled_at", where: "(scheduled_at IS NOT NULL)"
    t.index ["slug"], unique: true
    t.index ["status"]
    t.check_constraint "campaign_type::text = ANY (ARRAY['email'::character varying::text, 'social'::character varying::text, 'chat'::character varying::text, 'sms'::character varying::text, 'multi_channel'::character varying::text])", name: "marketing_campaigns_type_check"
    t.check_constraint "status::text = ANY (ARRAY['draft'::character varying::text, 'scheduled'::character varying::text, 'active'::character varying::text, 'paused'::character varying::text, 'completed'::character varying::text, 'archived'::character varying::text])", name: "marketing_campaigns_status_check"
  end

  create_table "marketing_content_calendars", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.boolean "all_day", default: false
    t.uuid "campaign_id"
    t.string "color"
    t.datetime "created_at", null: false
    t.string "entry_type", default: "post"
    t.jsonb "metadata", default: {}
    t.string "recurrence_rule"
    t.date "scheduled_date", null: false
    t.time "scheduled_time"
    t.string "status", default: "planned"
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id", "scheduled_date"]
    t.index ["account_id"]
    t.index ["campaign_id"]
    t.index ["scheduled_date"]
    t.check_constraint "entry_type::text = ANY (ARRAY['post'::character varying::text, 'email'::character varying::text, 'social'::character varying::text, 'event'::character varying::text, 'reminder'::character varying::text])", name: "marketing_calendar_type_check"
    t.check_constraint "status::text = ANY (ARRAY['planned'::character varying::text, 'scheduled'::character varying::text, 'published'::character varying::text, 'cancelled'::character varying::text])", name: "marketing_calendar_status_check"
  end

  create_table "marketing_email_lists", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.datetime "created_at", null: false
    t.boolean "double_opt_in", default: true
    t.jsonb "dynamic_filter", default: {}
    t.string "list_type", default: "standard"
    t.string "name", null: false
    t.string "slug", null: false
    t.integer "subscriber_count", default: 0
    t.datetime "updated_at", null: false
    t.text "welcome_email_body"
    t.string "welcome_email_subject"
    t.index ["account_id", "slug"], unique: true
    t.index ["account_id"]
    t.index ["list_type"]
    t.check_constraint "list_type::text = ANY (ARRAY['standard'::character varying::text, 'dynamic'::character varying::text, 'segment'::character varying::text])", name: "marketing_email_lists_type_check"
  end

  create_table "marketing_email_subscribers", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.integer "bounce_count", default: 0
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "created_at", null: false
    t.jsonb "custom_fields", default: {}
    t.string "email", null: false
    t.uuid "email_list_id", null: false
    t.string "first_name"
    t.string "last_name"
    t.jsonb "preferences", default: {}
    t.string "source"
    t.string "status", default: "pending"
    t.datetime "subscribed_at"
    t.jsonb "tags", default: []
    t.datetime "unsubscribed_at"
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_marketing_email_subscribers_on_confirmation_token", unique: true, where: "(confirmation_token IS NOT NULL)"
    t.index ["email"]
    t.index ["email_list_id", "email"], unique: true
    t.index ["email_list_id"]
    t.index ["status"]
    t.check_constraint "status::text = ANY (ARRAY['pending'::character varying::text, 'subscribed'::character varying::text, 'unsubscribed'::character varying::text, 'bounced'::character varying::text, 'complained'::character varying::text])", name: "marketing_subscribers_status_check"
  end

  create_table "marketing_social_media_accounts", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.uuid "connected_by_id"
    t.datetime "created_at", null: false
    t.string "platform", null: false
    t.string "platform_account_id", null: false
    t.string "platform_username"
    t.integer "post_count", default: 0
    t.integer "rate_limit_remaining"
    t.datetime "rate_limit_reset_at"
    t.jsonb "scopes", default: []
    t.string "status", default: "connected"
    t.datetime "token_expires_at"
    t.datetime "updated_at", null: false
    t.string "vault_path"
    t.index ["account_id", "platform", "platform_account_id"], unique: true
    t.index ["account_id"]
    t.index ["connected_by_id"]
    t.index ["platform"]
    t.index ["status"]
    t.check_constraint "platform::text = ANY (ARRAY['twitter'::character varying::text, 'linkedin'::character varying::text, 'facebook'::character varying::text, 'instagram'::character varying::text])", name: "marketing_social_platform_check"
    t.check_constraint "status::text = ANY (ARRAY['connected'::character varying::text, 'disconnected'::character varying::text, 'expired'::character varying::text, 'error'::character varying::text])", name: "marketing_social_status_check"
  end

  create_table "marketing_waitlist_signups", id: :uuid, default: -> { "uuidv7()" }, force: :cascade do |t|
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.uuid "converted_account_id"
    t.datetime "converted_at"
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.uuid "email_subscriber_id"
    t.string "ip_address"
    t.jsonb "metadata", default: {}
    t.string "referrer"
    t.string "source"
    t.string "status", default: "pending"
    t.datetime "unsubscribed_at"
    t.datetime "updated_at", null: false
    t.string "user_agent"
    t.index ["confirmation_token"], name: "index_marketing_waitlist_signups_on_confirmation_token", unique: true, where: "(confirmation_token IS NOT NULL)"
    t.index ["converted_account_id"]
    t.index ["email"], unique: true
    t.index ["email_subscriber_id"]
    t.index ["source"]
    t.index ["status"]
    t.check_constraint "status::text = ANY (ARRAY['pending'::character varying::text, 'confirmed'::character varying::text, 'unsubscribed'::character varying::text])", name: "marketing_waitlist_signups_status_check"
  end

    add_foreign_key "marketing_campaign_contents", "marketing_campaigns", column: "campaign_id"
    add_foreign_key "marketing_campaign_contents", "users", column: "approved_by_id"
    add_foreign_key "marketing_campaign_email_lists", "marketing_campaigns", column: "campaign_id"
    add_foreign_key "marketing_campaign_email_lists", "marketing_email_lists", column: "email_list_id"
    add_foreign_key "marketing_campaign_metrics", "marketing_campaigns", column: "campaign_id"
    add_foreign_key "marketing_campaigns", "accounts", column: "account_id"
    add_foreign_key "marketing_campaigns", "users", column: "created_by_id"
    add_foreign_key "marketing_content_calendars", "accounts", column: "account_id"
    add_foreign_key "marketing_content_calendars", "marketing_campaigns", column: "campaign_id"
    add_foreign_key "marketing_email_lists", "accounts", column: "account_id"
    add_foreign_key "marketing_email_subscribers", "marketing_email_lists", column: "email_list_id"
    add_foreign_key "marketing_social_media_accounts", "accounts", column: "account_id"
    add_foreign_key "marketing_social_media_accounts", "users", column: "connected_by_id"
    add_foreign_key "marketing_waitlist_signups", "accounts", column: "converted_account_id", on_delete: :nullify
    add_foreign_key "marketing_waitlist_signups", "marketing_email_subscribers", column: "email_subscriber_id", on_delete: :nullify
  end
end
