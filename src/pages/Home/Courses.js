import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const { courses = [] } = portfolioData || {};

  // ✅ Detect screen size on load and resize
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Run once initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Avoid rendering if no data
  if (!courses.length) return null;

  return (
    <div>
      <SectionTitle title="Courses" />

      {/* ---------- DESKTOP VIEW ---------- */}
      {!isMobile && (
        <div className="flex py-10 gap-20">
          {/* Left Side Titles List */}
          <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3">
            {courses.map((course, index) => (
              <div
                key={index}
                onClick={() => setSelectedItemIndex(index)}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl px-5 transition-all duration-200 ${
                    selectedItemIndex === index
                      ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                      : "text-white"
                  }`}
                >
                  {course.title}
                </h1>
              </div>
            ))}
          </div>

          {/* Right Side Course Details */}
          <div className="flex items-center justify-center gap-10 w-2/3">
            <img
              src={courses[selectedItemIndex]?.image}
              alt={courses[selectedItemIndex]?.title || ""}
              className="h-60 w-72 object-cover rounded-lg"
            />
            <div className="flex flex-col gap-5">
              <h1 className="text-secondry text-xl">
                {courses[selectedItemIndex]?.title}
              </h1>
              <p className="text-white">
                {courses[selectedItemIndex]?.description}
              </p>

              {/* Course Link */}
              {courses[selectedItemIndex]?.link &&
              courses[selectedItemIndex]?.link !== "/" ? (
                <a
                  href={courses[selectedItemIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary underline"
                >
                  View Course
                </a>
              ) : (
                <span className="text-red-500">Not Available</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- MOBILE VIEW (Accordion) ---------- */}
      {isMobile && (
        <div className="flex flex-col py-5">
          {courses.map((course, index) => (
            <div
              key={index}
              className="border-l-2 border-[#135e4c82] mb-3 cursor-pointer"
            >
              {/* Accordion Header */}
              <div
                onClick={() =>
                  setSelectedItemIndex(
                    selectedItemIndex === index ? -1 : index
                  )
                }
                className={`px-5 py-3 ${
                  selectedItemIndex === index
                    ? "bg-[#1a7f5a31] text-tertiary border-l-4 border-tertiary -ml-[3px]"
                    : "text-white"
                }`}
              >
                {course.title}
              </div>

              {/* Accordion Details */}
              {selectedItemIndex === index && (
                <div className="px-8 py-3 text-gray-300 flex flex-col gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-52 w-full object-cover rounded-lg"
                  />
                  <p>{course.description}</p>

                  {/* Course Link */}
                  {course.link && course.link !== "/" ? (
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary underline"
                    >
                      View Course
                    </a>
                  ) : (
                    <span className="text-red-500">Not Available</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
