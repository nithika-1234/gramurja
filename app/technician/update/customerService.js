import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config"; // update path as needed
import { supabase } from "./superbaseClient"; // Supabase client
// Save customer image URL to Firestore
export const saveCustomerData = async (customerId, imageUrl) => {
try {
const docRef = doc(db, "customers", customerId);

await setDoc(docRef, { imgurl: imageUrl }, { merge: true }); //merge with existing
console.log("imgurl saved to Firestore!");
} catch (error) {
console.error("Error saving imgurl:", error);
}
};
// Get latest uploaded image for customer from Supabase
export const getCustomerData = async (customerId) => {
try {
// List all files in customer's folder, sorted by latest
const { data: files, error } = await supabase.storage
.from("user-files")
.list(customerId, {
limit: 100,
offset: 0,
sortBy: { column: "created_at", order: "desc" },
});
if (error) throw error;
if (!files || files.length === 0) {
console.log("No files found in folder");
return null;
}
// Get latest file
const latestFile = files[0];
const filePath = `${customerId}/${latestFile.name}`;
// Get public URL
const { data: url } = await supabase.storage
.from("user-files")
.getPublicUrl(filePath);
return url.publicUrl;
} catch (err) {
console.error("Error getting latest customer image:", err.message);
return null;
}
};