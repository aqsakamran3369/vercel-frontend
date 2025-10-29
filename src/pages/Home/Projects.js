import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects = [] } = portfolioData || {};

  // ✅ Detect screen size on load and resize
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Run once initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Avoid rendering if no data
  if (!projects.length) return null;

  return (
    <div>
      <SectionTitle title="Projects" />

      {/* ---------- DESKTOP VIEW ---------- */}
      {!isMobile && (
        <div className="flex py-10 gap-20">
          {/* Left Side Titles List */}
          <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3">
            {projects.map((project, index) => (
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
                  {project.title}
                </h1>
              </div>
            ))}
          </div>

          {/* Right Side Project Details */}
          <div className="flex items-center justify-center gap-10 w-2/3">
            <img
              src={projects[selectedItemIndex]?.image}
              alt={projects[selectedItemIndex]?.title || ""}
              className="h-60 w-72 object-cover rounded-lg"
            />
            <div className="flex flex-col gap-5">
              <h1 className="text-secondry text-xl">
                {projects[selectedItemIndex]?.title}
              </h1>
              <p className="text-white">
                {projects[selectedItemIndex]?.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {projects[selectedItemIndex]?.technologies?.map(
                  (tech, index) => (
                    <span
                      key={index}
                      className="border border-white px-2 py-1 rounded-md text-white"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              {/* Project Link */}
              {projects[selectedItemIndex]?.link &&
              projects[selectedItemIndex]?.link !== "/" ? (
                <a
                  href={projects[selectedItemIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tertiary underline"
                >
                  View Project
                </a>
              ) : (
                <span className="text-red-500">Not Deployed</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- MOBILE VIEW (Accordion) ---------- */}
      {isMobile && (
        <div className="flex flex-col py-5">
          {projects.map((project, index) => (
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
                {project.title}
              </div>

              {/* Accordion Details */}
              {selectedItemIndex === index && (
                <div className="px-8 py-3 text-gray-300 flex flex-col gap-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover rounded-lg"
                  />
                  <p>{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="border border-white px-2 py-1 rounded-md text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  {project.link && project.link !== "/" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary underline"
                    >
                      View Project
                    </a>
                  ) : (
                    <span className="text-red-500">Not Deployed</span>
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

export default Projects;
