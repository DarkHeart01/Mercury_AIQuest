import * as React from "react"
import { Button } from "@/components/ui/button"; // shadcn Button
import { ArrowUpCircleIcon, ArrowDownCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline"; // Icons
import { useState } from "react"; // For handling user input
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

interface UserAnswerCardProps {
  answer: string;
}

export default function UserAnswerCard({ answer }: UserAnswerCardProps) {
  const [reply, setReply] = useState("");

  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
  };

  const handleSubmitReply = () => {
    // Placeholder for handling the reply submission
    console.log("Reply submitted:", reply);
    setReply(""); // Clear the reply input after submitting
  };

  return (
    <div className="w-[700px] mb-4">
      <Card className="bg-white border-b py-4 relative">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Comments Section</h3>
          <p>{answer}</p>

          {/* Upvote Button (Top Left Corner) */}
          <Button
            variant="link"
            className="flex items-center text-gray-700 absolute top-2 left-2 w-10 h-10"
          >
            <ArrowUpCircleIcon className="w-10 h-10" />
          </Button>

          {/* Downvote Button (Bottom Left Corner) */}
          <Button
            variant="link"
            className="flex items-center text-gray-700 absolute bottom-2 left-2 w-10 h-10"
          >
            <ArrowDownCircleIcon className="w-10 h-10" />
          </Button>

          {/* User Icon */}
          <Button
            variant="link"
            className="flex items-center text-gray-700 absolute top-2 right-10 w-12 h-12"
          >
            <UserCircleIcon className="w-12 h-12" />
            User
          </Button>

          {/* Reply Section */}
          <div className="mt-4">
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Write your reply..."
              value={reply}
              onChange={handleReplyChange}
            ></textarea>
            <Button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSubmitReply}
            >
              Reply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
