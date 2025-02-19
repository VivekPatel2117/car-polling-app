import { supabase } from "./supabseClient";

const uploadToSupabaseStorage = async ({
  file,
  type,
}: {
  file: File;
  type: string;
}): Promise<string | null> => {
  if (!file) {
    console.error("No file selected");
    return null;
  }

  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string;
  const filePath = `${type}/${Date.now()}_${file.name}`;
  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }
  console.log(data)

  // Get the public URL of the uploaded file
  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return publicUrlData.publicUrl;
};

export default uploadToSupabaseStorage;