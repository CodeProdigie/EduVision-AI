# PaperVideo

An AI-powered educational platform that transforms uploaded academic papers into structured learning materials, AI-assisted study tools, and generated video content.

## How It Works

### High-Level Flow

1. **Upload** – Users drag-and-drop academic papers (PDF, PNG, JPG) via the Upload page. Files are stored on the server using Multer.
2. **AI Pipeline** – Each uploaded paper runs through a modular processing pipeline:
   - **OCR** extracts text from images/scanned documents.
   - **Text extraction** cleans and structures the raw text.
   - **LLM understanding** identifies themes, key points, and a summary.
   - **Content generation** produces study notes, flashcards, quiz questions, a storyboard JSON (for video), and a voice narration script.
3. **Video Engine** – The generated storyboard is composed into scenes, each receiving auto-generated narration audio. A Remotion project is built and rendered to MP4/WebM with a thumbnail.
4. **AI Assistant** – Users can interact with the processed paper via chat, generate quizzes/flashcards, get chapter summaries, receive mistake explanations, track weak topics, get revision plans, and generate mock exams.
5. **Manage & Review** – All processed content appears in the video library and history timeline. Users can track progress, manage uploads, and adjust preferences.

### Detailed Breakdown

#### 1. Request Flow (End-to-End)

```
User Action → Frontend Page → API Call (fetch) → Express Route → Service/Model → Response → UI Update
```

- The user interacts with a React page (e.g., UploadPage or DashboardPage).
- The page calls a service function (e.g., `uploadService.upload()` or `videoService.list()`).
- The service uses `apiClient` (a fetch wrapper in `src/services/apiClient.js`) which attaches the JWT token from Zustand's `authStore` and sends the request to the Express backend.
- Express routes in `server/src/routes/` handle the request, run middleware (auth, rate limiting), call services or Mongoose models, and return a JSON response.
- The frontend receives the response, updates local state or TanStack Query cache, and re-renders the UI.

#### 2. Frontend Data Flow

```
Zustand Stores (authStore, themeStore)
       ↕
  React Pages & Components
       ↕
TanStack Query (server state caching)
       ↕
  Service Layer (apiClient)
       ↕
   Express Backend
```

- **Zustand** manages client-side global state (authentication status, user, token, theme preference) with `persist` middleware to save to localStorage.
- **TanStack Query** manages server-state (video list, history data) with automatic caching, background refetching, and retry logic.
- **Service layer** (`authService.js`, `uploadService.js`, `videoService.js`) abstracts API calls and is the only point of contact with the backend.
- **apiClient** is the base HTTP utility that handles JWT headers, JSON serialization, and error normalization for all requests.

#### 3. AI Pipeline Processing (server-side)

Triggered by `POST /api/ai/process` → `aiRoutes.js` → `pipelineService.run(filePath)`

```
pipelineService.run()
    │
    ├── ocrService.extractText(filePath)
    │     Reads the uploaded file and extracts raw text.
    │     (Currently a placeholder — ready to swap in Tesseract.js, Google Vision, etc.)
    │     Returns: { text, language, confidence }
    │
    ├── textExtractionService.extract(ocrText)
    │     Cleans whitespace, counts words, splits into sections.
    │     Returns: { cleanText, wordCount, sections }
    │
    ├── llmService.understand(cleanText)
    │     Analyzes the cleaned text for summary, themes, key points.
    │     (Placeholder — ready for OpenAI / OpenRouter integration.)
    │     Returns: { summary, themes, keyPoints }
    │
    └── contentGenerationService.generate({ ocrResult, extractionResult, understandingResult })
          Synthesizes everything into structured learning outputs:
          • questionAnalysis — likely exam questions and difficulty level
          • answerExplanation — overview and detailed explanation
          • studyNotes — bullet-point study guide
          • flashcards — front/back pairs for active recall
          • quizQuestions — multiple-choice questions with correct answers
          • storyboardJson — scene-by-scene breakdown for video generation
          • voiceScript — narration text for voiceover
          • learningObjectives — measurable goals for the learner
```

The pipeline returns a unified response with all outputs. The `assistantService` reuses this pipeline as context for every AI interaction.

#### 4. Video Rendering Pipeline

Triggered by `POST /api/video/render` → `videoEngineRoutes.js` → `renderPipeline.run(storyboardJson)`

```
renderPipeline.run(storyboard)
    │
    ├── sceneComposer.composeScenes(storyboard)
    │     Converts raw storyboard JSON into structured scene objects with:
    │     • Scene metadata (id, title, duration, transitions)
    │     • Slide content (bullets, diagrams, icons, highlights)
    │     • Narration text for voiceover
    │     Returns: { scenes: [...], metadata: { fps, width, height, outputDir } }
    │
    ├── [for each scene] narrationService.generateNarration(scene)
    │     Generates a .wav audio file for the scene's narration text.
    │     (Currently writes a placeholder file — ready for TTS engine integration.)
    │
    ├── remotionRenderer.buildProject(scenes)
    │     Assembles a Remotion project with composition settings
    │     (1280×720, 30fps, duration based on scene count).
    │     Returns: { id, scenes, composition }
    │
    └── renderService.render(project)
          Renders the final video output files:
          • MP4 video file
          • WebM video file
          • PNG thumbnail
          (Currently writes placeholder files — ready for Remotion's render API.)
```

#### 5. AI Assistant Service

The assistant (`server/src/assistant/assistantService.js`) wraps the pipeline output to power 10 different learning features, all accessible via `POST /api/assistant/*`:

| Endpoint | Returns | How It Works |
|---|---|---|
| `/chat` | Contextual answer to user message | Runs the pipeline on the user's paper, then returns a response augmented with study notes. |
| `/quizzes` | Array of quiz questions | Extracts `quizQuestions` from the generated content output. |
| `/flashcards` | Array of front/back cards | Extracts `flashcards` from the generated content output. |
| `/summarize` | Chapter overview | Returns `answerExplanation` from the pipeline. |
| `/mistakes` | Explanation of a specific mistake | Uses pipeline context to explain why a mistake occurred. |
| `/weak-topics` | List of weak themes + recommendation | Returns `themes` from the LLM understanding stage. |
| `/revision` | Step-by-step revision plan | Returns a hardcoded plan + full pipeline context. |
| `/next-session` | Next study session suggestion | Recommends focus areas based on pipeline output. |
| `/practice-questions` | Array of practice questions | Same as quizzes — returns `quizQuestions`. |
| `/mock-exam` | Mock exam with title + questions | Wraps `quizQuestions` into an exam structure. |

Every assistant endpoint first runs `pipelineService.run(filePath)` to build fresh context, ensuring responses are always based on the latest processed paper data. The `createBaseContext` helper is the shared entry point for all assistant features.

#### 6. Authentication Flow

```
Registration:
  RegisterPage → authService.register() → POST /api/auth/register
    → User model: hashPassword (scrypt with random salt)
    → JWT signed with user._id + role (7-day expiry)
    → Response: { token, user } → stored in Zustand authStore (persisted to localStorage)

Login:
  LoginPage → authService.login() → POST /api/auth/login
    → User model: comparePassword (scrypt verify)
    → JWT signed and returned
    → Response: { token, user } → stored in Zustand authStore

Protected Routes:
  ProtectedRoute component checks useAuth().isAuthenticated
    → If false: redirect to /login
    → If true: render AppLayout (sidebar + top nav + page content)

API Auth:
  apiClient reads token from useAuthStore.getState().token
    → Attaches Authorization: Bearer <token> header to every request
    → Server's authMiddleware verifies JWT and attaches decoded payload to req.user
```

#### 7. State Management Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Zustand (Client State)               │
│  ┌──────────────┐         ┌──────────────┐              │
│  │  authStore    │         │  themeStore  │              │
│  │  • user       │         │  • theme     │              │
│  │  • token      │         │  • toggle    │              │
│  │  • isAuth     │         │  • setTheme  │              │
│  │  • login/logout│        └──────────────┘              │
│  │  • register   │         Persisted to localStorage     │
│  └──────────────┘                                        │
│  Persisted to localStorage                               │
├─────────────────────────────────────────────────────────┤
│                  TanStack Query (Server State)            │
│  ┌──────────────────────────────────────────┐            │
│  │  ['videos'] → videoService.list()        │            │
│  │  ['videos', 'history'] → videoService.list()│          │
│  │  staleTime: 5 min, retry: 1              │            │
│  └──────────────────────────────────────────┘            │
├─────────────────────────────────────────────────────────┤
│               React Context (Implicit via Zustand)       │
│  useAuth() and useTheme() hooks expose store state       │
│  to components without prop drilling                     │
└─────────────────────────────────────────────────────────┘
```

#### 8. How Pages Connect

```
LandingPage (public) ──── links to ──── Login / Register
                                              │
                                         [authenticate]
                                              │
                                         ProtectedRoute
                                              │
                                         AppLayout
                                     ┌───────┴────────┐
                                     │                │
                                  Sidebar          TopNav
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
               Dashboard        UploadPage       VideosPage
              (stats, streak,   (dropzone,      (library from
               recent uploads,   progress,       TanStack Query)
               timeline)         retry, delete)
                    │                │
               SettingsPage      HistoryPage
              (theme toggle,     (chronological
               notifications,     list of all
               export format)     processed
                                  content)
                    │
               ProfilePage
              (user identity,
               role, verified
               status, member
               since)

          AdminPage (gated by isAdmin — redirects non-admins to /dashboard)
```

#### 9. Key Design Patterns

- **Modular pipeline architecture** – Each AI stage (OCR, extraction, LLM, content generation) is an independent service with a clear interface. Stages can be upgraded or swapped without touching other parts of the system.
- **Service-repository pattern** – Frontend pages never call fetch() directly. All API communication goes through service modules (`authService`, `uploadService`, `videoService`) which wrap `apiClient`.
- **Wrapper API client** – `apiClient.js` centralizes JWT token injection, JSON serialization, error handling, and HTTP method helpers. Adding a new API call means one line: `apiClient.get('/resource')`.
- **Protected route composition** – `ProtectedRoute` (auth check) wraps `AppLayout` (shell with sidebar/nav) which renders child routes via `<Outlet />`. This nested layout pattern keeps auth logic and UI chrome in separate components.
- **Placeholder-first AI** – All AI services return realistic mock data with well-defined schemas so the frontend can be built and tested end-to-end before connecting real AI/ML engines.
- **Dark mode with system preference detection** – `themeStore` reads `prefers-color-scheme` on init, persists the choice, and toggles the `dark` class on `<html>` via `useTheme`.
- **Database-optional backend** – If MongoDB is unavailable, `connectDatabase()` logs a warning and the server still starts, allowing frontend development without a running database.

## Project Structure

```
papervideo/
├── index.html                 # Vite entry HTML
├── vite.config.js             # Vite + React + Tailwind config
├── package.json               # Frontend dependencies & scripts
├── bun.lock                   # Bun lockfile
├── Dockerfile                 # Container build for frontend
├── docker-compose.yml         # Docker Compose service definition
├── .env.example               # Environment variable template
├── .gitignore
├── .oxlintrc.json             # Linter config (oxlint)
│
├── public/                    # Static assets (favicon, icons)
├── dist/                      # Production build output
│
├── docs/
│   └── ARCHITECTURE.md        # Architecture overview
│
├── src/                       # Frontend React application
│   ├── main.jsx               # App bootstrap & render
│   ├── App.jsx                # Root component with Suspense
│   ├── index.css              # Global styles + Tailwind
│   │
│   ├── config/
│   │   └── env.js             # Environment variables (VITE_API_URL, VITE_APP_NAME)
│   │
│   ├── lib/
│   │   └── queryClient.js     # TanStack Query client setup
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx      # All routes (public + protected)
│   │   └── ProtectedRoute.jsx # Auth guard – redirects to /login
│   │
│   ├── store/
│   │   ├── authStore.js       # Zustand auth state (user, token, login/logout)
│   │   └── themeStore.js      # Zustand theme state (dark/light, persisted)
│   │
│   ├── hooks/
│   │   ├── useAuth.js         # Auth helper hook
│   │   ├── useTheme.js        # Theme helper hook
│   │   └── useRetryableRequest.js  # Retry logic for API calls
│   │
│   ├── services/
│   │   ├── apiClient.js       # Base HTTP client (fetch with JWT, error handling)
│   │   ├── authService.js     # Auth API calls (login, register)
│   │   ├── uploadService.js   # File upload with FormData + Multer
│   │   └── videoService.js    # Video CRUD API calls
│   │
│   ├── utils/
│   │   ├── logger.js          # Console logger utility
│   │   └── analytics.js       # Analytics utility stub
│   │
│   ├── components/
│   │   ├── ui/                # Reusable primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Skeleton.jsx
│   │   │
│   │   ├── layout/            # App shell components
│   │   │   ├── AppLayout.jsx  # Main authenticated layout (sidebar + top nav + outlet)
│   │   │   ├── Sidebar.jsx    # Responsive sidebar with nav links
│   │   │   ├── TopNav.jsx     # Top navigation bar with hamburger menu
│   │   │   └── PageShell.jsx  # Page wrapper utility
│   │   │
│   │   ├── common/
│   │   │   ├── LoadingState.jsx   # Loading spinner/state component
│   │   │   └── EmptyState.jsx     # Empty state placeholder component
│   │   │
│   │   ├── uploads/
│   │   │   ├── UploadDropzone.jsx # Drag-and-drop file upload area
│   │   │   └── UploadList.jsx     # Upload file list with status & actions
│   │   │
│   │   └── dashboard/
│   │       ├── StatCard.jsx       # Metric display card
│   │       ├── SectionCard.jsx    # Content section container
│   │       └── ProgressRing.jsx   # Circular progress indicator
│   │
│   └── pages/
│       ├── LandingPage.jsx    # Public landing / hero page
│       ├── LoginPage.jsx      # Login form
│       ├── RegisterPage.jsx   # Registration form
│       ├── DashboardPage.jsx  # Main dashboard with stats, timeline, quick actions
│       ├── UploadPage.jsx     # File upload with dropzone, progress, retry
│       ├── VideosPage.jsx     # Video library (fetched from API)
│       ├── HistoryPage.jsx    # Chronological content history
│       ├── SettingsPage.jsx   # User preferences (theme, notifications, format)
│       ├── ProfilePage.jsx    # User profile & account details
│       └── AdminPage.jsx      # Admin panel (role-gated)
│
└── server/                    # Backend Express API
    ├── server.js              # Express app entry – routes, middleware, DB connect
    ├── package.json           # Server dependencies
    │
    ├── uploads/               # Uploaded files storage directory
    │
    └── src/
        ├── config/
        │   └── db.js          # MongoDB/Mongoose connection
        │
        ├── models/
        │   ├── User.js        # User model (name, email, password, role, verification)
        │   └── Video.js       # Video model (title, description, owner, status, filePath)
        │
        ├── middleware/
        │   ├── authMiddleware.js  # JWT verification middleware
        │   ├── errorHandler.js    # Global error handler
        │   └── rateLimiter.js     # Rate limiting (100 req / 15 min)
        │
        ├── routes/
        │   ├── authRoutes.js      # POST /register, /login, /forgot-password, /reset-password, /verify-email, GET /me
        │   ├── videoRoutes.js     # CRUD for videos (GET, POST, PATCH, DELETE) – auth-protected
        │   ├── uploadRoutes.js    # POST / – file upload with Multer
        │   ├── aiRoutes.js        # POST /process – run the full AI pipeline on a file
        │   ├── videoEngineRoutes.js # POST /render – render video from storyboard JSON
        │   └── assistantRoutes.js # POST /chat, /quizzes, /flashcards, /summarize, /mistakes, /weak-topics, /revision, /next-session, /practice-questions, /mock-exam
        │
        ├── services/
        │   ├── pipelineService.js        # Orchestrates OCR → extraction → LLM → content generation
        │   ├── ocrService.js             # OCR text extraction (placeholder, ready for engine swap)
        │   ├── textExtractionService.js  # Text cleaning & section extraction
        │   ├── llmService.js             # LLM understanding (themes, key points, summary)
        │   └── contentGenerationService.js # Generates study notes, flashcards, quizzes, storyboard, voice script, learning objectives
        │
        ├── video/
        │   ├── sceneComposer.js    # Composes scenes from storyboard JSON
        │   ├── narrationService.js # Generates TTS narration audio per scene
        │   ├── remotionRenderer.js # Builds Remotion project from scenes
        │   ├── renderService.js    # Renders video output (MP4, WebM, thumbnail)
        │   └── renderPipeline.js   # Orchestrates scene → narration → Remotion → render
        │
        └── assistant/
            └── assistantService.js # AI assistant logic: chat, quizzes, flashcards, summaries, mistake explanations, weak topics, revision, mock exams
```

## Tech Stack

| Layer       | Technology                                       |
|-------------|--------------------------------------------------|
| Frontend    | React 19, Vite 8, TailwindCSS 4, TanStack Query 5, Zustand 5, React Router 7 |
| Backend     | Node.js, Express 4                                |
| Database    | MongoDB + Mongoose 8                              |
| Auth        | JWT (jsonwebtoken) + crypto (scrypt hashing)      |
| File Upload | Multer                                            |
| Video       | Remotion (project build), custom render pipeline  |
| AI          | Modular services: OCR, LLM, TTS (placeholder)     |
| Container   | Docker + Docker Compose                           |
| Linter      | oxlint                                            |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 20+)
- MongoDB (local or remote)

### Frontend

```bash
bun install
bun run dev        # http://localhost:5173
```

### Backend

```bash
cd server
bun install
bun run dev        # http://localhost:5000
```

### Docker (frontend only)

```bash
docker compose up  # http://localhost:3000
```

### Environment

Copy `.env.example` to `.env` at the project root and adjust values:

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=PaperVideo
MONGODB_URI=mongodb://127.0.0.1:27017/papervideo
JWT_SECRET=change-me-in-production
```

## Available Routes

### Frontend Pages

| Path         | Page           | Auth Required |
|--------------|----------------|---------------|
| `/`          | Landing        | No            |
| `/login`     | Login          | No            |
| `/register`  | Register       | No            |
| `/dashboard` | Dashboard      | Yes           |
| `/upload`    | Upload Papers  | Yes           |
| `/videos`    | My Videos      | Yes           |
| `/history`   | History        | Yes           |
| `/settings`  | Settings       | Yes           |
| `/profile`   | Profile        | Yes           |
| `/admin`     | Admin Panel    | Admin role    |

### Backend API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/api/health`               | Health check                       |
| POST   | `/api/auth/register`        | Register a new user                |
| POST   | `/api/auth/login`           | Login user                         |
| POST   | `/api/auth/forgot-password` | Request password reset             |
| POST   | `/api/auth/reset-password`  | Reset password with token          |
| POST   | `/api/auth/verify-email`    | Verify email with token            |
| GET    | `/api/auth/me`              | Get current user profile           |
| GET    | `/api/videos`               | List user's videos (auth)          |
| POST   | `/api/videos`               | Create video record (auth)         |
| PATCH  | `/api/videos/:id`           | Update video (auth)                |
| DELETE | `/api/videos/:id`           | Delete video (auth)                |
| POST   | `/api/uploads`              | Upload a file (Multer)             |
| POST   | `/api/ai/process`           | Run AI pipeline on a file          |
| POST   | `/api/video/render`         | Render video from storyboard       |
| POST   | `/api/assistant/chat`       | Chat with AI assistant             |
| POST   | `/api/assistant/quizzes`    | Generate quiz questions            |
| POST   | `/api/assistant/flashcards` | Generate flashcards                |
| POST   | `/api/assistant/summarize`  | Summarize paper chapter            |
| POST   | `/api/assistant/mistakes`   | Explain a mistake                  |
| POST   | `/api/assistant/weak-topics`| Identify weak topics               |
| POST   | `/api/assistant/revision`   | Recommend revision plan            |
| POST   | `/api/assistant/next-session`| Recommend next study session      |
| POST   | `/api/assistant/practice-questions`| Generate practice questions |
| POST   | `/api/assistant/mock-exam`  | Generate a mock exam               |

## Scripts

### Frontend

| Command           | Description              |
|-------------------|--------------------------|
| `bun run dev`     | Start Vite dev server    |
| `bun run build`   | Production build         |
| `bun run preview` | Preview production build |
| `bun run lint`    | Run oxlint               |

### Backend

| Command        | Description        |
|----------------|--------------------|
| `node server.js` | Start API server  |
