import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "@/config/firebase";

const useAudioFileUpload = () => {

  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async ( audioFile: File ) => {

    setUploading(true);
    setProgress(0);

    const audioRef = ref(storage, `audios/${audioFile.name}`);
    const uploadTask = uploadBytesResumable(audioRef, audioFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calculate progress percentage
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
      },
      (error) => {
        console.error("Upload error:", error);
        alert("Upload failed.");
        setUploading(false);
      },
      async () => {
        // Get download URL after successful upload
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save URL to Firestore
        await addDoc(collection(db, "audioFiles"), { url: downloadURL });

        alert("Audio uploaded successfully!");
        setUploading(false);
        setProgress(0);
      }
    );
  };

  return { handleUpload, isUploading, progress };
}

export default useAudioFileUpload;