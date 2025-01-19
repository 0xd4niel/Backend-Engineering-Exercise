# Backend-Engineering-Exercise

A small **TypeScript + Express** application for managing and selling tickets.

## Setup & Running

1. **Clone** the repository:

   ```bash
   git clone https://github.com/REIGEN06/Backend-Engineering-Exercise.git
   
   cd Backend-Engineering-Exercise
   ```

2. **Install** dependencies:

   ```bash
   npm install
   ```

3. **Build** and **start** the app:

   ```bash
   npm run build
   npm start
   ```
   The server listens on port `3000` by default.

4. For **development** mode (auto-restart on changes):

   ```bash
   npm run dev
   ```

## Usage Example

- **POST** `/api/checkout`  
  Example JSON body:
  ```json
  {
    "eventId": "1",
    "ticketTypeId": "1",
    "quantity": 2
  }
  ```
  Returns purchase details or an error if tickets are sold out.

The included version uses an in-memory database for demonstration(!)
