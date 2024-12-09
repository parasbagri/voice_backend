const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle text-to-speech
app.post("/synthesize", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const pythonScript = path.join(__dirname, "tts_synthesizer.py");
  const outputPath = path.join(__dirname, "audio", "output.mp3");
  const command = `python ${pythonScript} "${text}" "${outputPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error("Stderr:", stderr);
      return res.status(500).json({ error: stderr });
    }
    console.log(stdout);
    res.sendFile(outputPath);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
