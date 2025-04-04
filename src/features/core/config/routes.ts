/**
 * Routes configuration for the application
 *
 * This file defines which routes are protected and require authentication.
 * Add new protected routes to the PROTECTED_ROUTES array.
 */

/**
 * Routes that require authentication
 *
 * If a user tries to access these routes without being authenticated,
 * they will be redirected to the login page.
 *
 * Format: Array of path strings
 * - Exact paths: '/profile'
 * - Path prefixes: '/profile/' (will protect all routes starting with /profile/)
 */
export const PROTECTED_ROUTES = [
  "/profile",
  // Include paths with locale prefix
  "/en/profile",
  "/fr/profile",
  // Add more protected routes here
  // '/dashboard',
  // '/en/dashboard',
  // '/fr/dashboard',
];

/**
 * Route to redirect to when a user tries to access a protected route
 * without authentication
 *
 * Note: The middleware will prepend the locale to this path
 */
export const LOGIN_ROUTE = "/auth/login";

/**
 * Route to redirect to after successful login
 *
 * Note: The locale will be prepended to this path by the application
 */
export const DEFAULT_AUTHENTICATED_ROUTE = "/profile";
