export async function uploadImageToCloudinary(file) {
  const cloudName = "ddsbgplpc";
  const uploadPreset = "firstpreset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json(); // returns { secure_url, ... }
}
