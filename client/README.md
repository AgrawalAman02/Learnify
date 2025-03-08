# Learnify Client (Frontend)

## Introduction

The Learnify client is a React-based Single Page Application (SPA) built with Vite. It provides the user interface for students and instructors to interact with the Learnify LMS.

## Features

- **Responsive UI**: Built with Tailwind CSS and shadcn/ui components for a consistent and responsive design.
- **Dynamic Routing**: Uses React Router for client-side navigation.
- **State Management**: Redux Toolkit with RTK Query for efficient data fetching and state management.
- **Theme Support**: Dark and light mode using next-themes.
- **Animations**: Framer Motion for smooth UI transitions.
- **Form Handling**: React Hook Form for managing forms.
- **Video Playback**: React Player for playing video lectures.

## Technology Stack

- **Framework**: React with Vite
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **Rich Text Editing**: React Quill
- **Media**: React Player for video content

## Directory Structure

```bash
client/
├── public/            # Static assets
├── src/               # Source files
│   ├── apis/          # API services using RTK Query
│   ├── assets/        # Assets like images
│   ├── components/    # Reusable components
│   ├── hooks/         # Custom hooks
│   ├── Layout/        # Layout components
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── store/         # Redux store configuration
│   ├── App.css        
│   ├── App.jsx        
│   ├── index.css
│   └── main.jsx       
├── .env               # Environment variables
├── components.json    # Components aliases
├── index.html         # Main HTML file
├── jsconfig.json      # JSConfig for path aliases
├── package.json       # Dependencies and scripts
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js     # Vite build configuration
```

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/yourusername/learnify.git
cd learnify/client
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Configure Environment Variables
Create a `.env` file in the `client` directory and add the following:
```
VITE_SERVER_URL=http://localhost:5000/api/v1/
```

### Run the Development Server
```bash
npm run dev
# or
yarn dev
```

## Key Components

### apis/
- **authApi.jsx**: Authentication-related API endpoints (register, login, logout, forgotPassword, resetPassword).
- **courseApi.jsx**: Course-related API endpoints (addCourse, getCourse, updateCourse, publishCourse, getPublishedCourse, createLecture, getLecture, editLecture, deleteLecture,etc).
- **courseProgressApi.jsx**: Course progress-related API endpoints (getCourseProgress, updateLectureProgress, markAsComplete, markAsIncomplete).
- **paymentApi.jsx**: Payment-related API endpoints (createOrder, getCoursePaymentStatus).
- **profileApi.jsx**: User profile-related API endpoints (getProfile, updateProfile, instructor).

### components/
- **ui/**: Reusable UI components built with shadcn/ui.
- **student/**: Components specific to student functionality (CourseCard, HeroSection, etc.).
- **admin/**: Components specific to admin functionality (CourseTab, RichTextEditor, etc.).

### pages/
- **SignInOut.jsx**: Sign-in and sign-up page.
- **student/**: Pages for student-related features (HomePage, MyLearning, EditProfile, CourseDetails, VideoPlayer, Search).
- **admin/**: Pages for admin-related features (SideBar, CourseTable, DashBoard, AddCourse, EditCourse, CreateLecture, EditLecture,etc).

### store/
- **appStore.jsx**: Redux store configuration.
- **authSlice.jsx**: Redux slice for authentication state.
- **rootReducer.jsx**: Combines all reducers.

## Data Flow

1. **Component Initialization**: React components are rendered based on the current route and user interactions.
2. **API Requests**: Components use RTK Query hooks (e.g., `useGetCourseQuery`, `useUpdateCourseMutation`) to fetch or update data from the backend.
3. **Redux State Updates**: API responses are used to update the Redux store, triggering re-renders of components that subscribe to the relevant state slices.
4. **UI Updates**: Components display data from the Redux store and handle user interactions, which may trigger further API requests and state updates.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.