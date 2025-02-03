import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../Config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPost = async () => {
      const qeuryData = query(postCollectionRef, orderBy("time", "desc"));
      const data = await getDocs(qeuryData);
      const allPosts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostList(allPosts);
    };
    getPost();
  }, [postList]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, postList }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthentication = () => useContext(AuthContext);
