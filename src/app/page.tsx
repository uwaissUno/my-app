"use client";
import { TypeAnimation } from "react-type-animation";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Hero from "@/layouts/Hero";
import Navbar from "@/components/Navbar";
import res from "@/db/members.json";
import { useEffect, useState } from "react";
// import SwiperContainer from "@/components/Swiper";

export default function Home() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    async function getData() {
      const res: any = await fetch("/api/name")
        .then((res) => res.json())
        .then((res) => setMembers(res.data));
    }
    getData();
  }, []);
  return (
    <>
      <Navbar />;
      <div className="w-full h-screen  bg-gradient-to-r from-fuchsia-600 to-purple-600 mx-auto flex items-center -mt-6 pt-16 p-2 flex-col">
        <Hero />
        {/* <div className="flex gap-4 w-full h-full flex-col md:flex-row">
      <div className="w-full md:w-5/12 bg-white/65 rounded-[48px]  h-1/2 md:h-full flex items-center flex-col justify-center">
        <h1 className="text-3xl md:text-[36px] lg:text-5xl text-center text-white font-bold">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              "Welcome To Our Project ",
              1000,
            ]}
            speed={50}
            style={{}}
            repeat={Infinity}
          />
        </h1>
        <p className="text-center text-white mt-4 text-2xl">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              "Project Fisika Kelompok 3 Sains 1",
              1000,
            ]}
            speed={50}
            style={{}}
            repeat={Infinity}
          />
        </p>
      </div>
      <div className="w-full md:w-7/12 bg-white/65 rounded-[48px] h-1/2 md:h-full flex items-center flex-col justify-center overflow-hidden object-cover object-center">
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div> */}
      </div>
      <div className="w-full h-screen bg-purple-600 border-slate-300 border-t-2 flex flex-col items-center">
        <h1 className="my-4 text-3xl font-montserrat font-semibold text-center text-white">
          Anggota Kelompok
        </h1>
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination]}
          className="mySwiper w-full"
        >
          {" "}
          {members &&
            members.map((member: any) => {
              return (
                <SwiperSlide key={member.id}>
                  <div className="w-64 h-80 mx-auto bg-white/30 backdrop-blur-md rounded-md p-4 flex  flex-col items-center">
                    <div className="w-36 h-36 rounded-full overflow-hidden mt-2 object-center object-cover">
                      <img
                        src={
                          member.image ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy3n6OUTASI71uCdxQOel9o3-Rsh2D9zof2A&usqp=CAU"
                        }
                        alt=""
                      className="w-full h-full object-cover"/>
                    </div>
                    <h1 className="text-2xl font-montserrat font-semibold mt-3 text-center">
                      {member.name}
                    </h1>
                    <p className="w-full text-center ">
                      Absen : {member.absen}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <img src="/public/image/tutul.jpg" alt="" />
    </>
  );
}
