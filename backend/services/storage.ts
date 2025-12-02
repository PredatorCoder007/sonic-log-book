import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadAudio(file: Express.Multer.File) {
  const filePath = `audio-${Date.now()}.wav`;

  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .getPublicUrl(filePath);

  return data.publicUrl;
}
