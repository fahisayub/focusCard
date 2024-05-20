"use client";

import Image from "next/image";
import CollapsibleForm from "../components/CollapsibleForm";
import CardComponent from "../components/CardComponent";
import FocusTool from "../components/FocusTool";
import { useRef } from 'react';

export default function Home() {
  const inputRefs = useRef({});
  const cardRefs = useRef({});
  const inputToCardMapping = {
    textInput: 'textDiv',
    fileInput: 'fileDiv',
    selectInput: 'selectDiv',
  };

  const handleCardClick = (key: string) => {
    if (inputRefs.current[key as keyof typeof inputRefs.current]) {
      (inputRefs.current[key as keyof typeof inputRefs.current] as HTMLInputElement)?.focus();
      (inputRefs.current[key as keyof typeof inputRefs.current] as HTMLInputElement)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-5xl">
        <FocusTool cardComponent={CardComponent} inputToCardMapping={inputToCardMapping} />
        <CollapsibleForm inputRefs={inputRefs} />
      </div>
    </main>
  );
}
