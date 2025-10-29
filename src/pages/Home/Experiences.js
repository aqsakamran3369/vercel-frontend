import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences = [] } = portfolioData || {};

  // ✅ Detect screen size on load and resize
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Run once when component mounts
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Avoid rendering when no data
  if (!experiences.length) return null;

  return (
    <div>
      <SectionTitle title="Experiences" />

      {/* ---------- DESKTOP VIEW ---------- */}
      {!isMobile && (
        <div className="flex py-10 gap-20">
          {/* Left Side Timeline */}
          <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/2">
            {experiences.map((experience, index) => (
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
                  {experience.period}
                </h1>
              </div>
            ))}
          </div>

          {/* Right Side Details */}
          <div className="flex flex-col gap-5 w-1/2">
            <h1 className="text-secondry text-xl">
              {experiences[selectedItemIndex]?.title || ""}
            </h1>
            <h1 className="text-tertiary text-xl">
              {experiences[selectedItemIndex]?.company || ""}
            </h1>
            <p className="text-white">
              {experiences[selectedItemIndex]?.description || ""}
            </p>
          </div>
        </div>
      )}

      {/* ---------- MOBILE VIEW ---------- */}
      {isMobile && (
        <div className="flex flex-col py-5">
          {experiences.map((experience, index) => (
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
                {experience.period}
              </div>

              {/* Accordion Details */}
              {selectedItemIndex === index && (
                <div className="px-8 py-3 text-gray-300">
                  <h2 className="text-secondry text-lg">{experience.title}</h2>
                  <h3 className="text-tertiary text-md">
                    {experience.company}
                  </h3>
                  <p className="mt-2">{experience.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Experiences;
