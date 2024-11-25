import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar-feed";
import Lottie from "lottie-react";

import FinishingAnimation from "../assets/Finishing.json";
import EmbeddingAnimation from "../assets/Embedding.json";
import ChunkingAnimation from "../assets/Chunking.json";
import TraversingAnimation from "../assets/Traversing.json";
import ScrapingAnimation from "../assets/Scraping.json";

const ContributePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [repoUrl, setRepoUrl] = useState<string>("");

  // States for file upload
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileSuccess, setFileSuccess] = useState<string | null>(null);

  // States for repository upload
  const [uploadingRepo, setUploadingRepo] = useState<boolean>(false);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [repoSuccess, setRepoSuccess] = useState<string | null>(null);

  // Loading stages and timers for repository upload
  const [loadingStage, setLoadingStage] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>("Scraping GitHub Repo");

  const stages = [
    { text: "Scraping GitHub Repo", animation: ScrapingAnimation },
    { text: "Traversing the Repo", animation: TraversingAnimation },
    { text: "Breaking it into chunks", animation: ChunkingAnimation },
    { text: "Embedding Each Chunk", animation: EmbeddingAnimation },
    { text: "Finishing Touches", animation: FinishingAnimation },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
    }
  };

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setFileError("Please choose a file to upload.");
      return;
    }
    setFileError(null);
    setUploadingFile(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://65.1.43.251/api/upload/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFileSuccess("File uploaded successfully!");
    } catch (error) {
      setFileError("Error uploading file.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleRepoUpload = async () => {
    if (!repoUrl) {
      setRepoError("Please provide a GitHub repository URL.");
      return;
    }
    setRepoError(null);
    setUploadingRepo(true);
    setLoadingStage(0);

    const timer = setInterval(() => {
      if (loadingStage < 4) {
        setLoadingStage((prev) => prev + 1);
      }
    }, 10000);

    try {
      await axios.post("http://65.1.43.251/api/upload/github", { repoUrl });

      console.log('success');
      clearInterval(timer);
      setRepoSuccess("Repository uploaded successfully!");
      setUploadingRepo(false);
    } catch (error) {
      clearInterval(timer);
      setRepoError("Error uploading repository.");
      setUploadingRepo(false);
    }
  };

  useEffect(() => {
    if (loadingStage >= 0 && loadingStage < stages.length) {
      setLoadingText(stages[loadingStage].text);
    }
  }, [loadingStage]);

  return (
    <>
      <AppSidebar />
      <div className="p-4 w-full flex flex-col items-center justify-center bg-background">
        <h1 className="text-3xl font-bold text-slate-300">Contribute to Docs & Repos</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-10">
          {/* File Upload Section */}
          <div className="bg-background border border-slate-400 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-300">Upload a File</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
            {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
            {fileSuccess && <p className="text-green-500 mt-2">{fileSuccess}</p>}
            <button
              onClick={handleFileUpload}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
              disabled={uploadingFile}
            >
              {uploadingFile ? "Uploading..." : "Upload File"}
            </button>
          </div>

          {/* GitHub Repository Upload Section */}
          <div className="bg-background border border-slate-400 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-300">Upload a GitHub Repository</h2>
            <input
              type="text"
              value={repoUrl}
              onChange={handleRepoChange}
              placeholder="Enter GitHub Repository URL"
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
            {repoError && <p className="text-red-500 mt-2">{repoError}</p>}
            {repoSuccess && <p className="text-green-500 mt-2">{repoSuccess}</p>}
            <button
              onClick={handleRepoUpload}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
              disabled={uploadingRepo}
            >
              {uploadingRepo ? "Uploading..." : "Upload Repository"}
            </button>
          </div>
        </div>

        {/* Loading Animation */}
        {uploadingRepo && (
          <div className="ml-5 mt-5 fixed inset-0 bg-black opacity-75 flex flex-col justify-center items-center z-50">
            <p className="text-white text-xl font-bold">{loadingText}</p>
            <Lottie
              animationData={stages[loadingStage].animation}
              loop={true}
              style={{ width: 300, height: 300 }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ContributePage;
