import Note from "../models/Note";
import { Request, Response } from "express";

interface NoteParams {
  id: string;
}

interface NoteBody {
  title: string;
  content: string;
}

export async function getAllNotes(_req: Request, res: Response): Promise<void> {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req: Request<NoteParams, {}, {}>, res: Response): Promise<void> {
  try {
    const note = await Note.findById(req.params.id);
    if(!note){
      res.status(404).json({message: "Note not found"});
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req: Request<{}, {}, NoteBody>, res: Response): Promise<void> {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req: Request<NoteParams, {}, NoteBody>, res: Response): Promise<void> {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updatedNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req: Request<NoteParams, {}, {}>, res: Response): Promise<void> {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(deletedNote);
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
