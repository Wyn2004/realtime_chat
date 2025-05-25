/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

const Message = ({
  content,
  type,
  own = false,
  user,
}: {
  content: string;
  type: string;
  own?: boolean;
  user: any;
}) => {
  return (
    <p className={`px-6 py-1 flex ${own && "justify-end"}`}>
      {!own && (
        <span
          className={`logo text-2xl bg-blue-600 text-white rounded-full py-2 text-center px-4 mr-2 flex items-center ${
            type === "text" ? "my-auto" : "max-h-12"
          }`}
        >
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span
        className={`text-3xl px-6 py-1 rounded-2xl ${
          type === "text" ? "px-6" : "px-2"
        } ${own ? "bg-sky-400 text-white" : "bg-slate-300 text-black"}`}
      >
        {type !== "image" ? (
          content
        ) : (
          <Image
            src={content}
            className="rounded-md"
            alt="image"
            width={100}
            height={100}
          />
        )}
      </span>
    </p>
  );
};

export default Message;
