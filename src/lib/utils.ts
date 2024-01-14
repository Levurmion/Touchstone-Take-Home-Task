import { TflLineStatuses } from "./types/types";

export const tubeLineColors: { [lineId: string]: string } = {
    "waterloo-city": "bg-tfl-waterloo text-black",
    "district": "bg-tfl-district text-white",
    "central": "bg-tfl-central text-white",
    "victoria": "bg-tfl-victoria text-black",
    "piccadilly": "bg-tfl-piccadilly text-white",
    "northern": "bg-tfl-northern text-white",
    "metropolitan": "bg-tfl-metro text-white",
    "jubilee": "bg-tfl-jubilee text-white",
    "hammersmith-city": "bg-tfl-hammcity text-black",
    "circle": "bg-tfl-circle text-black",
    "bakerloo": "bg-tfl-bakerloo text-white"
}

export function isGoodService (lineStatuses: TflLineStatuses | undefined) {
    return lineStatuses?.every(lineStatus => lineStatus.statusSeverity === 10) ?? false
}