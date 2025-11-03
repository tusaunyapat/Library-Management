"use client";
import React from "react";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Box from "@mui/material/Box";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
interface CardProps {
  imgSrc: string;
  venueName: string;
  description?: string;
  onRating?: Function;
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  venueName,
  description,
  onRating,
}) => {
  const [value, setValue] = useState(0);
  return (
    <InteractiveCard>
      <div className="flex flex-col w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative w-full h-44 p-2">
          <Image
            src={imgSrc}
            alt={venueName}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        <div className="p-4 bg-white">
          <h3 className="font-semibold text-lg text-gray-800">{venueName}</h3>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
        {onRating ? (
          <Box
            sx={{ "& > legend": { mt: 2 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography component="legend">Controlled</Typography>
            <Rating
              name={`rating-${venueName}`}
              value={value}
              data-testid={`${venueName} Rating`}
              onChange={(event, newValue) => {
                setValue(newValue ?? 0);

                onRating({
                  type: "add",
                  venueName: venueName,
                  rating: newValue,
                });
              }}
            />
          </Box>
        ) : (
          ""
        )}
      </div>
    </InteractiveCard>
  );
};

export default Card;
