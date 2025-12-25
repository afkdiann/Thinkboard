import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js"
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")){
      return;
    }
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete the note");
    }
  }
  return (
    <Link
      to={`/note/${note._id}`} 
      className="rounded-3xl transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="p-4 border-2 border-black rounded-3xl">
        <h3 className="font-semibold text-white text-xl">{note.title}</h3>
        <p className="line-clamp-3 text-gray-500">{note.content}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4 text-gray-500" />
            <button onClick={(e) => handleDelete(e, note._id)}>
              <Trash2Icon className="size-4 text-red-700" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
