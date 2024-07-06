"use client"
import { supabase } from "../../../supabase/client";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";

export default function Home() {
  console.log(supabase)

  return (
    <div>
      <Navbar />
      <div className="p-28 bg-slate-100 h-screen ">
        <div className="flex text-4xl justify-between font-bold text-center">
          <div>
            All Tasks
          </div>
          <div className="join font-bold">
            <button className="join-item btn btn-outline hover:bg-emerald-500 text-xl">«</button>
            <button className="join-item btn btn-outline hover:bg-emerald-500 text-xl">0 - 100</button>
            <button className="join-item btn btn-outline hover:bg-emerald-500 text-xl">»</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 py-5">
          <div className="card bg-base-100 w-100 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title text-emerald-500">Bug Fix in User Authentication Module</h2>
              <p className="text-slate-800">Investigate and fix a critical bug in the user authentication module that causes intermittent login failures.</p>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-600">Due by: Sat Feb 11 2023</span>
                <span className="text-slate-600 text-emerald-500">Not started</span>
              </div>
            </div>
          </div><div className="card bg-base-100 w-100 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title text-emerald-500">Bug Fix in User Authentication Module</h2>
              <p className="text-slate-800">Investigate and fix a critical bug in the user authentication module that causes intermittent login failures.</p>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-600">Due by: Sat Feb 11 2023</span>
                <span className="text-slate-600 text-emerald-500">Not started</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
