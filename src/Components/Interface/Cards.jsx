import { useEffect, useState } from "react";

export default function Cards({ title, description, width, height, x, y, name }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Detect screen size on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Responsive image scaling
    let scale = 1;
    if (windowWidth <= 380) scale = 1.8;
    else if (windowWidth <= 470) scale = 2;
    else if (windowWidth <= 640) scale = 2.3;

    const imageStyle = {
        bottom: `${y / scale}px`,
        right: `${x / scale}px`,
        width: `${width / scale}px`,
        height: `${height / scale}px`,
    };

    // Responsive card height
    const cardHeightClass = windowWidth <= 640 ? "h-32" : "h-44";

    // Responsive description width
    let descWidth = "w-[235px]";
    if (windowWidth <= 380) descWidth = "w-[160px]";
    else if (windowWidth <= 470) descWidth = "w-[180px]";
    else if (windowWidth <= 640) descWidth = "w-[200px]";

    return (
        <>
            {/* Main Card Container */}
            <div
                className={`w-[420px] ${cardHeightClass} border border-gray-400/50 rounded-md shadow-md flex flex-col px-7 py-5 relative overflow-hidden flex-grow`}
            >
                {/* Title */}
                <h1 className="font-semibold text-[20px] sm:text-[22px] cards-title">
                    {title}
                </h1>

                {/* Description with dynamic width */}
                <h1
                    className={`text-[16px] sm:text-[18px] font-light ${descWidth} line-clamp-2 leading-snug cards-desc`}
                >
                    {description}
                </h1>

                {/* Positioned Image */}
                <img src={name} alt={title} className="absolute" style={imageStyle} />
            </div>

            {/* Font Media Queries */}
            <style>{`
                @media (max-width: 470px) {
                    .cards-title {
                        font-size: 18px !important;
                    }
                    .cards-desc {
                        font-size: 14px !important;
                    }
                }

                @media (max-width: 380px) {
                    .cards-title {
                        font-size: 17px !important;
                    }
                    .cards-desc {
                        font-size: 13px !important;
                    }
                }
            `}</style>
        </>
    );
}
