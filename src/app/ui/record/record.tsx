"use client"
import React, { useState } from 'react';
import Image from "next/image";

const ScreenRecorder: React.FC = () => {
    const [hidden, setHidden] = useState(true)
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "motion" },
                audio: true
            });
            const recorder = new MediaRecorder(stream);
            recorder.ondataavailable = (e: BlobEvent) => {
                if (e.data.size > 0) {
                    setRecordedChunks(prev => [...prev, e.data]);
                }
            };
            recorder.start();
            setMediaRecorder(recorder);
            setRecording(true);
        } catch (error) {
            console.error('Error accessing display media.', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    };

    const saveRecording = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recording.webm';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <button onClick={() => setHidden(!hidden)}>Запись экрана</button>
        <div className={`fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-lg shadow-md flex items-center space-x-4 z-50 ${hidden ? "hidden" : ""}`}>

                {recording ? (
                    <>
                    <div className="animate-pulse flex items-center space-x-1">
                        <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                        <span>Recording...</span>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={stopRecording}>
                        <Image width={20} height={20} src="/stop_circle.svg"/>
                    </button>
                    </>
                ) : (
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={startRecording}>
                        <Image width={20} height={20} src="/play.svg"/>
                    </button>
                )}
            {recordedChunks.length > 0 &&
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                        onClick={saveRecording}>
                    <Image width={20} height={20} src="/save.svg"/>
                </button>}


        </div>
        </>
            );
};

export default ScreenRecorder;
