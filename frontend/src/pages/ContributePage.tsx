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
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [wikiUrl, setWikiUrl] = useState<string>("");

  // States for file upload
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileSuccess, setFileSuccess] = useState<string | null>(null);

  // States for CSV upload
  const [uploadingCsv, setUploadingCsv] = useState<boolean>(false);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvSuccess, setCsvSuccess] = useState<string | null>(null);

  // States for repository upload
  const [uploadingRepo, setUploadingRepo] = useState<boolean>(false);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [repoSuccess, setRepoSuccess] = useState<string | null>(null);

  // States for wiki upload
  const [uploadingWiki, setUploadingWiki] = useState<boolean>(false);
  const [wikiError, setWikiError] = useState<string | null>(null);
  const [wikiSuccess, setWikiSuccess] = useState<string | null>(null);

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

  const handleCsvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      setCsvError("Please upload a valid CSV file.");
    }
  };

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleWikiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWikiUrl(event.target.value);
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
      await axios.post(`${import.meta.env.VITE_API_URL}/upload/file`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFileSuccess("File uploaded successfully!");
    } catch (error) {
      setFileError("Error uploading file.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) {
      setCsvError("Please choose a CSV file to upload.");
      return;
    }
    setCsvError(null);
    setUploadingCsv(true);

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/upload/csv`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCsvSuccess("CSV uploaded successfully!");
    } catch (error) {
      setCsvError("Error uploading CSV.");
    } finally {
      setUploadingCsv(false);
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
      await axios.post(`${import.meta.env.VITE_API_URL}/upload/github`, { repoUrl });

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

  const handleWikiUpload = async () => {
    if (!wikiUrl) {
      setRepoError("Please provide a Wiki URL.");
      return;
    }
    setWikiError(null);
    setUploadingWiki(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/upload/wiki`, { wikiUrl });

      console.log('success');
      setWikiSuccess("Repository uploaded successfully!");
      setUploadingWiki(false);
    } catch (error) {
      setWikiError("Error uploading repository.");
      setUploadingWiki(false);
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
      <div className="p-4 w-full flex flex-col items-center justify-center bg-background page-fade-in">
        <h1 className="text-3xl font-bold text-slate-300 section-slide-up">
          Contribute to Docs & Repos
        </h1>

        {/* Grid Container for Upload Features */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-10">
          {/* File Upload Section */}
          <div className="bg-background border border-slate-400 p-6 rounded-lg shadow-md section-slide-up">
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

          {/* CSV Upload Section */}
          <div className="bg-background border border-slate-400 p-6 rounded-lg shadow-md section-slide-up">
            <h2 className="text-xl font-semibold text-slate-300">Upload a CSV File</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvChange}
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
            {csvError && <p className="text-red-500 mt-2">{csvError}</p>}
            {csvSuccess && <p className="text-green-500 mt-2">{csvSuccess}</p>}
            <button
              onClick={handleCsvUpload}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
              disabled={uploadingCsv}
            >
              {uploadingCsv ? "Uploading..." : "Upload CSV"}
            </button>
          </div>

          {/* GitHub Repository Upload Section */}
          <div className="bg-background border border-slate-400 p-6 rounded-lg shadow-md section-slide-up">
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

          {/* Wiki Upload Section */}
          <div className="bg-background border border-slate-400 p-6 rounded-lg shadow-md section-slide-up">
            <h2 className="text-xl font-semibold text-slate-300">Upload a Wiki URL</h2>
            <input
              type="text"
              value={wikiUrl}
              onChange={handleWikiChange}
              placeholder="Enter Wiki URL"
              className="border border-gray-300 rounded p-2 w-full mt-4"
            />
            {wikiError && <p className="text-red-500 mt-2">{wikiError}</p>}
            {wikiSuccess && <p className="text-green-500 mt-2">{wikiSuccess}</p>}
            <button
              onClick={handleWikiUpload}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
              disabled={uploadingWiki}
            >
              {uploadingWiki ? "Uploading..." : "Upload Wiki"}
            </button>
          </div>
        </div>

        {/* Loading Animation */}
        {uploadingRepo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-[300px] h-[300px]">
              <Lottie animationData={stages[loadingStage]?.animation} loop={true} />
              <p className="text-white text-center mt-4">{loadingText}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContributePage;
