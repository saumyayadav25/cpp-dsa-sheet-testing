"use client";
import Navbar from "../../../../components/Navbar";
import { useState } from "react";
import Image from "next/image";

export default function AvatarSettings() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUploading(true);
    const res = await fetch("/api/avatar", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (data.avatar) setAvatar(data.avatar);
  }

  async function handleRemove() {
    setRemoving(true);
    const res = await fetch("/api/avatar", { method: "DELETE" });
    const data = await res.json();
    setRemoving(false);
    if (data.avatar === null) setAvatar(null);
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-30">
        <h1 className="text-2xl font-semibold mb-4">Profile Picture</h1>
        <Image
          src={avatar || "/images/default-avatar.png"}
          alt="Avatar"
          width={160}              
          height={160}            
          className="rounded-full object-cover"
        />
        <form onSubmit={handleUpload} className="space-y-4 ">
          <input
            type="file"
            name="file"
            accept="image/png,image/jpeg,image/webp"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        <button
          onClick={handleRemove}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={removing}
        >
          {removing ? "Removing..." : "Remove photo"}
        </button>
      </div>
    </>
  );
}
