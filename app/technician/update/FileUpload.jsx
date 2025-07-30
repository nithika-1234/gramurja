import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getCustomerData, saveCustomerData } from './customerService';
import { supabase } from "./superbaseClient";
const FileUpload = () => {
const [file, setFile] = useState(null);
const [uploading, setUploading] = useState(false);
const [fileURL, setFileURL] = useState(null);
const searchParams = useLocalSearchParams();

const rawUid = searchParams.customerUid;
const customerId = Array.isArray(rawUid) ? rawUid[0] : rawUid;
const handleFileChange = (event) => {
setFile(event.target.files[0]);
};
// 👇 Upload logic moved here for clarity
const uploadImageToSupabase = async () => {
if (!file || !customerId) {
alert("Please select a file and ensure customer ID is available.");
return;
}
try {
setUploading(true);
const fileExt = file.name.split(".").pop();
const fileName = `${Date.now()}.${fileExt}`;
const filePath = `${customerId}/${fileName}`;
const { error: uploadError } = await supabase.storage
.from("user-files")
.upload(filePath, file, {
upsert: true,
});
if (uploadError) throw uploadError;
const { data: urlData, error: urlError } = await supabase.storage
.from("user-files")
.getPublicUrl(filePath);
if (urlError) throw urlError;
const publicUrl = urlData.publicUrl;
setFileURL(publicUrl);
// 🔗 Save to Firebase
await saveCustomerData(customerId, publicUrl);
alert("File uploaded and saved.");
} catch (err) {

console.error("Upload failed:", err.message);
alert("Upload failed: " + err.message);
} finally {
setUploading(false);
}
};
// 🔁 Load image if it exists
useEffect(() => {
const loadImage = async () => {
const imageUrl = await getCustomerData(customerId);
if (imageUrl) setFileURL(imageUrl);
};
loadImage();
}, [customerId]);
return (
<div style={styles.container}>
<div style={styles.imageContainer}>
{fileURL ? (
<img src={fileURL} alt="Uploaded file"
style={styles.imagePreview} />
) : (
<div style={styles.placeholder}>Image not uploaded</div>
)}
</div>
<div style={styles.buttonRow}>
<label style={{ ...styles.button, flex: 1, marginRight: "10px"
}}>
Choose Image
<input
type="file"
onChange={handleFileChange}
style={{ display: "none" }}
/>
</label>
<button
style={{ ...styles.uploadButton, flex: 1, marginLeft: "10px"
}}
onClick={uploadImageToSupabase}
disabled={uploading}

>
{uploading ? "Uploading..." : "Upload File"}
</button>
</div>
</div>
);
};
const styles = {
container: {
width: "100%",
height: "100vh",
background: "#fff",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
padding: "20px",
boxSizing: "border-box",
},
imageContainer: {
flex: 1,
display: "flex",
alignItems: "center",
justifyContent: "center",
},
imagePreview: {
width: "300px",
height: "300px",
objectFit: "cover",
borderRadius: "8px",
boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
},
placeholder: {
width: "300px",
height: "300px",
backgroundColor: "#f0f0f0",
color: "#888",
borderRadius: "8px",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "18px",

},
buttonRow: {
display: "flex",
width: "100%",
maxWidth: "320px",
justifyContent: "space-between",
marginTop: "30px",
},
button: {
padding: "10px 20px",
fontSize: "16px",
borderRadius: "5px",
border: "none",
backgroundColor: "#e0e0e0",
cursor: "pointer",
textAlign: "center",
},
uploadButton: {
padding: "10px 20px",
fontSize: "16px",
borderRadius: "5px",
border: "none",
backgroundColor: "#007bff",
color: "#fff",
cursor: "pointer",
textAlign: "center",
},
};
export default FileUpload;