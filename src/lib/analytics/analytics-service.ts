"use client";

export type AnalyticsEvent =
  | "view_campaign"
  | "click_donate"
  | "complete_donation"
  | "view_product"
  | "buy_product"
  | "register"
  | "login";

export interface AnalyticsService {
  track(event: AnalyticsEvent, payload?: Record<string, unknown>): void;
}

class ConsoleAnalyticsService implements AnalyticsService {
  track(event: AnalyticsEvent, payload?: Record<string, unknown>): void {
    // Vendor-agnostic abstraction, replace with GA/PostHog/Mixpanel later.
    console.info("[analytics]", event, payload ?? {});
  }
}

export const analyticsService: AnalyticsService = new ConsoleAnalyticsService();
