//frontend page is to share interview experience
"use client";
import Navbar from "@/components/ui/Navbar-interview";
import { Share } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    author: "",
    date: "",
    duration: "",
    rounds: 0,
    difficulty: "",
    outcome: "",
    tags: "",
    overallExperience: "",
    tips: "",
  });

  const [interviewRounds, setInterviewRounds] = useState([
    { id: 1, type: "", duration: "", questions: "", experience: "" },
  ]);

  const [message, setMessage] = useState({
    text: "",
    type: "",
    visible: false,
  });

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoundChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInterviewRounds((prevRounds) =>
      prevRounds.map((round) =>
        round.id === id ? { ...round, [name]: value } : round
      )
    );
  };

  const addRound = () => {
    const newId = interviewRounds.length + 1;
    setInterviewRounds((prevRounds) => [
      ...prevRounds,
      { id: newId, type: "", duration: "", questions: "", experience: "" },
    ]);
  };

  const showMessage = (text: string, type: string = "success") => {
    setMessage({ text, type, visible: true });
    setTimeout(() => {
      setMessage({ ...message, visible: false });
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const processedRounds = interviewRounds.map((round) => ({
      round: round.id,
      type: round.type,
      duration: parseInt(round.duration.toString()),
      questions: round.questions.split("\n").filter((q) => q.trim() !== ""),
      experience: round.experience,
    }));

    const finalData = {
      company: formData.company,
      position: formData.position,
      author: formData.author,
      date: formData.date,
      duration: parseInt(formData.duration.toString()),
      rounds: parseInt(formData.rounds.toString()),
      level: formData.difficulty.toLowerCase(),
      result: formData.outcome.toLowerCase(),
      likes: 0,
      comments: 0,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      preview: formData.overallExperience.substring(0, 100) + "...",
      interview: {
        rounds: processedRounds,
        overallExperience: formData.overallExperience,
        tips: formData.tips.split("\n").filter((tip) => tip.trim() !== ""),
        finalOutcome: formData.outcome.toLowerCase(), // fix
      },
    };

    try {
      const res = await fetch("/api/interview-experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();
      if (result.success) {
        showMessage("Interview Experience shared successfully!", "success");
      } else {
        showMessage("Error sharing experience!", "error");
      }
    } catch (error) {
      showMessage("Something went wrong!", "error");
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center gap-8">
      <Navbar
        icon={<Share />}
        pageTitle="Share Experience"
        onBack="/interview-experiences"
      />
      <div className="bg-card p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl text-center font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Interview Feedback
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Share your interview experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Interview Details Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-white"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-white"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            {/* More main form fields here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-white"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-white"
                >
                  Duration (in minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="rounds"
                  className="block text-sm font-medium text-white"
                >
                  Number of Rounds
                </label>
                <input
                  type="number"
                  id="rounds"
                  name="rounds"
                  value={formData.rounds}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium text-white"
                >
                  Difficulty
                </label>
                <div className="relative">
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleFormChange}
                    className="appearance-none mt-1 block w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    required
                  >
                    <option value="">Select a difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label
                  htmlFor="outcome"
                  className="block text-sm font-medium text-white"
                >
                  Outcome
                </label>
                <div className="relative">
                  <select
                    id="outcome"
                    name="outcome"
                    value={formData.outcome}
                    onChange={handleFormChange}
                    className="appearance-none mt-1 block w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    required
                  >
                    <option value="">Select an outcome</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-white"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Arrays, System Design, Behavioral"
              />
            </div>
          </div>

          {/* Overall Experience & Tips */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="overallExperience"
                className="block text-sm font-medium text-white"
              >
                Overall Experience
              </label>
              <textarea
                id="overallExperience"
                name="overallExperience"
                rows={4}
                value={formData.overallExperience}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tips"
                className="block text-sm font-medium text-white"
              >
                Tips for others (one tip per line)
              </label>
              <textarea
                id="tips"
                name="tips"
                rows={4}
                value={formData.tips}
                onChange={handleFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Dynamic Interview Rounds Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Interview Rounds
            </h2>
            {interviewRounds.map((round) => (
              <div
                key={round.id}
                className="round-block p-4 border-white border-2 rounded-xl bg-card space-y-4 shadow-sm"
              >
                <h3 className="text-md font-semibold text-white">
                  Round {round.id}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`roundType-${round.id}`}
                      className="block text-sm font-medium text-white"
                    >
                      Type
                    </label>
                    <input
                      type="text"
                      id={`roundType-${round.id}`}
                      name="type"
                      value={round.type}
                      onChange={(e) => handleRoundChange(round.id, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Coding (DSA)"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`roundDuration-${round.id}`}
                      className="block text-sm font-medium text-white"
                    >
                      Duration (min)
                    </label>
                    <input
                      type="number"
                      id={`roundDuration-${round.id}`}
                      name="duration"
                      value={round.duration}
                      onChange={(e) => handleRoundChange(round.id, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 60"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`roundQuestions-${round.id}`}
                    className="block text-sm font-medium text-white"
                  >
                    Questions (one per line)
                  </label>
                  <textarea
                    id={`roundQuestions-${round.id}`}
                    name="questions"
                    rows={3}
                    value={round.questions}
                    onChange={(e) => handleRoundChange(round.id, e)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Question 1\nQuestion 2"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`roundExperience-${round.id}`}
                    className="block text-sm font-medium text-white"
                  >
                    Experience
                  </label>
                  <textarea
                    id={`roundExperience-${round.id}`}
                    name="experience"
                    rows={4}
                    value={round.experience}
                    onChange={(e) => handleRoundChange(round.id, e)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addRound}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Add Another Round
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-8 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Feedback
          </button>
        </form>

        {/* Message Box */}
        {message.visible && (
          <div
            className={`mt-4 px-4 py-3 rounded-xl relative ${
              message.type === "success"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
            role="alert"
          >
            <span className="block sm:inline">{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
