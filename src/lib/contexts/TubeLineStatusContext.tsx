import { createContext, useContext } from "react";
import { paths } from "../types/Line";
import { TflLineStatusByModeResponse } from "../types/types";

export const TubeLineStatusContext = createContext<null | TflLineStatusByModeResponse>(null);

export function useTubeLineStatusContext() {
    const tubeLineStatusContext = useContext(TubeLineStatusContext);

    if (tubeLineStatusContext === undefined) {
        throw new Error("useTubeLineStatusContext can only be used within TubeLineStatusContext.Provider");
    } else {
        return tubeLineStatusContext;
    }
}
