import { resolveAssetPath } from "../../utils/assetResolver";

const _rawListVentana = {
    nova: [
        { id: 1, image: "../../assets/webService/s/01.Ventanas/nova/a1.jpeg", name: "vn_01" },
        { id: 2, image: "../../assets/webService/s/01.Ventanas/nova/a2.jpeg", name: "vn_02" },
        { id: 3, image: "../../assets/webService/s/01.Ventanas/nova/a3.jpeg", name: "vn_03" },
        { id: 4, image: "../../assets/webService/s/01.Ventanas/nova/a4.jpeg", name: "vn_04" },
        { id: 5, image: "../../assets/webService/s/01.Ventanas/nova/a5.jpeg", name: "vn_05" },
        { id: 6, image: "../../assets/webService/s/01.Ventanas/nova/a6.jpeg", name: "vn_06" },
        { id: 7, image: "../../assets/webService/s/01.Ventanas/nova/a7.jpeg", name: "vn_07" },
        { id: 8, image: "../../assets/webService/s/01.Ventanas/nova/a8.jpeg", name: "vn_08" },
        { id: 9, image: "../../assets/webService/s/01.Ventanas/nova/a9.jpeg", name: "vn_09" },
        { id: 10, image: "../../assets/webService/s/01.Ventanas/nova/a10.jpeg", name: "vn_10" },
        { id: 11, image: "../../assets/webService/s/01.Ventanas/nova/a11.jpeg", name: "vn_11" },
        { id: 12, image: "../../assets/webService/s/01.Ventanas/nova/a12.jpeg", name: "vn_12" },
    ],
    serie25: [
        { id: 1, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0294.jpeg", name: "vs_01" },
        { id: 2, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0292.jpeg", name: "vs_02" },
        { id: 3, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0799.jpeg", name: "vs_03" },
        { id: 4, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0294.jpeg", name: "vs_08" },
        { id: 5, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0300.jpeg", name: "vs_04" },
        { id: 6, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0304.jpeg", name: "vs_05" },
        { id: 7, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0303.jpeg", name: "vs_06" },
        { id: 8, image: "../../assets/webService/s/01.Ventanas/serie/IMG_9209.jpeg", name: "vs_09" },
    ],
    serie31: [
        { id: 1, image: "../../assets/webService/s/01.Ventanas/serie/IMG_0799.jpeg", name: "vs_07" },
        { id: 2, image: "../../assets/webService/s/01.Ventanas/serie/IMG_20211026_110742.jpeg", name: "vs_10" },
        { id: 3, image: "../../assets/webService/s/01.Ventanas/serie/IMG_20211026_110803.jpeg", name: "vs_11" },
        { id: 4, image: "../../assets/webService/s/01.Ventanas/serie/IMG_20211026_114159.jpeg", name: "vs_12" }
    ]
};

const processImagePaths = (data) => {
    const processedData = {};
    for (const key in data) {
        if (Array.isArray(data[key])) {
            processedData[key] = data[key].map(item => ({
                ...item,
                image: resolveAssetPath(item.image)
            }));
        } else {
            processedData[key] = data[key];
        }
    }
    return processedData;
};

export const listVentana = processImagePaths(_rawListVentana);
