import React from "react";

const HowToUse = () => {
  return (
    <div className="how-to-use-container" style={{ padding: "20px" }}>
      <h1>How to Use Patch File Generator</h1>
      <ol>
        <li>
          <strong>Lock Code for Comparison:</strong>
          <ul>
            <li>Paste the code you want to lock into the editor.</li>
            <li>Add the file path (optional, but recommended).</li>
            <li>
              Click the <strong>"Lock Code"</strong> button. A message will
              confirm that the code has been locked.
            </li>
          </ul>
        </li>
        <li>
          <strong>Compare New Code:</strong>
          <ul>
            <li>Paste the new version of your code into the editor.</li>
            <li>
              Ensure the file path matches the locked code (if applicable).
            </li>
            <li>
              Click the <strong>"Compare Code"</strong> button to generate the
              differences.
            </li>
            <li>
              The differences will be displayed as a patch file in the output
              area.
            </li>
          </ul>
        </li>
        <li>
          <strong>Download Patch File:</strong>
          <ul>
            <li>
              After generating a patch file, click the <strong>"Download"</strong> button to save the file to your computer.
            </li>
            <li>
              Share the patch file with your team or apply it to your
              repositories.
            </li>
          </ul>
        </li>
        <li>
          <strong>Dark Mode:</strong>
          <ul>
            <li>
              Use the dark mode toggle in the header for a better coding
              experience during late hours.
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default HowToUse;
