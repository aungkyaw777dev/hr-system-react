import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera } from "lucide-react";


const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  nationality: z.string().min(1, "Please select nationality"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits"),
  gender: z.string().min(1, "Please select gender"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string>(
    // "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    "./public/image/profile-img.jpg"
  );


  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "kyawthura77",
      firstName: "Min",
      lastName: "Mahar",
      email: "kyawthura@gmail.com",
      nationality: "Myanmar",
      phoneNumber: "09798865247",
      gender: "Male",
    },
  });


  const onSubmit = (data: ProfileFormData) => {
    console.log("Form submitted:", data);
    alert(
      "Profile updated successfully! / ပရိုဖိုင် အောင်မြင်စွာ update လုပ်ပြီးပါပြီ!"
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#ced6d2] flex items-center justify-center px-10 py-14">
      <div className="bg-[#E8EDEB] rounded-2xl shadow-lg p-8 md:px-20 md:py-10 w-full h-full  ">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center md:items-start mb-8">
          <div className="relative">
            <div className="size-[150px] rounded-full overflow-hidden bg-yellow-500">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50"
            >
              <Camera className="w-5 h-5 text-gray-700" />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Form Section */}
        <div onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-[#FAFBFB] focus:ring-[#D8DFDC] ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* First Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-[#FAFBFB] focus:ring-[#D8DFDC] ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-[#FAFBFB] focus:ring-[#D8DFDC] ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3  gap-12 mb-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-[#FAFBFB] focus:ring-[#D8DFDC] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Nationality Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality
              </label>
              <select
                {...register("nationality")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-[#FAFBFB] focus:ring-[#D8DFDC] ${
                  errors.nationality ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select nationality</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Thailand">Thailand</option>
                <option value="Singapore">Singapore</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Vietnam">Vietnam</option>
              </select>
              {errors.nationality && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nationality.message}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                type="tel"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-[#FAFBFB] focus:ring-[#D8DFDC] ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Gender Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                {...register("gender")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-[#FAFBFB] focus:ring-[#D8DFDC] ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="outline-btn px-6 py-2 rounded-lg border-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2 pagination-btn rounded-lg"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
