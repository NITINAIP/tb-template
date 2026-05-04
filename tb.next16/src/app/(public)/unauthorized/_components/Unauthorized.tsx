"use client";

import Image from "next/image";

import WhiteCard from "@/components/layout/WhiteCard";
import { Title } from "@/components/ui/commons/TextStyles";
import { BASE_PATH } from "@/utils/constants";

interface PageHandlerProps {
  text?: string;
  displayLoading?: boolean;
}

export default function Unauthorized({
  text,
  displayLoading,
}: Readonly<PageHandlerProps>) {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 px-4">
      <WhiteCard>
        <div className="flex flex-col items-center text-center gap-4 p-6">
          <Image
            src={`${BASE_PATH}/vertical-logo.png`}
            alt="TNI Logo"
            width={200}
            height={200}
            className="h-auto object-contain"
            priority
          />
          <Title className="text-center">{text}</Title>

          {displayLoading && (
            <div className="mt-2 inline-flex items-center gap-2 text-gray-500">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
              <span>กำลังตรวจสอบสิทธิ์…</span>
            </div>
          )}
        </div>
      </WhiteCard>
    </div>
  );
}
