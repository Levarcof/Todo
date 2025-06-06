import React from "react";
const Navbar = ()=>{
    return(
        <div className="nav flex bg-blue-950 py-4 px-6 justify-between">
            <div>
                <h1 className="text-white font-bold text-xl">iTask</h1>
            </div>
            <ul className="flex gap-4">
                <li className="w-fit   text-white hover:font-bold cursor-pointer">Home</li>
                <li  className="w-fit   text-white hover:font-bold cursor-pointer">About</li>
            </ul>
        </div>
    )
}
export default Navbar