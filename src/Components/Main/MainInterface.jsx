import { useEffect, useState } from "react";
import Cards from "../Interface/Cards";
import assets from "../../assets/assets.js";

export default function MainInterface() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;

        const handleImageLoad = () => {
            loadedCount++;
            if (loadedCount === assets.length) {
                setLoaded(true);
            }
        };

        const imageElements = assets.map((asset) => {
            const img = new Image();
            img.src = asset.name;
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad; // continue even if an image fails
            return img;
        });

        // Optional: cleanup (not strictly needed)
        return () => {
            imageElements.forEach((img) => {
                img.onload = null;
                img.onerror = null;
            });
        };
    }, []);

    if (!loaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                <span className="ml-4 text-gray-700 text-lg">Loading assets...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap p-20 max-sm:py-20 max-sm:p-2 justify-center gap-8 max-sm:gap-4 items-center">
            {assets.map((asset, index) => (
                <Cards
                    key={index}
                    title={asset.title}
                    description={asset.description}
                    width={asset.width}
                    height={asset.height}
                    x={asset.x}
                    y={asset.y}
                    name={asset.name}
                />
            ))}
        </div>
    );
}
