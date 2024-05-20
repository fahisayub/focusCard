"use client";

import Image from "next/image";
import CollapsibleForm from "../components/CollapsibleForm";
import CardComponent from "../components/CardComponent";
import FocusTool from "../components/FocusTool";
import { useRef } from 'react';

export default function Home() {
  const inputRefs = useRef({});
  const inputToCardMapping = {
    textInput: 'textDiv',
    fileInput: 'fileDiv',
    selectInput: 'selectDiv',
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-5xl">
        <FocusTool cardComponent={CardComponent} inputToCardMapping={inputToCardMapping} inputRefs={inputRefs} />
        <CollapsibleForm inputRefs={inputRefs} />
      </div>
    </main>
  );
}
