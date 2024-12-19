import { useContext, useState } from "react";

import documentIcon from "../../source/img/icon.png";
import style from "./LoginLayout.module.css";
import checkAppPermission from "./function/checkAppPermission";
import getAuthorFromAccountDB from "./function/getAuthorFromAccountDB";
import { AuthContext } from "../../context/loginContext";
import { encryptCrypto } from "../../components/function/crypto";




const LoginPage = () => {
  const { setAuthorLogin } = useContext<any>(AuthContext);
  const [isToastOpen, setIsToastOpen] = useState<{ isOpen: boolean; messenger?: string }>({ isOpen: false });

  //TODO: handle toast
  const handleToast = (input: any) => {
    setIsToastOpen(input);
    setTimeout(() => {
      setIsToastOpen({ isOpen: false });
    }, 5000);
  };
  //TODO_END: handle toast
  const now = new Date();
  const handelManualLogin = () => {
    const userNameElm = document.querySelector('input[name="login-username"]') as HTMLInputElement;
    const passwordElm = document.querySelector('input[name="login-password"]') as HTMLInputElement;
    //TODO: Dispatch when got User
    const handelManualLoginFirebaseUser = ({ type, payload }: { type: string; payload: any }) => {
      if (type === "SUCCESSFUL") {
        let isMatching = false;
        for (const key in payload) {
          if (userNameElm?.value === key) {
            if (passwordElm?.value == payload?.[key].password) {
              if (payload?.[key]?.level === "lock") {
                handleToast({ isOpen: true, messenger: "Tài khoản này đã bị khóa! Liên hệ Mr.Sỹ để biết thêm chi tiết !" });
              } else {
                const authLoginTemp = payload?.[key];
                
                if (checkAppPermission(authLoginTemp.app)) {
                  authLoginTemp.timestamp = now.getTime() // Save the current timestamp
                  localStorage.setItem("authorLogin", encryptCrypto(authLoginTemp));
                  setAuthorLogin(authLoginTemp);
                } else {
                  handleToast({ isOpen: true, messenger: "Tài khoản này chưa được cấp phép hoặc bị chặn truy cập ứng dụng này ! Liên hệ Mr.Sỹ để biết thêm chi tiết !" });
                }
              }
            } else {
              handleToast({ isOpen: true, messenger: "Sai mật khẩu" });
            }
            isMatching = true;
            break;
          }
        }
        {
          !isMatching && handleToast({ isOpen: true, messenger: "Tài khoản không tồn tại !" });
        }
      }
      //TODO_END: Dispatch when got User
    };

    if (userNameElm.value) {
      const childRef = "User/";
      getAuthorFromAccountDB(childRef, handelManualLoginFirebaseUser);
    }
  };

  //TODO: show password
  const showPassword = () => {
    const inputPassElm = document.querySelector("input[name='login-password']") as HTMLInputElement;
    if (inputPassElm!.type === "password") {
      inputPassElm!.type = "text";
    } else {
      inputPassElm!.type = "password";
    }
  };

  //TODO_END: show password
  ////////////////

  return (
    <section className={style.mainContainer}>
      <header className={style.header}>
        <div className={style.headerItem}>Login</div>
      </header>
      <section className={style.contentContainer}>
        <img className={style.icon} src={documentIcon} />
        <div className={style.inputContainer}>
          <div className={style.item}>
            <span className={style.itemLabel}>User Name</span>
            <input className={style.itemInput} placeholder="Enter id" name="login-username"></input>
          </div>
          <div className={style.item}>
            <span className={style.itemLabel}>Password</span>
            <input
              className={style.itemInput}
              placeholder="Enter password"
              name="login-password"
              type="password"
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  handelManualLogin();
                }
              }}
            ></input>
          </div>
          <div className={style.showPassWord} onClick={showPassword}>
            Show password
          </div>
        </div>
        <button className={style.button} onClick={handelManualLogin}>
          Login
        </button>

        {isToastOpen.isOpen && <div className={style.toast}>{isToastOpen.messenger}</div>}
      </section>
    </section>
  );
};

export default LoginPage;
