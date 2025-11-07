"use client";
import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { BookItem } from "@/type/interface";
import { useBooks } from "@/context/BooksContext";

interface BookModalProps {
  initialData?: BookItem;
  type: string;
}

export default function BookModal({ initialData, type }: BookModalProps) {
  const { createBook, updateBook } = useBooks();
  const bookId = initialData ? initialData.id : "unknown";

  const [bookData, setBookData] = useState<Omit<BookItem, "_id" | "id">>(
    initialData || {
      title: "",
      author: "",
      ISBN: "",
      publisher: "",
      availableAmount: 0,
      coverPicture: "",
    }
  );

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async () => {
    if (type == "create") {
      await createBook(bookData);
    } else if (type == "edit") {
      await updateBook(bookId, bookData);
    }
    setOpen(false);
    setBookData({
      title: "",
      author: "",
      ISBN: "",
      publisher: "",
      availableAmount: 0,
      coverPicture: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: name === "availableAmount" ? Number(value) : value,
    }));
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#8B5E3C",
          "&:hover": { bgcolor: "#704B2B" },
          color: "#FFF",
        }}
        onClick={() => setOpen(true)}
      >
        {initialData ? "Edit Book" : "Add New Book"}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{initialData ? "Edit Book" : "Add New Book"}</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {/* Title */}
            <Grid size={12}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={bookData.title}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "#FFF8F0", borderRadius: 1 }}
              />
            </Grid>

            {/* Author */}
            <Grid size={12}>
              <TextField
                label="Author"
                name="author"
                fullWidth
                value={bookData.author}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* ISBN */}
            <Grid size={12}>
              <TextField
                label="ISBN"
                name="ISBN"
                fullWidth
                value={bookData.ISBN}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Publisher */}
            <Grid size={12}>
              <TextField
                label="Publisher"
                name="publisher"
                fullWidth
                value={bookData.publisher}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Available Amount */}
            <Grid size={12}>
              <TextField
                label="Available Amount"
                name="availableAmount"
                type="number"
                fullWidth
                value={bookData.availableAmount}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Cover Picture URL */}
            <Grid size={12}>
              <TextField
                label="Cover Picture URL"
                name="coverPicture"
                fullWidth
                value={bookData.coverPicture}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: "#8B5E3C", "&:hover": { bgcolor: "#704B2B" } }}
          >
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
