
import axios from "axios";
import { useState, useEffect } from "react";

const BaseURL = 'http://localhost:5000/';
//const BaseURL = 'https://my-business-care-team-backend-production-0224.up.railway.app/';

const transcribe = 'transcribe';
const analyze = 'analyze';
const transcribes = 'transcripts';


export class HTTP {

 deleteRecord = async (id) => {
    await fetch(`${BaseURL}delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
      response.json();
 })
    .then(data => {
        if (data.message) {
            console.log(data.message);
            return true; 
        }
    })
    .catch(error => {
        console.error('Error:', error); 
        return false;
    });
}

getTranscripts =async () => {
    return (await fetch(BaseURL + transcribes)).json();
}

    async transcribeFunction(formData) {
        return await fetch(BaseURL + transcribe, {
            method: "POST",
            body: formData,
        });
    }



    async analyzeFunction(transcription, id) {
        try {
          return await fetch(BaseURL + analyze, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id }),
          });
        } catch (error) {
          //console.error("Error analyzing text:", error);
          //throw error;
        }
      }
}