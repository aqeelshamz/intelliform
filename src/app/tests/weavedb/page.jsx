"use client";
import { useEffect, useState } from "react";
import WeaveDB from "weavedb-sdk";

export default function WeaveDB() {
  const [db, setDB] = useState();
  const initDB = async () => {
    const db = new WeaveDB({ contractTxId: "_qJcXgNobdndZnCPZ_EhdjPUn7XijaC885865BxJGv4" });
    await db.init();
    setDB(db);
  }

  useEffect(()=>{
    initDB();
  },[]);

  return (
    <div className="m-5">
      <h1>WeaveDB</h1>

    </div>
  )
}
