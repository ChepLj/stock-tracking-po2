import React, { useEffect } from "react";
import { IonPage, IonContent, IonText, useIonRouter } from "@ionic/react";
import icon from '../../source/img/favicon.png'
const LoadingPage: React.FC = () => {
  const router = useIonRouter();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      // router.push("/page/Main", "forward", "replace");
       window.location.href = "/page/Main";
    }, 700);

    return () => clearTimeout(timer); // Cleanup timer
  }, [router]);

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    textAlign: "center" as const,
  };

  const textStyle = {
    marginBottom: "20px",
    color: "#333",
    fontSize: "20px",
  };

  const dotsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    fontSize: "44px",
    color: "red",
  };

  const dotStyle = {
    animation: "blink 1.5s infinite",
  };
  const imageStyle = {
    width: "150px",
    height: "150px",
    marginTop: "180px",
  };
  return (
    <IonPage>
      <IonContent style={containerStyle}>
        {/* Redirect Message */}
        <IonText>
          <h2 style={textStyle}>Đang chuyển hướng ...</h2>
        </IonText>

        {/* Loading Dots */}
        <div style={dotsStyle}>
          <span style={{ ...dotStyle, animationDelay: "0s" }}>•</span>
          <span style={{ ...dotStyle, animationDelay: "0.2s" }}>•</span>
          <span style={{ ...dotStyle, animationDelay: "0.4s" }}>•</span>
        </div>
        {/* Image in the Middle */}
        <img
          src={icon} // Replace with your image URL
          alt="Redirecting"
          style={imageStyle}
        />
        {/* CSS Keyframes for blinking dots */}
        <style>
          {`
          @keyframes blink {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};

export default LoadingPage;
