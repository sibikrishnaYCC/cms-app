import { useEffect, useState } from "react";

export default function Cards({ title, description, width, height, x, y, name, onclick }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let scale = 1;
  if (windowWidth <= 380) scale = 2.5;
  else if (windowWidth <= 470) scale = 2;
  else if (windowWidth <= 640) scale = 2.3;
  else if (windowWidth <= 840) scale = 1.8;

  const imageStyle = {
    bottom: `${y / scale}px`,
    right: `${x / scale}px`,
    width: `${width / scale}px`,
    height: `${height / scale}px`,
    transition: "all 0.5s ease-in-out",
  };

  const cardHeightClass =
  windowWidth <= 380 ? "h-20" :
  windowWidth <= 890 ? "h-28" :
  "h-44";


  let descWidth = "w-[235px]";
  if (windowWidth <= 380) descWidth = "w-[50px]";
  else if (windowWidth <= 470) descWidth = "w-[100px]";
  else if (windowWidth <= 640) descWidth = "w-[150px]";
  else if (windowWidth <= 890) descWidth = "w-[130px]";

  return (
    <>
      <div
        onClick={onclick}
        className={`transition-all duration-500 ease-in-out w-[420px] card-width max-lg:w-[350px] max-md:w-[250px] max-sm:w-[190px] ${cardHeightClass} flex-grow border border-[var(--border-color)] rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] hover:border-[var(--border-hover)] flex flex-col px-7 py-5 max-sm:px-5 max-sm:py-4 relative overflow-hidden cursor-pointer bg-[var(--bg)] text-[var(--text-color)]`}
      >
        <h1 className="font-semibold text-[18px] cards-title transition-all duration-500 ease-in-out">
          {title}
        </h1>
        <h1
          className={`text-[14px]  font-light ${descWidth} line-clamp-2 leading-snug cards-desc transition-all duration-500 ease-in-out`}
        >
          {description}
        </h1>
        <img src={name} alt={title} className="absolute" style={imageStyle} />
      </div>

      <style>{`
        .cards-title,
        .cards-desc,
        .card-width {
          will-change: font-size, width, height;
        }

        @media (max-width: 640px) {
          .cards-title { font-size: 14px !important; }
          .cards-desc { font-size: 10px !important; }
        }

        @media (max-width: 891px) {
          .card-width { width: 340px !important; }
          .cards-title { font-size: 12px !important; }
          .cards-desc { font-size: 8px !important; }
        }

        @media (max-width: 872px) {
          .card-width { width: 200px !important; }
          .cards-title { font-size: 11px !important; }
          .cards-desc { font-size: 7px !important; }
        }

        @media (max-width: 435px) {
          .card-width { width: 180px !important; }
        }

        @media (max-width: 391px) {
          .card-width { width: 160px !important; }
          .cards-title { font-size: 10px !important; }
          .cards-desc { font-size: 6px !important; }
        }

        @media (max-width: 351px) {
          .card-width { width: 150px !important; }
        }

        @media (max-width: 331px) {
          .card-width { width: 140px !important; }
        }
        
        @media (max-width: 307px) {
          .card-width { width: 130px !important; }
        }

      `}</style>
    </>
  );
}
