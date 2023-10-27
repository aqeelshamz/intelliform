"use client";
import Navbar from "../components/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "../components/modal";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="container mx-auto">
                <button
                    className="btn mt-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg "
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
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create form</h3>
                    <div className="flex justify-center">
                        {" "}
                        <button className="btn btn-square btn-outline">
                            <FiEdit className="h-6 w-6" />
                        </button>{" "}
                        <button className="btn btn-square btn-outline">
                            <FiEdit className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
