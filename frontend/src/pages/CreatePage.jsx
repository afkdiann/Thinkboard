import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      navigate("/");
      toast.success("Note created successfully");
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="mb-6">
            <button className="flex items-center text-white border-2 border-solid rounded-xl p-2 border-black hover:bg-gray-500">
              <ArrowLeftIcon className="size-5" />
              <p className="pl-2 text-sm">Back to Notes</p>
            </button>
          </Link>
          <div className="border-2 border-black mt-4 rounded-2xl bg-teal-950">
            <div>
              <h2 className="text-2xl mb-4 px-4 pt-4 text-white font-bold">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col p-4">
                  <label className="pb-2">
                    <span className="text-white">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="border border-gray-500 rounded-2xl p-1.5 text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>

                <div className="mb-4 flex flex-col p-4">
                  <label className="pb-2">
                    <span className="text-white">Content</span>
                  </label>
                  <textarea
                    className="border border-gray-500 rounded-2xl h-36 p-1.5 resize-none text-white"
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end pr-2 pb-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="hover:bg-gray-500 border-2 border-gray-500 rounded-2xl p-1.5 text-white text-sm"
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
