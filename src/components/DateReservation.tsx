"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs, { Dayjs } from "dayjs";
import { useBooks } from "@/context/BooksContext";

interface DateReserveProps {
  open: boolean;
  onClose: () => void;
  reservation: any | null; // reservation object
}

export default function DateReserve({
  open,
  onClose,
  reservation,
}: DateReserveProps) {
  const [newDate, setNewDate] = useState<Dayjs | null>(null);
  const { updateReservation } = useBooks();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (reservation?.pickupDate) {
      setNewDate(dayjs(reservation.pickupDate));
      console.log(reservation);
    }
  }, [reservation]);

  useEffect(() => {
    if (!newDate || !reservation.borrowDate) return;

    const pickup = dayjs(newDate);
    // const borrow = dayjs(reservation.borrowDate);
    const today = dayjs().startOf("day");

    if (!pickup.isValid()) return;

    if (pickup.isBefore(today, "day")) {
      setError("Pickup date cannot be in the past.");
    } else {
      setError("");
    }
  }, [newDate]);

  const handleSave = async () => {
    if (error) return;
    await updateReservation(reservation._id, { pickupDate: newDate });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 600 }}>Update Pickup Date</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="New Pickup Date"
            value={newDate}
            onChange={(d) => setNewDate(d)}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  mt: 0.7, // <-- Creates space above input
                },
              },
            }}
          />
        </LocalizationProvider>
        {error && (
          <p className="text-red-500 font-bold text-start px-4 py-2 bg-red-200/60 rounded-md mt-2">
            {error}
          </p>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ textTransform: "none", bgcolor: "#FF8A65" }}
          onClick={handleSave}
          disabled={!!error}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
