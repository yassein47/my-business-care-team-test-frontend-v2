
import axios from "axios";

const BaseURL = 'https://my-business-care-team-backend-production-0224.up.railway.app/';

const transcribe = 'transcribe';
const analyze = 'analyze';

export class HTTP {


    async transcribeFunction(formData) {
        return await fetch(BaseURL + transcribe, {
            method: "POST",
            body: formData,
        });
    }



    async analyzeFunction(transcription) {
        try {
          return await fetch(BaseURL + analyze, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: transcription.transcription }),
          });
        } catch (error) {
          //console.error("Error analyzing text:", error);
          //throw error;
        }
      }
}