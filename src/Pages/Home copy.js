import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

function Home() {
  const [code, setCode] = useState("");
  const [filePath, setFilePath] = useState("");
  const [patch, setPatch] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [message, setMessage] = useState(""); // API response message

  const lockCode = async () => {
    if (!code.trim()) {
      // alert("Please paste code to lock.");
      setMessage("Error: No code to lock! Please enter some code.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/lock`, { code, filePath });
      setIsLocked(true);
      setMessage("Code locked successfully!");
      // alert("Code locked successfully!");
    } catch (error) {
      console.error("Error locking code:", error);
      setMessage("Error locking code: " + error.message);
      // alert("Failed to lock code. Please try again.");
    }
  };

  const compareCode = async () => {
    if (!code) {
      // alert("Please paste code to compare.");
      setMessage("Error: No locked code to compare against!");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/compare`, {
        code,
        filePath,
      });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        // setPatch(response.data.patch);
        setPatch(response.data.patch || "");
        setMessage(response.data.message || "Comparison completed!");
      }
    } catch (error) {
      console.error("Error comparing code:", error);
      // alert("Failed to compare code. Please try again.");
      setMessage("Error comparing code: " + error.message);
    }
  };

  const resetApp = () => {
    setCode("");
    setFilePath("");
    setPatch("");
    setIsLocked(false);
    setMessage("Application reset successfully.");
  };

  const downloadPatch = (patchContent) => {
    const blob = new Blob([patchContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filePath
      ? `${filePath.split("/").pop()}.patch`
      : "code.patch";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <main className="app-container">
        <h1>Patch File Generator</h1>
        <p>
          This is your go-to tool for creating and managing patch files. Start
          by locking your code, comparing changes, and downloading the patch
          files for seamless collaboration.
        </p>
        {message && <p className="api-message">{message}</p>}
        <div>
          <label>
            <strong>File Path (Optional):</strong>
          </label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="Enter file path (e.g., /path/to/file)"
          />
        </div>

        <div>
          <label>
            <strong>Code:</strong>
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={15}
            placeholder="Paste your code here..."
          ></textarea>
        </div>

        <div className="button-group">
          {!isLocked ? (
            <button className="lock-btn" onClick={lockCode}>
              Lock Code
            </button>
          ) : (
            <button className="compare-btn" onClick={compareCode}>
              Compare Code
            </button>
          )}
          <button className="reset-btn" onClick={resetApp}>
            Reset
          </button>
        </div>

        {patch && (
          <div className="patch-output">
            <h2>Patch Output</h2>
            <textarea value={patch} readOnly rows={15}></textarea>
            <button
              className="download-btn"
              onClick={() => downloadPatch(patch)}
              disabled={!patch}
            >
              Download Patch
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
