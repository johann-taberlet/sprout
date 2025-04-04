# Vertical Slice Architecture

This project uses a vertical slice architecture, which organizes code by feature rather than by technical layer.

## Structure

- `/src/features` - Contains all feature slices
  - `/src/features/core` - Core/shared functionality
    - `/components` - Core components like ThemeProvider
  - `/src/features/home` - Home page feature
    - `/pages` - Home page component
    - `/translations` - Feature-specific translations
  - `/src/features/auth` - Authentication feature
    - `/components` - Auth-specific components
    - `/pages` - Page components for auth routes
    - `/routes` - API routes for auth
    - `/translations` - Feature-specific translations
  - `/src/features/profile` - User profile feature
    - `/components` - Profile-specific components
    - `/pages` - Page components for profile routes
    - `/translations` - Feature-specific translations

## Route Structure

- `/` - Home page (public)
- `/auth/*` - Authentication routes (public)
- `/profile` - User profile (protected, part of the `(protected)` route group)

The `(protected)` route group in `/src/app/(protected)` uses Next.js route groups (folders with parentheses) to hide the segment from the URL while still organizing routes that require authentication.

### Route Protection Configuration

Protected routes are configured in a central location at `/src/features/core/config/routes.ts`. This file contains:

- `PROTECTED_ROUTES`: An array of paths that require authentication
- `LOGIN_ROUTE`: The route to redirect to when a user tries to access a protected route without authentication
- `DEFAULT_AUTHENTICATED_ROUTE`: The route to redirect to after successful login

To add a new protected route, simply add its path to the `PROTECTED_ROUTES` array in this file.

## Shared Code

- `/src/components/ui` - Shared UI components
- `/src/lib` - Shared utilities and services

## Benefits of Vertical Slice Architecture

1. **Cohesion** - Related code is kept together, making it easier to understand and modify
2. **Isolation** - Features are isolated from each other, reducing coupling
3. **Scalability** - New features can be added without affecting existing ones
4. **Maintainability** - Changes to one feature don't impact others
5. **Testability** - Features can be tested in isolation

## How to Add a New Feature

1. Create a new directory in `/src/features`
2. Add components, pages, and routes specific to the feature
3. Create a barrel file (`index.ts`) to export the feature's public API
4. Update the app routes to use the new feature

## Translations Management

The project uses `next-intl` for internationalization, following the vertical slice architecture principles:

### Translation Structure

- `/src/features/[feature]/i18n` - Feature-specific translations
  - `en.json` - English translations for this feature
  - `fr.json` - French translations for this feature
- `/src/features/core/i18n` - Core translations and configuration
  - `request.ts` - Translation loading and merging logic
  - `routing.ts` - i18n routing configuration
  - `navigation.ts` - i18n navigation utilities

### How Translations Work

1. **Feature-based Organization**: Each feature's translations are kept in its own directory:

   ```json
   /src/features/auth/i18n/fr.json
   {
     "login": {
       "title": "Connexion",
       "description": "Entrez votre email pour vous connecter",
       "submit": "Se connecter"
     },
     "fields": {
       "email": "Email",
       "password": "Mot de passe"
     }
   }
   ```

2. **Nested Structure**: Translation files use a nested structure to organize translations by component or logical group:

   ```json
   // ✅ Good - Organized by component/feature
   {
     "login": {
       "title": "Sign in",
       "description": "Enter your email"
     },
     "fields": {
       "email": "Email",
       "password": "Password"
     }
   }

   // ❌ Bad - Flat structure makes it harder to maintain
   {
     "loginTitle": "Sign in",
     "loginDescription": "Enter your email",
     "email": "Email",
     "password": "Password"
   }
   ```

3. **Usage in Components**:

   ```typescript
   // Server Component
   const t = await getTranslations("auth");
   t("login.title"); // "Sign in"
   t("fields.email"); // "Email"

   // Client Component
   const t = useTranslations("auth");
   t("login.submit"); // "Sign in"
   ```

### Adding Translations to a New Feature

1. Create an `i18n` directory in your feature folder:

   ```
   /src/features/your-feature/i18n/
   ```

2. Add translation files for each supported locale with a nested structure:

   ```json
   // fr.json
   {
     "component": {
       "title": "Titre en français",
       "description": "Description en français"
     }
   }

   // en.json
   {
     "component": {
       "title": "English title",
       "description": "English description"
     }
   }
   ```

3. The translations will be automatically loaded and merged by the core i18n system.

### Best Practices

1. **Logical Grouping**: Group translations by component or logical feature
2. **Feature Isolation**: Keep translations within their respective feature directories
3. **Consistent Keys**: Use clear, descriptive keys that reflect their usage
4. **Complete Coverage**: Ensure all locales have matching translation keys
5. **Semantic Keys**: Use keys that describe the content's purpose rather than its value

   ```json
   // ✅ Good
   {
     "welcome": {
       "title": "Welcome to our app",
       "description": "Get started with your account"
     },
     "auth": {
       "loginButton": "Sign in"
     }
   }

   // ❌ Bad
   {
     "welcome_text": "Welcome to our app",
     "button_1": "Sign in"
   }
   ```
