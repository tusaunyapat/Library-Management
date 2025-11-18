"use client";
import React, { useState } from "react";
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { BookItem } from "@/type/interface";
import { useRouter } from "next/navigation";

interface CardProps {
  bookInfo: BookItem;
}

const Card: React.FC<CardProps> = ({ bookInfo }) => {
  const router = useRouter();

  return (
    <InteractiveCard>
      <div className="flex flex-col justify-between h-full w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 items-center p-2 pb-8 pt-6">
        <div className="flex flex-col w-full items-center">
          <div className="w-[80%] flex justify-center h-40 relative mb-4">
            <Image
              // className="w-52 h-72"
              // width={100}
              // height={300}
              src={bookInfo.coverPicture}
              fill
              // fill
              alt="bookPicture"
              className="rounded-md"
            />
          </div>
          <div className="text-white/80 font-classic">{bookInfo.title}</div>
          <div className="my-2 text-white/60 font-classic text-[10px]">
            Author:
            {bookInfo.author}
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center mt-4">
          <div
            className="bg-stone-700 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/50 transition-all duration-200 shadow-md shadow-black/20"
            onClick={() =>
              router.push(
                `/booking?id=${bookInfo.id}&name=${bookInfo.title}&author=${bookInfo.author}&ISBN=${bookInfo.ISBN}`
              )
            }
          >
            Borrow Book
          </div>
          <div
            className="bg-stone-800 p-2 px-4 border-[0.1px] border-black/30 cursor-pointer hover:bg-white/50 rounded-md font-classic text-xs text-white/70 transition-all duration-200 shadow-md shadow-black/20"
            onClick={() => router.push(`/books/${bookInfo.id}`)}
          >
            Detail
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
};

export default Card;
