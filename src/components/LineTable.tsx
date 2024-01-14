"use client";

import { useTubeLineStatusContext } from "@/lib/contexts/TubeLineStatusContext";
import { TflLineInfo, TflLineStatuses, TflLineStatusByModeResponse } from "@/lib/types/types";
import { isGoodService, tubeLineColors } from "@/lib/utils";
import { useEffect, useMemo } from "react";

export default function LineTable({ filterString, selectLineCb }: { filterString: string, selectLineCb?: (lineId: string) => void }) {

    const tubeLineContext = useTubeLineStatusContext();
    const tubeLinesFiltered = tubeLineContext?.filter((lineInfo) => {
        return filterString === "" || new RegExp(`\\b\\w*${filterString}\\w*\\b`, "i").test(lineInfo.name as string);
    });
    const tubeLinesSortedByStatusSeverity = tubeLinesFiltered?.sort((lineInfoA, lineInfoB) => {
        const severityA = lineInfoA.lineStatuses?.[0].statusSeverity;
        const severityB = lineInfoB.lineStatuses?.[0].statusSeverity;
        if (severityA === undefined || severityB === undefined) return 0;
        else if (severityA > severityB) return 1;
        else return -1;
    });

    return (
        <table className="w-full text-lg sm:text-xl table-fixed bg-white rounded-md shadow-sm shadow-black/25 overflow-hidden">
            <tbody>
                {tubeLinesSortedByStatusSeverity?.map((lineInfo) => {
                    return <LineTableRow key={lineInfo.id} lineInfo={lineInfo} selectCb={() => {selectLineCb ? selectLineCb(lineInfo.id as string) : null}}/>;
                })}
            </tbody>
        </table>
    );
}

export function LineTableRow({ lineInfo, selectCb }: { lineInfo: TflLineInfo, selectCb?: () => void }) {
    const lineNameStyle = lineInfo.id ? tubeLineColors[lineInfo.id] : ""
    const lineStatusStyle = isGoodService(lineInfo.lineStatuses) ? "bg-slate-100" : "bg-orange-100"
    return (
        <tr className="transition-all hover:cursor-pointer hover:filter hover:brightness-105" onClick={selectCb}>
            <td className={`${lineNameStyle} py-3 px-4`}>{lineInfo.name}</td>
            <td className={`${lineStatusStyle} text-right py-3 px-4`}>
                <StatusList lineId={lineInfo.id} lineStatuses={lineInfo.lineStatuses} />
            </td>
        </tr>
    );
}

export function StatusList({
    lineId,
    lineStatuses,
}: {
    lineId: string | undefined;
    lineStatuses: TflLineStatuses | undefined;
}) {
    return (
        <ol>
            {lineStatuses?.map((lineStatus) => {
                const { statusSeverityDescription, statusSeverity } = lineStatus;
                const key = `${lineId}:${statusSeverity}`;
                return <li key={key}>{statusSeverityDescription}</li>;
            })}
        </ol>
    );
}
