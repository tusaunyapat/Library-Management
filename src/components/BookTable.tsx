"use client";
import { BookItem } from "@/type/interface";
import DeleteConfirmModal from "./BookDeleteModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import BookModal from "./BookModal";
import { useState } from "react";
import { useBooks } from "@/context/BooksContext";
interface BookTableProps {
  books: BookItem[];
}

export default function BookTable({ books }: BookTableProps) {
  const { deleteBook } = useBooks();
  // Fixed widths
  const coverWidth = 60;
  const titleWidth = 120;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const handleDeleteClick = (book: BookItem) => {
    setSelectedBook(book);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook) return;

    await deleteBook(selectedBook.id);
  };

  return (
    <>
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        bookTitle={selectedBook?.title}
      />
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "70vh",
          overflowX: "auto",
          borderRadius: 2,
          bgcolor: "#FFF8F0",
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {/* Cover Header */}
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  width: coverWidth,
                  minWidth: coverWidth,
                  bgcolor: "#FFECD1",
                  zIndex: 3, // above scrollable cells
                  fontWeight: 600,
                }}
              >
                Cover
              </TableCell>

              {/* Title Header */}
              <TableCell
                sx={{
                  position: "sticky",
                  left: coverWidth, // exactly after Cover column
                  width: titleWidth,
                  minWidth: titleWidth,
                  bgcolor: "#FFECD1",
                  zIndex: 3,
                  fontWeight: 500,
                }}
              >
                Title
              </TableCell>

              {/* Other columns */}
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <TableRow
                key={book._id}
                sx={{
                  bgcolor: index % 2 === 0 ? "#FFF4E6" : "#FFF8F0",
                  "&:hover": { bgcolor: "#FFE8CC" },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    position: "sticky",
                    left: 0,
                    width: coverWidth,
                    bgcolor: "#FFECD1",
                  }}
                >
                  {book.coverPicture && (
                    <img
                      src={book.coverPicture}
                      alt={book.title}
                      style={{
                        width: 50,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    position: "sticky",
                    left: coverWidth,
                    width: titleWidth,
                    bgcolor: "#FFECD1",
                    fontWeight: 500,
                  }}
                >
                  {book.title}
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.ISBN}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                <TableCell>{book.availableAmount}</TableCell>
                <TableCell>
                  <BookModal type="edit" initialData={book} />
                  &nbsp; &nbsp;
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#E68A87",
                      "&:hover": { bgcolor: "#D97370" },
                      textTransform: "none",
                    }}
                    onClick={() => handleDeleteClick(book)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
