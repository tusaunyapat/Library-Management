"use client";
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
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import DateReserve from "./DateReservation";
import { useState } from "react";
import { useBooks } from "@/context/BooksContext";
interface ReservationTableProps {
  reservations: any[];
}

export default function ReservationTable({
  reservations,
}: ReservationTableProps) {
  const { deleteReservation } = useBooks();
  // Fixed widths
  const coverWidth = 60;
  const titleWidth = 120;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(
    null
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedReservationForEdit, setSelectedReservationForEdit] = useState<
    any | null
  >(null);

  const handleDeleteClick = (reservation: any) => {
    setSelectedReservation(reservation);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedReservation) return;

    await deleteReservation(selectedReservation._id);
  };

  return (
    <>
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        bookTitle={selectedReservation?.book.title}
      />

      <DateReserve
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        reservation={selectedReservationForEdit}
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
                Borrower
              </TableCell>

              {/* Other columns */}
              <TableCell
                sx={{
                  width: { xs: 80, sm: 100, md: 120 }, // responsive
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Reservation ID
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: 80, sm: 100, md: 120 }, // responsive
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Book Title
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: 80, sm: 100, md: 120 }, // responsive
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Book ISBN
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: 80, sm: 100, md: 120 }, // responsive
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Borrow Date
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: 80, sm: 100, md: 120 }, // responsive
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Pick up Date
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: 80, sm: 100, md: 120 }, // responsive
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation, index) => (
              <TableRow
                key={reservation._id}
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
                  {reservation.book.coverPicture && (
                    <img
                      src={reservation.book.coverPicture}
                      alt={reservation.book.title}
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
                  {reservation.user.name}
                </TableCell>
                <TableCell
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 }, // responsive
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {reservation._id}
                </TableCell>
                <TableCell
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 }, // responsive
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {reservation.book.title}
                </TableCell>
                <TableCell
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 }, // responsive
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {reservation.book.ISBN}
                </TableCell>
                <TableCell
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 }, // responsive
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {dayjs(reservation.borrowDate).format("MMM D, YY")}
                </TableCell>
                <TableCell
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 }, // responsive
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {dayjs(reservation.pickupDate).format("MMM D, YY")}
                  <EditIcon
                    sx={{
                      fontSize: 20,
                      cursor: "pointer",
                      color: "#FFA726",
                      "&:hover": { color: "#FB8C00" },
                    }}
                    onClick={() => {
                      setSelectedReservationForEdit(reservation);
                      setEditModalOpen(true);
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#E68A87",
                      "&:hover": { bgcolor: "#D97370" },
                      textTransform: "none",
                    }}
                    onClick={() => handleDeleteClick(reservation)}
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
