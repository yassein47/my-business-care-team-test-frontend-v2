
import axios from "axios";

const BaseURL = 'http://localhost:5000/';

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