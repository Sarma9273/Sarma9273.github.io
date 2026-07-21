export const integrations = {
  /**
   * Deploy tools/google-drive/Portfolio_Live_Backend.gs as a Google Apps Script
   * web app, then paste the /exec URL below.
   *
   * Example:
   * https://script.google.com/macros/s/AKfycb.../exec
   */
  portfolioApiUrl: 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',

  /**
   * Live Drive blogs are loaded in the visitor's browser. If the endpoint is
   * not configured or temporarily unavailable, the local Markdown articles
   * remain visible as a reliable fallback.
   */
  liveDriveBlogs: true,

  /**
   * The same Apps Script endpoint receives contact-form submissions and emails
   * them to the address configured in the backend script.
   */
  contactForm: true,
} as const;

export const hasPortfolioApi =
  integrations.portfolioApiUrl.startsWith('https://script.google.com/macros/s/') &&
  integrations.portfolioApiUrl.endsWith('/exec') &&
  !integrations.portfolioApiUrl.includes('PASTE_');
