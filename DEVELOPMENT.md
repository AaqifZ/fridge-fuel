
# Development Guide

This document provides an overview of the project structure and development workflow for the Protein Tracker application.

## Project Structure

```
protein-tracker/
├── .github/                   # GitHub templates
├── public/                    # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── Onboarding/        # Onboarding flow components
│   │   ├── ui/                # shadcn UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── pages/                 # Route pages
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
├── CONTRIBUTING.md            # Contribution guidelines
├── DEVELOPMENT.md             # This file
├── GITHUB_SETUP.md            # GitHub setup instructions
└── README.md                  # Project overview
```

## Key Features

1. **Onboarding Process**:
   - User information collection
   - Protein target calculation
   - Goal setting

2. **Refrigerator Analysis**:
   - Allows users to analyze food items
   - Recommends high-protein recipes

3. **Recipe Suggestions**:
   - Personalized recipe suggestions based on available ingredients
   - Protein content calculation

## Technical Stack

- **Frontend**: React with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query
- **Router**: React Router

## Development Workflow

1. **Setup Local Environment**:
   ```
   npm install
   npm run dev
   ```

2. **Branch Naming Convention**:
   - Feature: `feature/feature-name`
   - Bug fix: `fix/bug-name`
   - Documentation: `docs/description`

3. **Commit Message Format**:
   ```
   type(scope): short description
   
   Long description if needed
   ```
   Where type is one of: feat, fix, docs, style, refactor, test, chore

4. **Pull Request Process**:
   - Create PR against main branch
   - Fill in PR template
   - Request review from team members
   - Address review comments
   - Ensure CI checks pass

## Testing

```
npm run test            # Run all tests
npm run test:watch      # Run tests in watch mode
```

## Building for Production

```
npm run build           # Build the application
npm run preview         # Preview the built application
```

## Deployment

The application can be deployed to various platforms:

- Vercel
- Netlify
- GitHub Pages

See README.md for specific deployment instructions.
