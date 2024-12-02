import React, { useState } from "react";
import { Message } from "@/interfaces/Hunt";
import { HiEnvelope, HiEnvelopeOpen, HiXCircle } from "react-icons/hi2";
import { useSession } from "next-auth/react";

type Props = {
  messages: Message[];
};

export default function MessageList({ messages }: Props) {
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [messageOpen, setMessageOpen] = useState<Message | null>(null);

  //get user session
  let userId = null;
  const session = useSession();
  if (session && session.data && session.data.user)
    userId = session.data.user.id;

  const handleMessageOpen = async (message: Message) => {
    try {
      // Check if the message is unread
      if (!message.read) {
        // Send a request to mark the message as read
        const res = await fetch(`/api/mark-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messageId: message.messageId,
            userId: userId,
          }),
        });

        // Handle non-OK responses
        if (!res.ok) {
          throw new Error(`Failed to mark message as read: ${res.statusText}`);
        }

        // Update the local state with the updated messages list
        const updatedMessages = await res.json();
        setMessageList(updatedMessages.messages);
      }
    } catch (error) {
      console.error("Error handling message open:", error);
      // Optionally, handle the error in the UI (e.g., show a notification)
    }

    setMessageOpen(message);
  };

  return (
    <div className="p-8 h-screen flex flex-col">
      <OpenMessage message={messageOpen} setMessageOpen={setMessageOpen} />
      <span className="text-3xl girassol-regular">Messages</span>
      <div className="flex flex-col h-full overflow-y-scroll justify-start items-center mt-8">
        {messageList &&
          messageList.map((message) => {
            return (
              <div
                className="flex items-center pt-4"
                key={message.messageId}
                onClick={() => handleMessageOpen(message)}
              >
                <div className="w-12 h-12  rounded-full mr-4">
                  {!message.messageRead ? (
                    <HiEnvelope className="w-8 h-8 text-stone-800" />
                  ) : (
                    <HiEnvelopeOpen className="w-8 h-8 text-stone-500" />
                  )}{" "}
                </div>
                <div>
                  <div
                    className={`text-lg ${
                      !message.messageRead ? "font-bold" : ""
                    }`}
                  >
                    {message.subject}
                  </div>
                  <div
                    className={`text-sm ${
                      !message.messageRead ? "text-stone-800" : "text-stone-600"
                    } line-clamp-2`}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const OpenMessage = ({
  message,
  setMessageOpen,
}: {
  message: Message | null;
  setMessageOpen: (message: Message | null) => void;
}) => {
  const handleClose = () => {
    setMessageOpen(null);
  };

  return (
    <>
      {message && (
        <div className="absolute top-0 left-0 w-screen h-[80dvh] z-[90] py-16 px-8">
          <div className="w-full h-full bg-stone-200 relative opacity-95 border-stone-500 border rounded-sm px-4 py-16">
            <HiXCircle
              onClick={handleClose}
              className="w-8 h-8 text-stone-800 absolute top-4 right-4 cursor-pointer"
            />

            <span className="font-serif font-bold text-xl block">
              {message.subject}
            </span>

            <span className="font-serif text-lg block">
              From: {message.from}
            </span>

            <span className="font-serif text-lg block text-justify mt-12">
              {message.message.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
