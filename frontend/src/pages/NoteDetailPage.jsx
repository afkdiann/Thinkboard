import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fecting note", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const handleDelete = async (e) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async (e) => {
    if(!note.title.trim() && !note.content.trim()){
      toast.error("Title and content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating the note", error);
      toast.error("Failed to update note")
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6 text-red-800">
            <Link to={"/"} className="mb-6">
              <button className="flex items-center text-white border-2 border-solid rounded-xl p-2 border-black hover:bg-gray-500">
                <ArrowLeftIcon className="size-5" />
                <p className="pl-2 text-sm">Back to Notes</p>
              </button>
            </Link>
            <button
              onClick={(e) => {
                handleDelete(e);
              }}
              className="mb-6 flex border-2 rounded-xl items-center border-red-800 hover:bg-gray-500 p-2"
            >
              <Trash2Icon className="h-5 w-5" />
              <p className="pl-2 text-sm">Delete Note</p>
            </button>
          </div>
          <div className="border-2 rounded-2xl border-black mt-4 bg-teal-950">
            <form>
              <div className="mb-4 flex flex-col p-4">
                <label className="pb-2">
                  <span className="text-white">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  value={note.title}
                  className="border border-gray-500 rounded-2xl p-1.5 text-white"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                ></input>
              </div>

              <div className="mb-4 flex flex-col p-4">
                <label className="pb-2">
                  <span className="text-white">Content</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Note content"
                  value={note.content}
                  className="border border-gray-500 rounded-2xl h-36 p-1.5 resize-none text-white"
                  onChange={(e) => {
                    setNote({ ...note, content: e.target.value });
                  }}
                ></textarea>
              </div>

              <div className="flex justify-end pr-2 pb-2">
                <button
                  className="hover:bg-gray-500 border-2 border-gray-500 rounded-2xl p-1.5 text-white text-sma"
                  disabled={saving}
                  type="submit"
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
