import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppSidebar } from "@/components/app-sidebar-feed";
import "@/pages/CreatePost.css"; // Import your CSS file
import axios from "axios";

// File Upload Component
const FileUpload = ({ setFile, setFilePreview }: any) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile)); // For preview
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium mb-1">
                Upload a File (Image, PDF, etc.)
            </label>
            <input
                type="file"
                id="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="w-full"
            />
        </div>
    );
};

// File Preview Component
const FilePreview = ({ filePreview }: any) => {
    if (!filePreview) return null;

    return (
        <div>
            {filePreview && (
                <div className="flex items-center justify-center mb-4">
                    <div className="w-[10rem] h-[8rem] rounded-lg overflow-hidden border">
                        <img
                            src={filePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const CreatePostPage = () => {
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [animationClass, setAnimationClass] = useState("page-enter");

    useEffect(() => {
        // Trigger the page opening animation
        setTimeout(() => {
            setAnimationClass("page-enter-active");
        }, 100); // Delay to trigger the animation class after initial render
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!content.trim() || !tags.trim()) {
            setErrorMessage("Content and tags are required.");
            return;
        }

        setLoading(true);
        setSending(true); // Start sending animation
        setErrorMessage(null);
        setSuccessMessage(null);

        const tagArray = tags.split(",").map((tag) => tag.trim()); // Convert tags to array

        const formData = new FormData();
        formData.append("content", content);
        tagArray.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag); // Sending tags as an array
        });
        formData.append("creatorId", "4");

        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/query/queries`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                setSuccessMessage("Post created successfully!");
                setContent("");
                setTags("");
                setFile(null); // Reset file after post
                setFilePreview(null); // Reset preview
            } else {
                const errorData = response.data;
                setErrorMessage(errorData.message || "Failed to create post.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            setSending(false); // Stop sending animation
        }
    };

    return (
        <>
            <AppSidebar />
            <div className={`max-w-xl mx-auto p-6 w-full shadow-md rounded-md ${animationClass}`}>
                <h1 className="text-2xl font-bold mb-4">Create a Post</h1>

                {successMessage && (
                    <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
                )}

                {errorMessage && (
                    <p className="mb-4 text-red-600 font-medium">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium mb-1">
                            Content
                        </label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your post content here..."
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-sm font-medium mb-1">
                            Tags (comma-separated)
                        </label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g., Sales, Help"
                            className="w-full"
                        />
                    </div>

                    {/* File Upload and Preview */}
                    <FileUpload setFile={setFile} setFilePreview={setFilePreview} />
                    <FilePreview filePreview={filePreview} />

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating..." : "Create Post"}
                    </Button>
                </form>

                {sending && (
                    <div className="relative mt-4">
                        <div className="animate-bar"></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreatePostPage;
