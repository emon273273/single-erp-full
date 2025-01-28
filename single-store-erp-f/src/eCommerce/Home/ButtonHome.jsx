import Button from "@/UI/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ButtonHome() {
  const [logoError, setLogoError] = useState(false);
  const { data } = useSelector((state) => state.setting);

  let logoRender = null;
  if (data?.logo && !logoError) {
    logoRender = (
      <img
        onError={() => setLogoError(true)}
        loading="lazy"
        className="rounded w-[200px] object-contain ml-4 mb-4"
        src={data?.logo}
      />
    );
  } else {
    logoRender = (
      <div>
        <h2
          className="text-black text-center ml-4 flex items-center justify-center gap-2"
          style={{ fontSize: "25px" }}>
          OS
          <strong style={{ color: "red	", fontWeight: "bold" }}>
            Inventory
          </strong>
        </h2>
      </div>
    );
  }

  return (
    <div className="h-screen  w-full ">
      <div className="w-full md:w-full h-full radial-gradient-top-left bg-black">
        <div className="bgImageForLogin h-[calc(100%-80px)] flex justify-center items-center">
          <div className="text-white text-center font-Popins px-4 home-header-animation ">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold   ">
                Welcome to {data?.companyName}
              </h1>
              <p className="text-sm md:text-xl font-normal text-gray-300">
                {data?.tagLine}
              </p>
            </div>
            <div className="flex gap-5 justify-center">
              <Link to="/admin/auth/login">
                <Button
                  color="primary"
                  className="text-sm mt-4 w-48  font-semibold bg-[#B4FE3A] text-gray-900 hover:bg-[#aaf334] hover:text-black rounded-xl border-[#a7ee35] border-2">
                  Admin Login
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  color="primary"
                  className="text-sm mt-4 w-48  font-semibold bg-[#77eb0b] text-gray-900 hover:bg-[#73dd0f] hover:text-black rounded-xl border-[#77eb0b] border-2">
                  Customer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
