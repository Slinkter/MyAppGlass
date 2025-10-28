# AI Assistant Instructions for MyAppGlass

This document provides essential context for AI agents working with the MyAppGlass codebase, a React-based web application for Glass & Aluminum Company S.A.C.

## Project Overview

MyAppGlass is a commercial website for a glass and aluminum products company, built with:

-   React + Vite
-   Chakra UI for styling and theming
-   Firebase for backend services
-   React Router for navigation

## Core Architecture

### Component Organization

```
/src
├── components/           # Reusable components
│   ├── HomePage/        # Landing page components
│   ├── ServicePage/     # Service-specific components (numbered 1-10)
│   └── ProjectPage/     # Project showcase components
├── data/                # Centralized data store
│   ├── projects.js      # Project showcase data
│   ├── services.js      # Service offerings data
│   └── gallery/         # Image galleries by service
├── layout/              # Layout components
│   ├── Navbar/
│   ├── Footer/
│   └── LibroReclamacion/# Complaints form component
└── routes/              # Page components
```

### Key Patterns

1. **Service Page Pattern**

    ```jsx
    const ServiceComponent = () => {
        const pageData = {
            seo: { title: "", description: "" },
            systems: [{ label: "", icon: ChevronRightIcon }],
            features: [{ label: "", icon: CheckIcon }],
            imageLists: [
                /* gallery images */
            ],
        };
        return <ServicePageLayout pageData={pageData} />;
    };
    ```

2. **Mobile Responsiveness**

    - Uses Chakra UI's responsive props and useMediaQuery hook
    - Components adapt layout based on screen size

    ```jsx
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    <SimpleGrid columns={isMobile ? 1 : 4}>
    ```

3. **Theming & Color Modes**
    - Dark/light mode support via Chakra UI
    - Consistent color tokens defined in `src/theme.js`
    ```jsx
    const bgColor = useColorModeValue("gray.200", "blackAlpha.500");
    ```

## Firebase Integration

1. **Complaints Book Feature**

    - Form submissions handled in `LibroReclamacion/ReclamoForm.jsx`
    - Uses Firebase Cloud Functions for email notifications
    - Configured in `firebase/firebase.js` using environment variables

2. **Cloud Functions**
    - Located in `/functions/index.js`
    - SendGrid integration for email notifications
    - Region: `southamerica-west1`

## Development Workflow

### Environment Setup

```bash
# Install dependencies
pnpm install
cd functions && pnpm install

# Development
pnpm dev         # Start dev server
pnpm build       # Production build

# Deployment
firebase deploy              # Deploy everything
firebase deploy --only functions  # Deploy backend only
pnpm build && firebase deploy --only hosting  # Deploy frontend only
```

### Required Environment Variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Common Tasks

1. **Adding a New Service Page**

    - Create component in `src/components/ServicePage/[N]-[Name]/`
    - Add route in `src/main.jsx`
    - Add data in `src/data/services.js`
    - Create gallery data in `src/data/gallery/[service].js`

2. **Updating Site Content**

    - Service content: Update relevant files in `src/data/`
    - Gallery images: Add to `src/assets/webService/s/[category]/`
    - SEO metadata: Modify in individual route components

3. **Form Handling**
    - New form fields: Update `ReclamoForm.jsx` and Firebase function
    - Email templates: Modify SendGrid templates in Cloud Functions
