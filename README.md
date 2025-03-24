# Frontend - Audio Recorder and Analysis (My Business Care Team Test)

## Overview
This project is a frontend application built with React that allows users to record audio, transcribe it, and analyze the transcription. It interacts with a backend service for audio-to-text conversion and text analysis. The updated version includes improvements in the UI and additional features such as history tracking and more user-friendly interactions.
---


## Features
- **Record Audio**: Record audio using the browser's microphone.
- **Upload Audio for Transcription**: Upload recorded audio for transcription.
- **Dynamic Display of Transcription**: Display transcribed text dynamically as it’s received from the backend.
- **Text Analysis**: Perform text analysis on the transcription.
- **Interactive UI**: A smooth user experience with updated UI elements.
- **Loading Indicator**: A loading spinner appears when waiting for API responses.
- **History Feature**: A new button in the top-right corner to open a history interface displaying previously transcribed and analyzed text.
- **Flexible History Items**: History items display with a responsive layout, showing the transcription text, analysis, and the date of each record.
- **Delete and Re-analyze**: Ability to delete or re-analyze previous transcriptions directly from the history interface.
---


## Technologies Used
- **React** - For building the frontend UI.
- **JavaScript (ES6)** - For logic implementation.
- **CSS** - For styling the application.
- **Fetch API** - For sending HTTP requests to the backend.
- **React Hooks (useState, useEffect)** - For managing state and side effects in the UI.
---


## Live Demo
[Live Demo](https://distinctive-faunie-my-bisuness-care-team-frontend-274b3477.koyeb.app/)


---


## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended version: LTS)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run the Application
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yassein47/my-business-care-team-test-frontend-v2.git
   cd my-business-care-team-frontend
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
   or using yarn:
   ```sh
   yarn install
   ```
3. **Start the Development Server:**
   ```sh
   npm start
   ```
   or using yarn:
   ```sh
   yarn start
   ```
4. Open `http://localhost:3000` in your browser.

---


## Project Structure
```
├── src
│   ├── components
│   │   ├── TypingEffect.js  # Component for animated text display
│   ├── Services
│   │   ├── httpService.js  # Service for making API requests
│   ├── App.js  # Main React Component
│   ├── App.css  # Stylesheet for the app
│   ├── index.js  # Entry point
│
├── public
│   ├── assets
│   │   ├── main-logo.png  # Project logo
│   │   ├── record.png  # Icon for recording button
│   │   ├── send.png  # Icon for sending recorded audio
│
├── package.json  # Project dependencies
└── README.md  # Project documentation
```

---


## API Endpoints Used
- **Transcription API:**
  - Endpoint: `/transcribe`
  - Method: `POST`
  - Body: Audio file (wav format)
  - Response: JSON containing transcribed text

- **Analysis API:**
  - Endpoint: `/analyze`
  - Method: `POST`
  - Body: JSON `{ "text": "transcribed text" }`
  - Response: JSON containing analysis results
 
- **Delete API:**
  - Endpoint: `/delete:id`
  - Method: `delete`
  - Body: JSON `{ "id": 1 }`
  - Response: JSON containing { massege: "ok" }

- **Get API:**
  - Endpoint: `/transcripts`
  - Method: `get`
  - Body: ``
  - Response: JSON containing all records

---


## Usage
- Click the **record** button to start recording audio.
- Click **stop** to finish recording.
- The audio is uploaded automatically for transcription.
- Once transcribed, the text is displayed.
- Click **Analyze** to get insights from the transcription.

---


## Troubleshooting
- Ensure your microphone permissions are enabled in the browser.
- If transcription fails, check backend service availability.
- Restart the development server if changes are not reflected.

---


## License
This project is licensed under the MIT License.

---

For any issues, feel free to contact the project maintainers.

---


## Writer
React.js with Love..

---

# Yassein


