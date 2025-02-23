
import { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useDispatch } from 'react-redux';
import { setUser, setUserCheck } from '@/redux/slices/userSlice';

const useAuthListener = () => {
  // Hooks
  const dispatch = useDispatch();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      dispatch(setUserCheck(true));
      if (currentUser) {
        const userData = {
          email: currentUser.email as string,
          uid: currentUser.uid as string
        }
        // User is logged in
        dispatch(setUser(userData));
        
      } else {
        // User is logged out
        dispatch(setUser(null));
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);
}

export default useAuthListener;