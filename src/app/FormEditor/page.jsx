"use client";
import Navbar from "../components/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { PiMagicWandFill } from "react-icons/pi";
import Modal from "../components/modal";

export default function Home() {
  const temp = () => {
    document.getElementById("my_modal_2").showModal();
    document.getElementById("my_modal_1").close();
  };
  return (
    <>
      <Navbar />
      <div className="tabs mt-3 sticky top-0 z-50 bg-white">
        <a className="tab tab-lg tab-lifted tab-active">Editor</a>
        <a className="tab tab-lg tab-lifted Responses (11)">Responses (11)</a>
      </div>
      <main className="container mx-auto relative mt-6 ">
        <div className="border-black w-full border-2 h-auto rounded-xl p-3 pl-8">
          <div className="row0 flex justify-end">
            <button className="btn  text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline">
              <FiTrash2 className="h-6 w-6 " />
            </button>
          </div>
          <div className="row1 title">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold ">
                Hack@Arch 2.0 - Registration Form
              </span>{" "}
              <FiEdit />
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-xl font-bold ">
                Lorem ipsum dolor sit amet. This is the registration form for
                Hack@Arch 2.0
              </span>{" "}
              <FiEdit />
            </div>
          </div>

          <div className="inputs">
            <div className="inputrow">
              <div className="flex items-center gap-3 mt-5">
                <label className="text-xl font-bold ">name</label>
                <FiEdit />
              </div>{" "}
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-4xl "
                />
                <button className="btn btn-sm h-[45px] w-[45px] btn-square btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="inputrow">
              <div className="flex items-center gap-3 mt-5">
                <label className="text-xl font-bold ">email</label>
                <FiEdit />
              </div>{" "}
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-4xl "
                />
                <button className="btn btn-sm h-[45px] w-[45px] btn-square btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
