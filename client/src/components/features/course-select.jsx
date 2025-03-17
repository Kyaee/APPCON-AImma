import React from "react";

export default function CourseSelect() {
  // Course data for mapping
  const courses = [
    {
      title: "Web Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus at arcu rhoncus ultricies. Suspendisse rutrum ullamcorper massa, eu tempus massa pharetra quis. Ut vel luctus velit, vel euismod metus. In molestie malesuada finibus. Integer pellentesque convallis nibh.",
      totalTime: "69hrs",
    },
    {
      title: "Web Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus at arcu rhoncus ultricies. Suspendisse rutrum ullamcorper massa, eu tempus massa pharetra quis. Ut vel luctus velit, vel euismod metus. In molestie malesuada finibus. Integer pellentesque convallis nibh.",
      totalTime: "69hrs",
    },
    { 
      title: "Web Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus at arcu rhoncus ultricies. Suspendisse rutrum ullamcorper massa, eu tempus massa pharetra quis. Ut vel luctus velit, vel euismod metus. In molestie malesuada finibus. Integer pellentesque convallis nibh.",
      totalTime: "69hrs",
    },
  ];

  return (
    <main className="bg-white flex flex-col items-center justify-center min-h-screen">
      <section className="w-full max-w-5xl p-8 bg-[#f6faff] rounded-[50px_0px_50px_0px] border border-black">
        <h1 className="text-center text-3xl font-extrabold text-[#464646] tracking-[-0.23px] leading-8 mb-12 font-['Poppins-ExtraBold',Helvetica]">
          Choose your preferred course
        </h1>

        <div className="flex flex-col space-y-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="relative w-full bg-[#fff7f7] shadow-[4px_4px_4px_#000000] border border-solid border-black rounded-md overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start">
                  <h2 className="font-extrabold text-[#464646] text-3xl tracking-[-0.23px] leading-8 font-['Poppins-ExtraBold',Helvetica]">
                    {course.title}
                  </h2>
                  <span className="text-[#7b7b7b] text-base font-['Inter-Regular',Helvetica]">
                    Total Time: {course.totalTime}
                  </span>
                </div>
                <p className="mt-6 text-[#7b7b7b] text-base font-['Inter-Regular',Helvetica] leading-[22px]">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}