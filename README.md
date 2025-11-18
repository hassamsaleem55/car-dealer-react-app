# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your system.

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory and install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

This project uses environment variables to configure the active dealer theme and API endpoints.

1.  Create a `.env` file in the root of the project.
2.  Add the following variables to the `.env` file:

    ```
    VITE_DEALER=motors-hub
    VITE_API_BASE_URL=https://api.motors-hub.co.uk
    VITE_DEALER_TOKEN=9092acab-7235-414d-abe2-1ec55c6b50cb
    ```

    -   `VITE_DEALER`: Specifies the active dealer theme. You can change `motors-hub` to any other available dealer theme (e.g., `auto-drive-motors`, `dale-house`).
    -   `VITE_API_BASE_URL`: The base URL for the API from which dealer-specific data, such as car listings and configurations, is fetched.
    -   `VITE_DEALER_TOKEN`: A unique authentication token required to securely access the dealer's data from the API. This token ensures that only authorized requests can retrieve information.

### Running the Development Server

Once the dependencies are installed and the environment file is set up, you can run the development server:

```bash
npm run dev
```

This will start the Vite development server and open the application in your default browser.

---
