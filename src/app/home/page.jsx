"use client";
import Navbar from "../components/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../components/modal";

export default function Home() {
  return (
    <>
      {" "}
      <Navbar />
      <main className="container mx-auto">
        <Modal />
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
    </>
  );
}
