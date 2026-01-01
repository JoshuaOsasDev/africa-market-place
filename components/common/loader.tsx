import { div } from "framer-motion/client";

const Loader = () => {
  return (
    <div className="ralative">
      <div className="transparent fixed top-0 left-0 z-2 flex h-screen w-screen items-center justify-center opacity-35 bg-slate-50 "></div>
          <div className="absolute top-0 right-0 left-0 bottom-0 z-22 flex items-center justify-center">
          <div className="loader " />
     </div>
    </div>
  );
};

export default Loader;
