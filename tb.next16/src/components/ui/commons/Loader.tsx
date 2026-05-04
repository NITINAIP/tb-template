"use client";

import { CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/utils/types";

const Loader: FC = () => {
  const { open } = useSelector((state: RootState) => state.loader);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/25  z-9999"
      data-testid="loader-page"
    >
      <div className="flex flex-col gap-4  relative  justify-center items-center">
        <Image
          src="/logo-loader.png"
          width="60"
          height="0"
          alt="logo"
          priority
        />
        <Typography variant="caption">กำลังโหลด ...</Typography>
        <CircularProgress color="primary" />
      </div>
    </div>
  );
};

export default Loader;
