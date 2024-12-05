import { ChatInput } from "@/components/ui/chat/chat-input";

export const ChatInputPreviewCode = `import { ChatInput } from "@/components/ui/chat/chat-input"

<ChatInput
  placeholder="Type your message here..."
/>
`;

export default function ChatInputPreview() {
  return <ChatInput placeholder="Type your message here..." />;
}
