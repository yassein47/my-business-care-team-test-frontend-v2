import { useState, useRef, useEffect } from "react";
import { HTTP } from './Services/httpService';
import './App.css';
import TypingEffect from './components/TypingEffect';

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [haveRecording, sethaveRecording] = useState(false);
  const [converOK, setconverOK] = useState(true);
  const [audioURL, setAudioURL] = useState(null);
  const [errmsg, seterrmsg] = useState(null);
  const [errmsga, seterrmsga] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analysisOK, setanalysisOK] = useState(true);
  const [analysisOK2, setanalysisOK2] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const http = new HTTP;
  const YasseinMessege = "I am working on this project as part of the hiring test.Hoping it meets the required standards.";
  const startRecording = async () => {
    try {
      sethaveRecording(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
  
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
  
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunks.current = [];
        await uploadAudio(audioBlob);
      };
  
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    sethaveRecording(true);
    setAnalysis(null);
  };

  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
  
    try {

      const response = await http.transcribeFunction(formData);
      console.log(response);
      if (response.status === 500) {
        //throw new Error("Failed to transcribe audio");
        seterrmsg('Failed to transcribe audio');
        setconverOK(false);
      }
      else{
        const data = await response.json();
        setTranscription(data);
        setconverOK(true);
      }
    } catch (error) {
      setconverOK(false);
      seterrmsg('There was an error transcribing the audio. Please try again.');
      //alert("There was an error transcribing the audio. Please try again.");
    }
  };

  const analysText = async() => {

    try {

      const response = await http.analyzeFunction(transcription);

      if (response.status === 500) {
        setanalysisOK(false);
        seterrmsga('Failed to analyze text');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      setanalysisOK(false);
      seterrmsga('Error analyzing text: Analysis failed. Please try again.');
    }
  }

  const closeFunction= () =>{
    setAnalysis(null);
    setTranscription(null); 
    sethaveRecording(false);
  }
  
  useEffect(() => {
    if (transcription) {
      console.log("Transcription updated:", transcription);
      setanalysisOK2(true);
    }
  }, [transcription]);

  return (
  

    <div class="basecontainer">
      <div class="left-section">
        <img src="assets/main-logo.png" alt="My Business Care Team  Logo" class="logo"/>
          <p class="description">
            <TypingEffect text={YasseinMessege}/>
          </p>
      </div>
      <div class="right-section">
        <div class="container">
          <div className="header">
            <img src="assets/main-logo.png" alt="My Business Care Team  Logo" class="logo-min"/>
            <h1 class="title">Project Test</h1>
          </div>
         
          <div 
            style={{ width: "30%", maxWidth: "100px", height: "auto" }}  
            onClick={recording ? stopRecording : startRecording} className="">
            {recording ? 
              <img src="assets/send.png" alt="Start Recording" style={{ width: "100%", height: "auto" }}  /> : 
              <img src="assets/record.png" alt="Start Recording" style={{ width: "100%", height: "auto" }}  />
            }
          </div>
          {haveRecording && (
            <div class="audio-container">
              <audio controls src={audioURL} class="audio-player"></audio>
            </div>
          )}

          {(transcription && !(transcription?.transcription == "") && !(transcription?.error)) && (
            <div class="transcription-container">
              <div class="close-icon" onClick={closeFunction}></div>
              <h2 class="sub-title">Transcription:</h2>
              <p class="transcription-text"><TypingEffect text={transcription?.transcription} speed={5} /></p>
              <button
                onClick={analysText}
                class="analyse-button"
              >
                Analyse
              </button>
            </div>
          )}

          {(transcription?.transcription == "") && (
            <div className="error-message">
              <p>No transcription available. Please try again.</p>
            </div>
          )}
          {!converOK && (
            <div class="error-message">{errmsg}</div>
          )}

        {(transcription?.error) && (
            <div className="error-message">
              <p>{transcription?.error}</p>
            </div>
          )}


          {analysis && (
            <div class="analysis-container">
              <h2 class="sub-title">Analysis:</h2>
              <TypingEffect text={analysis} speed={20} />
              
            </div>
          )}
        
          {(!analysisOK && analysisOK2) && (
            <div class="error-message">{errmsga}</div>
          )}
          </div>
      </div>
    </div>



    


  );
}
