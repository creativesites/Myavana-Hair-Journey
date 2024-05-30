# Myavana Hair Journey

## Overview

Welcome to the Myavana Hair Journey project! This software solution is designed to empower users to manage their hair care routines effectively. Developed with cutting-edge technologies, the application provides personalized hair care recommendations, tracks hair progress, and offers a community platform for sharing tips and experiences.

## Features

- **Personalized Hair Care Recommendations**: Get tailored advice based on hair type and condition.
- **Hair Progress Tracking**: Monitor hair health and progress over time with detailed metrics and visualizations.
- **Community Platform**: Connect with others, share tips, and get inspired by fellow users' hair journeys.
- **Product Recommendations**: Discover hair care products that match your specific needs and preferences.
- **User-Friendly Interface**: Enjoy a seamless and intuitive user experience designed with React and Next.js.

## Technology Stack

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Firebase
- **Styling**: Tailwind CSS

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher) or Yarn (v1.x or higher)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/creativesites/Myavana-Hair-Journey.git
    cd Myavana-Hair-Journey
    ```

2. Install dependencies:

    Using npm:
    ```bash
    npm install
    ```

    Using Yarn:
    ```bash
    yarn install
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root directory and add the following variables:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Run the development server:

    Using npm:
    ```bash
    npm run dev
    ```

    Using Yarn:
    ```bash
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## Building for Production

To create an optimized production build, run:

Using npm:
```bash
npm run build
```

Using Yarn:
```bash
yarn build
```

## Starting the Production Server

After building the project, you can start the production server with:

Using npm:
```bash
npm start
```

Using Yarn:
```bash
yarn start
```

## Contributing

We welcome contributions from the community. If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
