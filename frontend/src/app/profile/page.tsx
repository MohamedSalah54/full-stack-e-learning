"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/store/authStore";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Divider,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useUserStore } from "@/zustand/store/profileStore";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import ImageWithLinks from "@/components/profile/fixed/ImageWithLinks";
import AccountSetting from "@/components/profile/AccountSetting";
import NavUser from "@/components/profile/fixed/NavUser";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  // const updateUserProfile = useUserStore((state) => state.updateUserProfile);
  // const uploadProfile = useUserStore((state) => state.uploadProfile);

  // const user = useAuthStore((state) => state.user);
  // const getMe = useAuthStore((state) => state.getMe);

  // const [form, setForm] = useState({
  //   firstName: "",
  //   lastName: "",
  //   bio: "",
  //   skills: [] as string[],
  //   qualifications: [] as string[],
  //   profilePicture: {
  //     secure_url: "",
  //     public_id: "",
  //   },
  // });

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!user) {
  //     getMe();
  //   } else {
  //     setForm({
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       bio: user.bio || "",
  //       skills: user.skills || [],
  //       qualifications: user.qualifications || [],
  //       profilePicture: user.profilePicture || {
  //         secure_url: "",
  //         public_id: "",
  //       },
  //     });
  //   }
  // }, [user, getMe]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const uploaded = await uploadProfile("", file);
  //   if (uploaded) {
  //     setForm((prev) => ({
  //       ...prev,
  //       profilePicture: uploaded,
  //     }));

  //     const setUser = useAuthStore.getState().setUser;
  //     const currentUser = useAuthStore.getState().user;

  //     if (currentUser) {
  //       setUser({
  //         ...currentUser,
  //         profilePicture: uploaded,
  //       });
  //     }

  //     toast.success("Image uploaded successfully");
  //   } else {
  //     toast.error("Failed to upload image");
  //   }
  // };

  // const handleSave = async () => {
  //   if (!user?._id) return;

  //   setLoading(true);
  //   try {
  //     await updateUserProfile(user._id, form);
  //     toast.success("Profile updated successfully");
  //   } catch (err) {
  //     toast.error("Failed to update profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (!user)
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
  //       <Loader loading={loading} />
  //     </div>
  //   );

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <Loader loading={loading} />
      </div>
      {!loading && (
        <>
          <div className="mt-10">
            <ImageWithLinks />
          </div>
          <div className="mt-10">
            <NavUser />
          </div>
        </>
      )}
    </>
    // <div className="min-h-screen flex items-center justify-center bg-gray-100 py-14 px-6">
    //   <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-md min-h-[400px]">
    //     {/* Left side */}
    //     {/* Left side */}
    //     <div className="w-full md:w-1/3 bg-gray-800 text-white flex flex-col items-center justify-center p-8">
    //       <Avatar
    //         sx={{ width: 100, height: 100, bgcolor: "#1f2937", fontSize: 36 }}
    //         src={form.profilePicture?.secure_url}
    //       >
    //         {!form.profilePicture?.secure_url &&
    //           user.firstName?.charAt(0).toUpperCase()}
    //       </Avatar>

    //       <Typography variant="h6" className="mt-4 font-semibold">
    //         {user.firstName} {user.lastName}
    //       </Typography>
    //       <Typography variant="body2" className="text-gray-300">
    //         {user.email}
    //       </Typography>

    //       <label className="mt-4 text-sm cursor-pointer bg-white text-black py-1 px-3 rounded hover:bg-gray-200 transition-all">
    //         Upload Photo
    //         <input
    //           type="file"
    //           accept="image/*"
    //           onChange={handleImageUpload}
    //           className="hidden"
    //         />
    //       </label>
    //     </div>

    //     {/* Right side */}
    //     <div className="w-full md:w-2/3 p-6 sm:p-8 md:p-10">
    //       <Typography
    //         variant="h6"
    //         className="text-gray-800 font-bold uppercase tracking-wide mb-2"
    //       >
    //         Information
    //       </Typography>
    //       <Divider className="mb-6" />

    //       <div className="grid grid-cols-2 gap-6 mt-3">
    //         <TextField
    //           label="First Name"
    //           name="firstName"
    //           value={form.firstName}
    //           onChange={handleChange}
    //           fullWidth
    //           variant="standard"
    //           InputProps={{
    //             disableUnderline: true,
    //             style: { background: "white" },
    //           }}
    //           InputLabelProps={{
    //             style: {
    //               fontSize: "20px",
    //               color: "#000000",
    //               fontWeight: "bold",
    //             },
    //             shrink: true,
    //           }}
    //         />

    //         <TextField
    //           label="Last Name"
    //           name="lastName"
    //           value={form.lastName}
    //           onChange={handleChange}
    //           fullWidth
    //           variant="standard"
    //           InputProps={{
    //             disableUnderline: true,
    //             style: { background: "white" },
    //           }}
    //           InputLabelProps={{
    //             style: {
    //               fontSize: "20px",
    //               color: "#000000",
    //               fontWeight: "bold",
    //             },
    //             shrink: true,
    //           }}
    //         />

    //         <TextField
    //           label="Bio"
    //           name="bio"
    //           value={form.bio}
    //           onChange={handleChange}
    //           fullWidth
    //           multiline
    //           minRows={3}
    //           variant="standard"
    //           InputProps={{
    //             disableUnderline: true,
    //             style: { background: "white" },
    //           }}
    //           InputLabelProps={{
    //             style: {
    //               fontSize: "20px",
    //               color: "#000000",
    //               fontWeight: "bold",
    //             },
    //             shrink: true,
    //           }}
    //           className="col-span-2"
    //         />

    //         <Autocomplete
    //           multiple
    //           freeSolo
    //           options={[]}
    //           value={form.skills}
    //           onChange={(event, newValue) =>
    //             setForm({ ...form, skills: newValue })
    //           }
    //           renderTags={(value: string[], getTagProps) =>
    //             value.map((option: string, index: number) => {
    //               const { key, ...rest } = getTagProps({ index });
    //               return (
    //                 <Chip
    //                   key={key}
    //                   variant="outlined"
    //                   label={option}
    //                   {...rest}
    //                 />
    //               );
    //             })
    //           }
    //           renderInput={(params) => (
    //             <TextField
    //               {...params}
    //               variant="standard"
    //               label="Skills"
    //               InputLabelProps={{
    //                 style: {
    //                   fontSize: "20px",
    //                   color: "#000000",
    //                   fontWeight: "bold",
    //                 },
    //                 shrink: true,
    //               }}
    //               InputProps={{
    //                 ...params.InputProps,
    //                 disableUnderline: true,
    //                 style: { background: "white" },
    //               }}
    //             />
    //           )}
    //           className="col-span-2"
    //         />

    //         <Autocomplete
    //           multiple
    //           freeSolo
    //           options={[]}
    //           value={form.qualifications}
    //           onChange={(event, newValue) =>
    //             setForm({ ...form, qualifications: newValue })
    //           }
    //           renderTags={(value: string[], getTagProps) =>
    //             value.map((option: string, index: number) => {
    //               const { key, ...rest } = getTagProps({ index });
    //               return (
    //                 <Chip
    //                   key={key}
    //                   variant="outlined"
    //                   label={option}
    //                   {...rest}
    //                 />
    //               );
    //             })
    //           }
    //           renderInput={(params) => (
    //             <TextField
    //               {...params}
    //               variant="standard"
    //               label="Qualifications"
    //               InputLabelProps={{
    //                 style: {
    //                   fontSize: "20px",
    //                   color: "#000000",
    //                   fontWeight: "bold",
    //                 },
    //                 shrink: true,
    //               }}
    //               InputProps={{
    //                 ...params.InputProps,
    //                 disableUnderline: true,
    //                 style: { background: "white" },
    //               }}
    //             />
    //           )}
    //           className="col-span-2"
    //         />
    //       </div>

    //       <Button
    //         variant="contained"
    //         onClick={handleSave}
    //         disabled={loading}
    //         sx={{ mt: 6, bgcolor: "#1f2937", ":hover": { bgcolor: "#111827" } }}
    //         fullWidth
    //       >
    //         {loading ? (
    //           <CircularProgress size={24} color="inherit" />
    //         ) : (
    //           "Save Changes"
    //         )}
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
