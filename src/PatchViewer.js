import React from "react";

function PatchViewer({ patch }) {
  return (
    <div>
      <h2>Generated Patch</h2>
      <pre>{patch}</pre>
    </div>
  );
}

export default PatchViewer;
