"use client";

import { useTubeLineStatusContext } from "@/lib/contexts/TubeLineStatusContext";
import { tubeLineColors } from "@/lib/utils";
import CloseIcon from "@mui/icons-material/Close";

export default function LineStatusModal({ lineId, closeModalCb }: { lineId: string; closeModalCb: () => void }) {
    const tubeLineStatusContext = useTubeLineStatusContext();
    const selectedLine = tubeLineStatusContext?.find((lineInfo) => lineInfo.id === lineId);

    if (selectedLine) {
        const lineColor = tubeLineColors[lineId];
        const { name, lineStatuses } = selectedLine;

        return (
            <section className="fixed flex flex-col items-center justify-center w-full h-full left-0 top-0 bg-black/15 z-50">
                <dialog className="fixed flex flex-col gap-4 w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-h-[90dvh] overflow-scroll rounded-lg shadow-lg p-6 bg-white no-scrollbar">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="w-fit text-2xl sm:text-3xl font-semibold">{name} line</h1>
                            <div className="text-2xl hover:cursor-pointer" onClick={closeModalCb}>
                                <CloseIcon fontSize="inherit" />
                            </div>
                        </div>
                        <div className={`${lineColor} w-full h-1`}></div>
                    </div>
                    {lineStatuses?.map((lineStatus) => {
                        const { disruption } = lineStatus;
                        if (disruption) {
                            return <p className="text-xl" key={lineStatus.statusSeverity}>{disruption.description}</p>;
                        } else {
                            return <p className="text-xl" key={lineStatus.statusSeverity}>{lineStatus.statusSeverityDescription}</p>;
                        }
                    })}
                </dialog>
            </section>
        );
    }
}
