import { tflTransportModes, tflTubeLineStatusKeys } from "./fixtures";
import fetchTflLine, { generateQueryParams, replacePathParams } from "./fetchTflLine";


describe("fetchTflLine Hook Testing Suite", () => {
    test("replacePathParams substitutes path params", () => {
        const urlParams = replacePathParams("/{ids}/Arrivals/{stopPointId}", {
            ids: "victoria",
            stopPointId: "Brixton",
        });
        expect(urlParams).toBe("/victoria/Arrivals/Brixton");
    });

    test("generateQueryParams always includes API key", () => {
        const withNoQueryParams = generateQueryParams({});
        const withQueryParams = generateQueryParams({
            query: "queryParamValue",
        });
        expect(withNoQueryParams).toBe("app_key=7530ba93489a475aa74c958b5173a8cc&app_id=touchstone_tfl_monitoring_app");
        expect(withQueryParams).toBe(
            "query=queryParamValue&app_key=7530ba93489a475aa74c958b5173a8cc&app_id=touchstone_tfl_monitoring_app"
        );
    });

    test("fetchTflLine can fetch transport modes", async () => {
        const response = await fetchTflLine("/Meta/Modes");
        expect(response).toEqual(tflTransportModes);
    });

    test("fetchTflLine can fetch tube lines status", async () => {
        const response = await fetchTflLine("/Mode/{modes}/Status", {
            modes: "tube",
        });
        for (const lineStatus of response as any) {
            expect(Object.keys(lineStatus).sort()).toEqual(tflTubeLineStatusKeys.sort());
        }
    });
});
