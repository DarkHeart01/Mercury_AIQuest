import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppSidebar } from "@/components/app-sidebar-feed";

const CreatePostPage = () => {
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!content.trim() || !tags.trim()) {
            setErrorMessage("Content and tags are required.");
            return;
        }

        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        const tagArray = tags.split(",").map((tag) => tag.trim()); // Convert tags to array
        const postData = {
            content,
            tags: tagArray,
            creatorId: 6, // Hardcoded for now
        };

        try {
            const response = await fetch("http://65.1.43.251/api/query/queries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                setSuccessMessage("Post created successfully!");
                setContent("");
                setTags("");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to create post.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppSidebar />
            <div className="max-w-xl mx-auto p-6 w-full shadow-md rounded-md">
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

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating..." : "Create Post"}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CreatePostPage;
