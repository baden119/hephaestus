"use client";
import { useState } from "react";
import Header from "@/components/Header";
import ShowSelect from "@/components/ShowSelect";
import Browse from "@/components/table_display/Browse";
import Completed from "@/components/table_display/Completed";
import Searching from "@/components/table_display/Searching";

export default function Home() {
  const [tableDisplayState, setTableDisplayState] = useState("Browse");

  const renderTable = () => {
    if (tableDisplayState === "Browse") {
      return <Browse />;
    }

    if (tableDisplayState === "Searching") {
      return <Searching />;
    }

    if (tableDisplayState === "Completed") {
      return <Completed />;
    }
  };

  return (
    <div className="bg-babyPink min-h-screen">
      <Header />
      <ShowSelect />
      <div className="flex justify-center my-2">
        <button
          className="bg-navBarPurple  hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Browse")}
        >
          Browse
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Searching")}
        >
          Searching
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Completed")}
        >
          Completed
        </button>
      </div>
      <div className="text-center text-xl">{tableDisplayState}</div>
      {renderTable()}
    </div>
  );
}
