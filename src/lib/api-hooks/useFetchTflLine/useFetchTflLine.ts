import axios, { AxiosError } from "axios";
import { components, paths } from "../../types/Line";

// set up type inference
type TflLinePaths = keyof paths;
interface OperationWithoutParams {
    responses: {
        [statusCode: number]: {
            content: {
                "application/json": components["schemas"][keyof components["schemas"]];
                "text/json": components["schemas"][keyof components["schemas"]];
                "application/xml": components["schemas"][keyof components["schemas"]];
                "text/xml": components["schemas"][keyof components["schemas"]];
            };
        };
    };
}
interface OperationWithParams extends OperationWithoutParams {
    parameters: {
        query?: { [queryParamName: string]: any };
        path: { [pathParamName: string]: string };
    };
}

type QueryParams<P extends TflLinePaths = TflLinePaths> = paths[P]["get"] extends OperationWithParams
    ? paths[P]["get"]["parameters"]["query"]
    : undefined;
type PathParams<P extends TflLinePaths = TflLinePaths> = paths[P]["get"] extends OperationWithParams
    ? paths[P]["get"]["parameters"]["path"]
    : undefined;

// UTILITY FUNCTIONS
export function replacePathParams<P extends TflLinePaths>(path: P, pathParams: PathParams<P>) {
    return path.replace(/{(.*?)}/g, (match, capture) => pathParams?.[capture] ?? match);
}

export function generateQueryParams(queryParams: { [queryParamName: string]: string } | undefined) {
    if (!process.env.NEXT_PUBLIC_TFL_API_KEY || !process.env.NEXT_PUBLIC_TFL_APP_ID) {
        throw new Error("NEXT_PUBLIC_TFL_API_KEY or NEXT_PUBLIC_TFL_APP_ID is undefined");
    }
    const queryParamsWithApiKey = {
        ...(queryParams ?? {}),
        app_key: process.env.NEXT_PUBLIC_TFL_API_KEY,
        app_id: process.env.NEXT_PUBLIC_TFL_APP_ID,
    };
    return new URLSearchParams(queryParamsWithApiKey).toString();
}

// useFetchTflLine HOOK
export default async function useFetchTflLine<P extends TflLinePaths>(
    path: P,
    pathParams?: PathParams<P>,
    queryParams?: QueryParams<P>
): Promise<paths[P]["get"]["responses"][200]["content"]["application/json"] | undefined> {
    const baseUrl = "https://api.tfl.gov.uk/Line";
    const reqUrl = (pathParams ? replacePathParams(path, pathParams!) : path) + "?" + generateQueryParams(queryParams);
    const reqUrlEncoded = baseUrl + encodeURI(reqUrl);
    const res = await axios.get(reqUrlEncoded, {
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
    return res.data as paths[P]["get"]["responses"][200]["content"]["application/json"];
}
