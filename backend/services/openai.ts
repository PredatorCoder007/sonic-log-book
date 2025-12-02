import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// ------------------------------
// TRANSCRIBE AUDIO
// ------------------------------
export async function transcribeAudio(file: Express.Multer.File) {
  console.log("🔄 Transcribing audio using gpt-4o-transcribe...");

  const response = await client.chat.completions.create({
    model: "gpt-4o-transcribe",
    modalities: { audio: "transcription" },
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_audio",
            audio: {
              data: file.buffer.toString("base64"),
              format: "wav", // match your frontend format
            },
          },
        ],
      },
    ],
  });

  console.log("✔ Transcription complete.");
  return response.output_text;
}

// ------------------------------
// ANALYZE TRANSCRIPT (Medical Insights)
// ------------------------------
export async function analyzeMedicalTranscript(transcript: string) {
  const prompt = `
You are a medical document analyst.

Here is a transcript of a medical audio recording:

"""${transcript}"""

Your tasks:
1. Give a concise summary.
2. Extract key medical insights.
3. Identify symptoms, diagnoses, or medications if mentioned.
4. Present the final result in clean bullet points.
`;

  console.log("🔍 Generating medical insights using gpt-4o-mini...");

  const analysis = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an expert medical audio analysis assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return analysis.choices[0].message.content;
}
