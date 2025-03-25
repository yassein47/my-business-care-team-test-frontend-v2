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
  const http = new HTTP();
  const YasseinMessege = "I am working on this project as part of the hiring test.Hoping it meets the required standards.";



  const [transcriptionList, settranscriptionList] = useState([]);
  const [transcriptionListLoading, settranscriptionListLoading] = useState(true);
  const [idToAnalyze, setidToAnalyze] = useState(null);
  const [inHistory, setinHistory] = useState(false);
  const [refreash, setrefreash] = useState(false);
  const [analyzeLoading, setanalyzeLoading] = useState(false);
  const [deepgramLoading, setdeepgramLoading] = useState(false);

  const startRecording = async () => {
    setAnalysis(null);
    setTranscription(null); 
    sethaveRecording(false);
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
    setdeepgramLoading(true);
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
        setTranscription(null);
        setTranscription(data);
        setidToAnalyze(data.id)
        setconverOK(true);
      }
    } catch (error) {
      setconverOK(false);
      seterrmsg('There was an error transcribing the audio. Please try again.');
      //alert("There was an error transcribing the audio. Please try again.");
    }
  };

  const analysText = async() => {
    setAnalysis(null);
    setanalyzeLoading(true);
    settranscriptionListLoading(true);
    try {

      const response = await http.analyzeFunction(transcription, idToAnalyze);

      if (response.status === 500) {
        setanalysisOK(false);
        seterrmsga('Failed to analyze text');
      }

      const data = await response.json();
      setanalysisOK(false);
      setanalysisOK(true);
      setAnalysis("");
      if (transcriptionList && inHistory) {
        /*settranscriptionList([]);
        const res = await http.getTranscripts()
        settranscriptionList(res) ;*/
      }
      else{
        setAnalysis(data.analysis);
      }
      
      settranscriptionListLoading(false);
    } catch (error) {
      setanalysisOK(false);
      seterrmsga('Error analyzing text: Analysis failed. Please try again.');
    }
  }


  
  const closeFunction = () =>{
    setAnalysis(null);
    setTranscription(null); 
    sethaveRecording(false);
  }

  const showList = async () => {
    settranscriptionListLoading(true);
    setinHistory(true);
    const res = await http.getTranscripts();
    settranscriptionList(Array.isArray(res) ? res : []);
    setrefreash(false);
  }
  
  const hideList = async () => {
    setinHistory(false);
    settranscriptionList([]);
  }


  const deleteRecord = (id) => {
    const del = async () =>{
      const del = await http.deleteRecord(id);

      settranscriptionListLoading(true);   
      const res = await http.getTranscripts();
      settranscriptionList(res);
      settranscriptionListLoading(false); 
      setrefreash(false); 
      setinHistory(true);
    }
    del()
  }
  
  useEffect(() => {
    const re = async () => {
      if (idToAnalyze !== null) {
        if (refreash && inHistory) {
          settranscriptionListLoading(true); 
  
          await analysText();
          const res = await http.getTranscripts();

          settranscriptionList(res);
          settranscriptionListLoading(false); 
          setrefreash(false); 
          setinHistory(true);
        }
      }
    };
  
    re(); 
  
  }, [refreash]);


  useEffect(() => {
    settranscriptionListLoading(false);
  }, [transcriptionList]); 



  useEffect(() => {
    if(analysis){
      setanalyzeLoading(false);
    }
  }, [analysis]); 

  useEffect(() => {
    if (transcription) {
      setanalysisOK2(true);
      setdeepgramLoading(false);
    }
  }, [transcription]);

  return (
  

    <div className="basecontainer">
      <div className="left-section">
        <a href="https://mybcat.com/" target="_blank">
          <img src="assets/main-logo.png" alt="My Business Care Team  Logo" className="logo"/>
        </a>
        <div className="description">
          <TypingEffect text={YasseinMessege}/>
        </div>
      </div>
      <div className="right-section">
        <div className="container">
          <div className="header container-list-heades">
            <img src="assets/main-logo.png" alt="My Business Care Team  Logo" className="logo-min item-container-list-heades"/>
            <h1 className="title item-container-list-heades">Project Test v 2.0</h1>

            {(!inHistory) && (
              <div
              onClick={showList}
              className="history-button item-container-list-heades"
            >
              <i className='fas fa-clipboard-list'></i>
              History 
          </div>
            )}

            {(inHistory) && (
              <div
                onClick={hideList}
                className="history-button item-container-list-heades"
              >
                back 
                <i className='far fa-arrow-alt-circle-right'></i>
            </div>
            )}
            
          </div>
          {(inHistory) &&(
            <div className="container-in">
            {(!transcriptionListLoading) && (
                <div className="list-history scrollable-element">
                  {Array.isArray(transcriptionList) && transcriptionList.map((item) => (
                  <div className={item.analyse ? (
                    "item-list-transcription-container"
                  ) : (
                    "item-list-transcription-container-no-analyze"
                  )} key={item.id}>
                    <div className="container-list-heades">
                      <p className="date-item item-container-list-heades">{new Date(parseFloat(item.timestamp)).toString()}</p>
                      
                      <div className="container-list-heades2">
                        <div 
                          className="btn btn-info btn-sm item-container-list-heades"
                          onClick={ ()  => {
                            setrefreash(true);
                            setidToAnalyze(item.id);
                          }}
                        >
                          {item.analyse ? (
                            <span className="glyphicon glyphicon-repeat"></span>
                          ) : (
                            <i className="fas fa-puzzle-piece"></i>
                          )}
                        </div>


                        <div 
                          className="btn btn-danger btn-xs item-container-list-heades"
                          onClick={ ()  => {
                            deleteRecord(item.id);
                          }}
                        >
                          <i class="material-icons">delete_sweep</i>
                        </div>
                      </div>

                    </div>
                    <p className="transcription-text-item">{item.transcript}</p>
                    <p className="analyze-text-item">{ item.analyse }</p>
                    
                  </div>
                ))}
                </div>
              )}
            {(transcriptionListLoading) && (
              <div className="loading-container">
                <img src="assets/load-35.gif" alt="loading" />
              </div>
            )}

            </div>
          )}

           {(!inHistory) && (
            <div className="container-in scrollable-element">
          <div 
            style={{ width: "30%", maxWidth: "100px", height: "auto" }}  
            onClick={recording ? stopRecording : startRecording} className="">
            {recording ? 
              <img src="assets/send.png" alt="Start Recording" style={{ width: "100%", height: "auto" }}  /> : 
              <img src="assets/record.png" alt="Start Recording" style={{ width: "100%", height: "auto" }}  />
            }
          </div>
            {haveRecording && (
              <div className="audio-container">
                <audio controls src={audioURL} className="audio-player"></audio>
              </div>
            )}

            {(deepgramLoading) && (
              <div className="loading-container">
                <img src="assets/load-35.gif" alt="loading" />
              </div>
            )}

            {(transcription && !(transcription?.transcription === "") && !(transcription?.error)) && (
              <div className="transcription-container">
                <div className="close-icon" onClick={closeFunction}></div>
                <h2 className="sub-title">Transcription:</h2>
                <div className="transcription-text"><TypingEffect text={transcription?.transcription} speed={3} /></div>
                <button
                  onClick={analysText}
                  className="analyse-button"
                >
                  <i className='fas fa-puzzle-piece'></i>
                  Analyse
                </button>
              </div>
            )}

            {(transcription?.transcription === "") && (
              <div className="error-message">
                <p>No transcription available. Please try again.</p>
              </div>
            )}
            {!converOK && (
              <div className="error-message">{errmsg}</div>
            )}

            {(transcription?.error) && (
                <div className="error-message">
                  <p>{transcription?.error}</p>
                </div>
              )}


            {analyzeLoading && (
              <div className="loading-container loading-container2">
                <img src="assets/load-35.gif" alt="loading" />
              </div>
            )}


            {analysis && (
              <div className="analysis-container">
                <h2 className="sub-title">Analysis:</h2>
                <TypingEffect text={analysis} speed={10} />
                
              </div>
            )}
          
            {(!analysisOK && analysisOK2) && (
              <div className="error-message">{errmsga}</div>
            )}
          </div>
           )} 
          
        </div>
      </div>
    </div>



    


  );
}
