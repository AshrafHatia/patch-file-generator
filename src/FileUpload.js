import React, { useState } from "react";
import { uploadFile, lockFile, compareFile } from "./api";

function FileUpload({ setPatch }) {
  const [file, setFile] = useState(null);
  const [lockedPath, setLockedPath] = useState("");

  const handleUpload = async () => {
    const response = await uploadFile(file);
    alert(`File uploaded: ${response.file_path}`);
  };

  const handleLock = async () => {
    const response = await lockFile(file.name);
    setLockedPath(response.file_path);
    alert("File locked!");
  };

  const handleCompare = async () => {
    const response = await compareFile(file, lockedPath);
    setPatch(response.patch);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleLock}>Lock</button>
      <button onClick={handleCompare}>Compare</button>
    </div>
  );
}

export default FileUpload;
