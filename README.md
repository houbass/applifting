Fullstack Blog – Applifting Hiring Assignment
This project is a simple fullstack blog created as part of a hiring assignment for Applifting. The goal was to implement a single-user blog with login functionality and full CRUD support for blog posts. https://github.com/Applifting/fullstack-exercise/blob/master/assignment.md

While my main focus is frontend development, I built a lightweight backend using Firebase, which handles:

- user authentication (login/logout),
- database operations (creating and retrieving posts),
- file storage (e.g., images for blog posts).

🔧 Technologies Used

- Next.js (TypeScript) – Chosen for its built-in support for server-side rendering (SSR), which improves SEO for public blog posts.
- Firebase – Used for backend functionality including authentication, Firestore database, and file storage.
- Redux Toolkit – For global state management, especially auth.
- React Query (TanStack) – Used for efficient client-side data fetching and caching, particularly for admin-only pages.
- React Hook Form – For lightweight and performant form handling with integrated validation.
- MUI (Material UI) – Provides a polished and accessible UI component library for consistent design.
- Jest + React Testing Library – For basic component testing.

💡 Architectural Decisions

- SSR for public blog posts – Helps improve SEO and page load performance for readers.

- Client-side rendering for admin pages – Admin functionality (like post editing) is protected and not publicly accessible, so I chose to fetch data on the client to reduce server load and simplify the SSR logic.

- Firebase as a backend – I opted for Firebase to quickly integrate authentication, database, and file storage without needing to manage a custom backend infrastructure.

📸 Features

- Login/logout using email and password.
- View list of posts and read individual post details.
- Create, update, and delete posts (admin only).
- Upload and attach images to blog posts.
- Basic component testing using Jest/RTL.

🚧 Limitations & Future Improvements
Due to time constraints, the following features are not implemented but would be considered for future development:

- Comments section – Would require multi-user support, user registration, and profile images.
- Like system – Also dependent on having multiple user accounts.
- Pagination or virtualized lists – For better performance with many posts/comments.
- CAPTCHA – Should be added to login form to prevent automated abuse.
- Mobile responsiveness – Needs improvements for a better mobile experience.
- Extended test coverage – Including logic, edge cases, and validation.
- Improved SEO – Add meta tags, structured data, sitemap, canonical URLs.
- PWA support – For offline access and installability.
- Localization – Internationalization and support for multiple languages.

🏁 Running Locally

# Clone the repository

git clone https://github.com/houbass/applifting.git

# Install dependencies

npm install

# Run the development server

npm run dev

🔐 API Keys Configuration
To run the project locally, you’ll need valid Firebase credentials and a Google OAuth client ID.

These are defined in:
src/config/apiKeys.ts

If you want to test the app locally, you'll need to update this file with:
firebaseApiKey
googleId

Contact me if you need temporary test credentials for evaluation purposes.
