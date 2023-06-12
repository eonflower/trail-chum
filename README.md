# Trail Chum

This is a full-stack web application designed for long distance backpackers to track their daily logs based on user-inputted trails. Users can keep logs for all their favorite trails, including information such as mileage, campsites, and personal notes. The project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and includes user authentication.

## Features

- User signup and login functionality
- User authentication using JWT (JSON Web Tokens)
- Ability to create, view, update, and delete trail notes
- Ability to create, view, update, and delete trails
- User-specific data: Each user can only access and modify their own data
- Trail-specific notes: Users can associate notes with specific trails
- Trail-specific data: Users can create and manage their own trails

## Technologies Used

- Frontend: React, React Router, React Context API
- Backend: Node.js, Express.js
- Database: MongoDB (with Mongoose ORM)
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS (or any additional CSS frameworks or libraries you choose to use)

## API Routes

- **POST /auth/signup**: Create a new user account.
- **POST /auth/login**: Login with an existing user account.
- **GET /api/notes**: Get all notes.
- **GET /api/notes/:id**: Get a specific note by ID.
- **GET /api/notes/trail/:id**: Get all notes associated with a specific trail.
- **GET /api/notes/user**: Get all notes created by the authenticated user.
- **POST /api/notes**: Create a new note.
- **PUT /api/notes/:id**: Update a specific note by ID.
- **DELETE /api/notes/:id**: Delete a specific note by ID.
- **GET /api/trails**: Get all trails.
- **GET /api/trails/:id**: Get a specific trail by ID.
- **GET /api/trails/user**: Get all trails created by the authenticated user.
- **GET /api/trails/:id/notes**: Get all notes associated with a specific trail.
- **POST /api/trails**: Create a new trail.
- **PUT /api/trails/:id**: Update a specific trail by ID.
- **DELETE /api/trails/:id**: Delete a specific trail by ID.

Note: Replace `:id` with the actual ID value when making requests.

## Contributors

- [Myself](https://github.com/eonflower)

Feel free to contribute to the project by submitting bug reports, feature requests, or pull requests.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
