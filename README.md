# 🎵 Music Quiz

## Music Quiz is an engaging game where users guess songs from the first 30 seconds of the track.  ##
> The goal of the project is to create an engaging and dynamic experience with a beautiful interface and fast response.  
> Players can compete in multiple categories, track scores on the leaderboard, and enjoy features like dark mode, localization, and notifications.
> 
### Key Features

- 🎨 **Creation, editing, and deletion of categories**  
- 🎵 **Multiple game categories**  
- 🏆 **Leaderboard by categories**  
- 👤 **User roles management** and **role-based content visibility**  
- 🌙 **Dark mode and localization**  
- 🔔 **Notifications system**

##

![Main Page](/music-quiz/src/assets/screenshots/main-page-screen.png)

---

## 🚀 Deployed App

You can try the live application here:  
🔗 [Music Quiz on Vercel](https://music-quiz-sable-vercel-app.vercel.app)

---

## 🚀 Run Steps

1. Clone the repository:  
```bash
    git clone https://github.com/massaracsh7/music-quiz.git
    cd music-quiz
```

2. Install dependencies:  
```bash
    npm install
```

3. Run the application in development mode:  
```bash
    npm start
```

4. Build the project for production:  
```bash
    npm run build
```

5. Run tests:  
```bash
    npm test
```

6. Lint and format code:  

```bash
    npm run lint            # Check code with ESLint
    npm run lint:fix        # Auto-fix lint errors
    npm run format          # Format code using Prettier
    npm run prettier-check  # Verify all `.ts` files follow Prettier rules
```

---

## ⚙️ Environment / Config

Firebase configuration is stored in `src/app/firebase.ts`

Example content:  
```bash
    export const firebaseConfig = {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_AUTH_DOMAIN',
      projectId: 'YOUR_PROJECT_ID',
      storageBucket: 'YOUR_STORAGE_BUCKET',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID',
    };
```
---

## 🏗 Architecture

The application follows a layered architecture:

```bash

src/app/
│
├── app.ts / app.routes.ts / app.config.ts / firebase.ts / app.html / app.scss
│
├── components/           # Feature Pages & child components
│   ├── about-us-page/
│   ├── admin-page/
│   ├── auth-page/
│   ├── categories-page/
│   │   ├── category-create/
│   │   │   ├── category-form/
│   │   │   └── category-search/
│   │   └── category-edit/
│   ├── forms/
│   │   ├── input-password/
│   │   ├── login-form/
│   │   └── register-form/
│   ├── game-field/
│   ├── game-page/
│   ├── home-page/
│   ├── leaderboard-page/
│   ├── modals/
│   │   ├── category-confirm-delete-modal/
│   │   ├── category-confirm-modal/
│   │   ├── finish-modal/
│   │   └── result-modal/
│   └── not-found-page/
│
├── core/                 # Business logic / Services
│   └── services/
│       ├── auth-service/
│       ├── itunes-service/
│       ├── language-service/
│       ├── leaderboard-service/
│       ├── score-counter/
│       ├── search-service/
│       ├── search-state-service/
│       ├── tracks-loader/
│       ├── user-service/
│       ├── wavesurfer/
│       └── category-service/
│
├── layout/               # Layout Components
│   ├── footer/
│   ├── header/
│   ├── nav-menu/
│   └── user-menu/
│
├── shared/               # Reusable UI, directives, helpers, services
│   ├── components/
│   │   ├── theme-toggle/
│   │   ├── toast/
│   │   └── video/
│   ├── directives/
│   │   ├── ellipsis/
│   │   ├── result-color/
│   │   └── theme-icon/
│   ├── guards/
│   ├── helpers/
│   ├── lang-switcher/
│   ├── pipes/
│   ├── resolvers/
│   ├── services/
│   │   ├── theme/
│   │   └── toast/
│   └── utils/
│
└── models/               # Types / Interfaces
    ├── category.model.ts
    ├── itunes.model.ts
    ├── leaderboard.model.ts
    ├── user.model.ts
    └── types/
        ├── itunes-response.ts
        └── track.type.ts


```

---

## 📊 Architecture Diagram

        ┌──────────────────────┐
        │        Layout        │
        │  (Header, Footer,    │
        │   NavMenu, UserMenu) │
        └─────────┬────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │     Components       │
        │  (Pages, Feature     │
        │   Components)        │
        └─────────┬────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │        Shared        │
        │  (UI, Directives,    │
        │   Pipes, Helpers)    │
        └─────────┬────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │   Core / Services    │
        │  (API, Firebase,     │
        │   Business Logic)    │
        └─────────┬────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │        Models        │
        │ (Types, Interfaces)  │
        └──────────────────────┘

---

## ⚡ Signals vs RxJS

We use **Signals** for all local UI state — modals, edit mode, form inputs, category management, and game state — because they are simple, update immediately, and keep templates readable.  
**RxJS** is used for asynchronous data — HTTP requests, API streams, and effects — where stream management, operators, and cancellation are needed.  
This approach ensures each tool is used where it works best, keeps the code clean, fast, and understandable, and makes maintaining the app easier.

## ⚡ Performance Budget

The following performance metrics were measured with Lighthouse 12.8.2 on a production build (desktop):

| Metric | Budget | Measured |
|--------|--------|----------|
| First Contentful Paint (FCP) | < 2.0s | **0.6s** |
| Largest Contentful Paint (LCP) | < 2.5s | **1.0s** |
| Total Blocking Time (TBT) | < 200ms | **50ms** |
| Cumulative Layout Shift (CLS) | < 0.1 | **0.004** |
| Speed Index (SI) | < 2.5s | **1.1s** |

✅ All metrics meet or exceed the target performance budget.  
🔗 [Full Lighthouse Report](https://pagespeed.web.dev/analysis/https-music-quiz-sable-vercel-app/9zubbp2h65?hl=en&form_factor=desktop)

![Lighthouse Report](/music-quiz/src/assets/screenshots/lighthouse%20screen.png)
