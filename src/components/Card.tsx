"use client";
import React, { useState } from "react";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { BookItem } from "@/type/interface";

interface CardProps {
  bookInfo: BookItem;
  onRating?: Function;
}

const Card: React.FC<CardProps> = ({ bookInfo, onRating }) => {
  const [value, setValue] = useState(0);

  return (
    <InteractiveCard>
      <div className="flex flex-row h-full w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative w-full sm:w-1/3 h-60 sm:h-60">
          <Image
            src={bookInfo.coverPicture}
            alt={bookInfo.title}
            fill
            className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
              {bookInfo.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
              By {bookInfo.author}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Available: {bookInfo.availableAmount}
            </p>
          </div>

          {onRating && (
            <Box
              sx={{ "& > legend": { mt: 2 } }}
              className="pt-2 border-t border-gray-200"
            >
              <Typography
                component="legend"
                className="text-sm font-medium mb-1"
              >
                Rate this book
              </Typography>
              <Rating
                name={`rating-${bookInfo.title}`}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue ?? 0);
                  onRating &&
                    onRating({
                      type: "add",
                      bookName: bookInfo.title,
                      rating: newValue,
                    });
                }}
              />
            </Box>
          )}
        </div>
      </div>
    </InteractiveCard>
  );
};

export default Card;
