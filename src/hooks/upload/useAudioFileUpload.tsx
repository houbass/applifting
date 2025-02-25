import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db, storage } from "@/config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "@/redux/slices/userSlice";
import { setAlert } from "@/redux/slices/userSlice";
import useGetTimelineData from "../firebase/useGetTimelineData";

// Types
import { FormData } from "@/components/types";

// Utils
import { formatedFileName } from "./utils";

const useAudioFileUpload = () => {

  // Hooks
  const dispatch = useDispatch();
  const { fetchCollection } = useGetTimelineData();

  // States
  const userData = useSelector(selectUserData);
  const uid = userData?.uid;
  const userName = userData?.userName
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  function formatString(text: string) {
    return text.split(' ').join('_');
  }

  function formatStringArr(textArr: string[]) {
    const formatedStrings = textArr.map(item => formatString(item));
    return formatedStrings
  }

  function getCombinations(instruments: string[] | undefined, styles: string[] | undefined) {
    const thisInstruments = instruments ? [...instruments].sort() : [];
    const thisStyles = styles ? [...styles].sort() : [];
    const joinedArrays = thisInstruments.concat(thisStyles);
    const formatedArr = formatStringArr(joinedArrays);
    const result: string[] = [];
    
    // Generate all combinations
    const generateCombinations = (start: number, currentCombination: string[]) => {
        if (currentCombination.length > 0) {
            result.push(currentCombination.join('-'));
        }
        
        for (let i = start; i < formatedArr.length; i++) {
            currentCombination.push(formatedArr[i]);
            generateCombinations(i + 1, currentCombination);
            currentCombination.pop();
        }
    };
    
    if(joinedArrays.length > 0) {
      // Start generating from the first element
      generateCombinations(0, []);
    }

    return result;
  }
  
  // Utils
  const handleUpload = async ( formData: FormData ) => {
    if(!uid) return

    const { projectName, instrumentSelection, styleSelection, description, audioPreview } = formData;
    const projectNameFormated = formatedFileName(projectName);
    const searchTags = getCombinations(instrumentSelection, styleSelection);

    try{
      if(formData.audioPreview?.file) {
        const metadata = {
          customMetadata: {
            uid: uid, // Store uploader's UID
          },
        };

        const audioRef = ref(storage, `audio/${uid}/${projectNameFormated}`);
        const uploadTask = uploadBytesResumable(audioRef, formData.audioPreview?.file, metadata);
  
        // check if this project already exist    
        const projectId = uid + '_' + projectNameFormated
        const projectRef = doc(db, "audio", projectId);
        const projectSnap = await getDoc(projectRef);
        const isProjectExist = projectSnap.exists();

        if(isProjectExist) {
          console.error("PROJECT WITH THIS NAME ALREADY EXIST")
          dispatch(setAlert({
            text: 'PROJECT WITH THIS NAME ALREADY EXIST',
            type: 'error'
          }))
          
        } else {
          setUploading(true);
          setProgress(0);
          setMessage('Uploading audio file');
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Calculate progress percentage
              const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progressPercent);
            },
            (error) => {
              console.error("Upload error:", error);
              setMessage('Upload failed');
              setUploading(false);
            },
            async () => {
              // Get download URL after successful upload
              setMessage('Saving to database')
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
              if(uid) {
                // Save to database
                await setDoc(projectRef, { 
                  projectName: projectName,
                  url: downloadURL,
                  uid: uid,
                  instruments: instrumentSelection,
                  style: styleSelection,
                  timeStamp: Date.now(),
                  duration: audioPreview?.duration,
                  waveform: audioPreview?.waveform,
                  userName: userName,
                  userPhotoURL: userData.photoURL,
                  coverURL: '',
                  description,
                  searchTags,
                })
    
                const userRef = doc(db, "users", uid)
                await updateDoc(userRef, {
                  projectIds: arrayUnion(projectId) 
                })
              }
              
              await fetchCollection();
              setMessage('Project uploaded successfully')
              setUploading(false);
              setProgress(0);
            }
          )
        }
      }
    } catch(err) {
      console.error(err);
      setMessage('Upload failed');
    }
  };

  return { 
    handleUpload, 
    isUploading, 
    progress, 
    message
  };
}

export default useAudioFileUpload;