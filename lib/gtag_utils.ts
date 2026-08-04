// GA4 measurement ID for THIS site (tools.bkjlabs.com → its own property).
// Set NEXT_PUBLIC_GA_MEASUREMENT_ID in the deployment env to override; otherwise
// it falls back to this site's ID in production, and is disabled in dev.
export const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  (process.env.NODE_ENV === "production" ? "G-1YJM28X3Y8" : "");

// The gtag `config` call in the root layout runs with `send_page_view: false`,
// so GoogleAnalyticsProvider sends every pageview - including the first one -
// exactly once, as a `page_view` event on each route change.
export const pageview = (path: string): void => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        isGuest: true,
    });
};
type GTAG_ACTION = "btn_click" | "link_click" | "api_response"
type GTAG_EVENT_CATEGORY = "click" | "api";
type GTagEvent = {
  action: GTAG_ACTION;
  category: GTAG_EVENT_CATEGORY;
  label: string;
  value: unknown;
};

export const gaCustomEvent = ({ action, category, label, value }: GTagEvent): void => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            additional_info: JSON.stringify({
                isGuest: true,
                value
            }),
        });
    }
};