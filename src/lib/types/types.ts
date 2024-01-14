import { components, paths } from "./Line";

export type TflLineStatusByModeResponse =  paths["/Mode/{modes}/Status"]["get"]["responses"][200]["content"]["application/json"]
export type TflLineInfo = components["schemas"]["Tfl-19"]
export type TflLineStatuses = components["schemas"]["Tfl-16"][]