import Cards from "../Interface/Cards";
import assets from "../../assets/assets.js";

export default function MainInterface() {
    return (
        <div className="flex flex-wrap gap-8 p-20 justify-center items-center">
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