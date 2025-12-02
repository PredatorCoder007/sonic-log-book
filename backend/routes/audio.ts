import { Router } from "express";
import multer from "multer";
import { prisma } from "../services/db";
import { uploadAudio } from "../services/storage";
import { transcribeAudio, analyzeMedicalTranscript } from "../services/openai";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    const file = req.file!;
    
    // 1️⃣ Upload to Supabase
    const audioUrl = await uploadAudio(file);

    // 2️⃣ Transcribe
    const transcript = await transcribeAudio(file);

    // 3️⃣ Medical analysis
    const summary = await analyzeMedicalTranscript(transcript);

    // 4️⃣ Store in DB
    const record = await prisma.recording.create({
      data: { audioUrl, transcript, summary },
    });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Audio processing failed" });
  }
});

export default router;
