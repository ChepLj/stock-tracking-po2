import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({});
interface ITF_AuthorLogin {
  displayName: string;
  email:string;
  photoURL:string;
  provider:string;
  level: string;
  password: string;
  status:string;
  userName: string | number ;
  isPhone? : boolean
}

const AuthProvider = ({ children }: any) => {
  console.log("%cGoogleAuthProvider Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cGoogleAuthProvider Unmount", "color:red");
    };
  }, []);
  const [authorLogin, setAuthorLogin] = useState<ITF_AuthorLogin | null>(null);
  // console.log("🚀 ~ file: loginContext.tsx:6 ~ authorLogin:", authorLogin);
  return (
    <AuthContext.Provider value={{ authorLogin, setAuthorLogin }}>
      {/* The rest of your app */}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
