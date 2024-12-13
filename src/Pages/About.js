import React from "react";

const About = () => {
  return (
    <div className="about-container" style={{ padding: "20px" }}>
      <h1>About Patch File Generator</h1>
      <p>
        Welcome to the <strong>Patch File Generator</strong>, your one-stop
        solution for creating and managing patch files seamlessly. Whether
        you're a developer collaborating on code or a team maintaining software
        updates, this tool makes generating, comparing, and sharing patch files
        simple and intuitive.
      </p>
      <p>
        With features like <strong>code locking</strong>,{" "}
        <strong>comparison tools</strong>, and the ability to{" "}
        <strong>download patch files</strong>, you can streamline your workflow
        and focus on building better software.
      </p>
      <h2>Key Features:</h2>
      <ul>
        <li>Lock code for comparison to avoid conflicts.</li>
        <li>Compare new code with the locked version and generate a patch file.</li>
        <li>Download and share patch files easily.</li>
      </ul>
    </div>
  );
};

export default About;
