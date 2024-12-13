import React, { useState } from "react";

function Home() {
  const [code, setCode] = useState("");
  const [filePath, setFilePath] = useState("");
  const [patch, setPatch] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [lockedCode, setLockedCode] = useState("");
  const [message, setMessage] = useState(""); // API response message

  const lockCode = async () => {
    if (!code.trim()) {
      // alert("Please paste code to lock.");
      setMessage("Error: No code to lock! Please enter some code.");
      return;
    }
    try {
      setIsLocked(true);
      setLockedCode(code);
      setMessage("Code locked successfully!");
    } catch (error) {
      console.error("Error locking code:", error);
      setMessage("Error locking code: " + error.message);
    }
  };

  const compareCode = async () => {
    if (!code) {
      // alert("Please paste code to compare.");
      setMessage("Error: No locked code to compare against!");
      return;
    }
    try {
      const diff = generatePatch(lockedCode, code, filePath);
      setPatch(diff);
      setMessage("Comparison completed!");
    } catch (error) {
      console.error("Error comparing code:", error);
      // alert("Failed to compare code. Please try again.");
      setMessage("Error comparing code: " + error.message);
    }
  };

  const generatePatch = (from: string, to: string, path: string): string => {
    if (!from || !to) {
      return 'Error: Both "from" and "to" code must be provided.';
    }

    const fromLines = from.split("\n");
    const toLines = to.split("\n");
    const diff: string[] = [];

    // Get current date and time
    const now = new Date();
    const formattedDate = now.toLocaleString(); // Example: "12/11/2024, 10:30:15 AM"

    // Add date and file headers
    diff.push(`# Generated on ${formattedDate}`);
    diff.push(`--- ${path || "locked_code"}`);
    diff.push(`+++ ${path || "new_code"}`);

    let i = 0; // Line index
    let hunkStart = null; // Start of the hunk
    let hunkChanges: string[] = []; // Changes in the current hunk

    const flushHunk = () => {
      if (hunkChanges.length > 0) {
        const hunkHeader = `@@ -${hunkStart},${fromLines.length} +${hunkStart},${toLines.length} @@`;
        diff.push(hunkHeader);
        diff.push(...hunkChanges);
        hunkChanges = [];
        hunkStart = null;
      }
    };

    while (i < fromLines.length || i < toLines.length) {
      const fromLine = fromLines[i] || ""; // Handle undefined
      const toLine = toLines[i] || ""; // Handle undefined

      if (fromLine !== toLine) {
        if (hunkStart === null) hunkStart = i + 1; // Mark the start of the hunk

        if (fromLine) hunkChanges.push(`- ${fromLine}`);
        if (toLine) hunkChanges.push(`+ ${toLine}`);
      } else if (hunkStart !== null) {
        // Flush the hunk when a matching line is found
        flushHunk();
      }

      i++;
    }

    // Flush any remaining hunk
    flushHunk();

    return diff.join("\n");
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
