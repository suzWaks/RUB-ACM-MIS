// Loading.tsx
"use client";
import React, { CSSProperties, useEffect } from "react";

const Loading: React.FC = () => {
  useEffect(() => {
    // Inject global styles only on the client side
    if (typeof window !== "undefined") {
      const globalStyle = document.createElement("style");
      globalStyle.innerHTML = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
      document.head.appendChild(globalStyle);
    }
  }, []);

  return (
    <div style={styles.loadingContainer}>å
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading, please wait...</p>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    color: "#333",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "6px solid #e0e0e0",
    borderTopColor: "#3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2em",
    fontWeight: 500,
    color: "#555",
  },
};

export default Loading;
