import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db, storage } from "@/config/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";

// Types
import { FormData } from "@/components/types";


const useAudioFileUpload = () => {

  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const userInfo = useSelector(selectUser);
  const uid = userInfo?.uid;
  

  const handleUpload = async ( formData: FormData ) => {

    const projectName = formData.projectName;
    const projectNameFormated = formData.projectName.toLowerCase().split(' ').join('_');

    setUploading(true);
    setProgress(0);
    try{
      if(formData.audioPreview?.file) {
        const audioRef = ref(storage, `audio/${uid}/${projectNameFormated}`);
        const uploadTask = uploadBytesResumable(audioRef, formData.audioPreview?.file);
  
        // check if this project already exist    
        const projectId = uid + '_' + projectNameFormated
        const projectRef = doc(db, "audio", projectId);
        const projectSnap = await getDoc(projectRef);
        const isProjectExist = projectSnap.exists();

        if(isProjectExist) {
          console.error("PROJECT WITH THIS NAME ALREADY EXIST")
        } else {
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
    
              if(uid) {
                // Save to database
                await setDoc(projectRef, { 
                  projectName: projectName,
                  url: downloadURL,
                  uid: uid,
                  instruments: formData.instrumentSelection,
                  style: formData.styleSelection 
                })
    
                const userRef = doc(db, "users", uid)
                await updateDoc(userRef, {
                  projectIds: arrayUnion(projectId) 
                })
              }
              
              alert("Audio uploaded successfully!");
              setUploading(false);
              setProgress(0);
            }
          )
        }
      }
    } catch(err) {
      console.error(err);
    }
  };

  return { handleUpload, isUploading, progress };
}

export default useAudioFileUpload;