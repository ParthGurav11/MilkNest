/**
 * Dairy landing page — configuration
 * Replace YOUR_GOOGLE_MAPS_API_KEY with your key from Google Cloud Console:
 * https://console.cloud.google.com/google/maps-apis
 * Enable "Maps JavaScript API" for your project.
 */
window.DAIRY_CONFIG = {
  /** Paste your Maps JavaScript API key here (leave empty to show address-only fallback). */
  googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',

  /** Map center (latitude, longitude) — update to match your dairy. */
  mapCenter: { lat: 41.7004, lng: -73.921 },

  /** Shown in the Location section and used as map marker title. */
  address:
    'Green Valley Dairy, 142 Farmstead Lane, Hudson Valley, NY 12534, United States',

  /**
   * WhatsApp chat: digits only, full international number (no +, spaces, or dashes).
   * Must be the number registered with WhatsApp Business / WhatsApp.
   * Examples: US "15551234567", India "919876543210".
   * Leave empty ("") to hide WhatsApp buttons until you set a number.
   */
  whatsappPhoneE164: '15551234567',

  /** Optional first message in the chat (empty string = blank chat). */
  whatsappPrefillMessage: 'Hi, I would like to know more about Green Valley Dairy.',
};
