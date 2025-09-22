"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFlashcard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    term: "",
    explanation: "",
    difficulty: "Basic",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to add flashcard");
    }

    //  Wait for DB confirmation
    const newCard = await res.json();
    alert(`Flashcard "${newCard.term}" added!`);

    //  Redirect only after DB success
    router.push("/flashcards");
  } catch (err) {
    console.error(err);
    alert("Error adding flashcard.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black">Add a New Flashcard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Term */}
        <div>
          <label className="block font-medium mb-1 text-black">Term</label>
          <input
            type="text"
            name="term"
            value={formData.term}
            onChange={handleChange}
            className="w-full border border-black rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter term"
            required
          />
        </div>

        {/* Explanation */}
        <div>
          <label className="block font-medium mb-1 text-black">Explanation</label>
          <textarea
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            className="w-full border border-black rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter explanation"
            rows={3}
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block font-medium mb-1 text-black">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border border-black rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-blue-500"
          >
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1 text-black">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-black rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Recursion, Graphs, Sorting"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Flashcard"}
        </button>
      </form>
    </div>
  );
}
