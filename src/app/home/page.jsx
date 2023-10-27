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
      <main className="container mx-auto">
        <button
          className="btn mt-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-black hover:text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          + New Form
        </button>
        <p className="text-2xl md:text-4xl my-4 font-semibold">My forms</p>
        <div className="overflow-x-auto">
          <table className="table table-zebra bg-gray-200">
            {/* head */}
            <thead className="bg-gray-400 text-white">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Responses</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>23</td>
                <td>
                  <button className="btn btn-square btn-outline">
                    <FiEdit className="h-6 w-6" />
                  </button>
                </td>
                <td>
                  <button className="btn text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline">
                    <FiTrash2 className="h-6 w-6" />
                  </button>
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>23</td>
                <td>
                  <button className="btn btn-square btn-outline">
                    <FiEdit className="h-6 w-6" />
                  </button>
                </td>
                <td>
                  <button className="btn text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline">
                    <FiTrash2 className="h-6 w-6" />
                  </button>
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>23</td>
                <td>
                  <button className="btn btn-square btn-outline">
                    <FiEdit className="h-6 w-6" />
                  </button>
                </td>
                <td>
                  <button className="btn text-red-500 hover:bg-red-500 hover:border-white border-red-500 btn-outline">
                    <FiTrash2 className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      {/* Modals */}
      {/* modal 1 */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Create form</h3>
          <div className="flex mt-6 justify-center gap-8">
            {" "}
            <button
              className="btn h-36 h- w-36 btn-square btn-outline"
              onClick={temp}
            >
              <PiMagicWandFill className="h-20 w-20" />
              using AI{" "}
            </button>{" "}
            <button className="btn h-  h-36 w-36 btn-square btn-outline">
              <FiEdit className="h-20 w-20" />
              from scratch
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* modal 1 end */}
      {/* modal 2  */}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-2xl">Create form using AI</h3>
          <textarea
            placeholder="Tell us about your form..."
            className="mt-6 border-black border-2  textarea textarea-bordered textarea-lg min-h-[250px] w-full max-w-3xl"
          ></textarea>
          <div className="modal-action mt-2 flex justify-center ">
            <button className="btn mt-0 bg-black text-white hover:bg-black hover:text-white hover:text-2xl h-16  w-[728px] mx-12 text-xl">
              {" "}
              <PiMagicWandFill />
              Generate form
            </button>
          </div>
        </div>
      </dialog>
      {/* modal 2 end  */}
    </>
  );
}
