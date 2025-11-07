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

  useEffect(() => {
    if (reservation?.pickupDate) {
      setNewDate(dayjs(reservation.pickupDate));
      console.log(reservation);
    }
  }, [reservation]);

  const handleSave = async () => {
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
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ textTransform: "none", bgcolor: "#FF8A65" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
