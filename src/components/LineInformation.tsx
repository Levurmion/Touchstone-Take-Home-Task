"use client";

import fetchTflLine from "@/lib/tfl-api/fetchTflLine/fetchTflLine";
import { TubeLineStatusContext } from "@/lib/contexts/TubeLineStatusContext";
import { useState } from "react";
import useSWR from "swr";
import withDebounce from "./HOC/withDebounce";
import SearchBar from "./SearchBar";
import LineTable from "./LineTable";
import LineStatusModal from "./LineStatusModal";
import Image from "next/image";

const DebouncedSearchBar = withDebounce(SearchBar);

export default function LineInformation() {
    const { data, isLoading, error } = useSWR(
        "tube",
        (mode) => {
            return fetchTflLine("/Mode/{modes}/Status", { modes: mode });
        },
        {
            refreshInterval: 60000,
        }
    );
    const [filterString, setFilterString] = useState("");
    const [selectedLineId, setSelectedLineId] = useState<null | string>(null);

    const handleSetChange = (value: string) => {
        setFilterString(value);
    };

    const handleSelectLine = (id: string) => {
        setSelectedLineId(id ?? null);
    };

    const handleCloseModal = () => {
        setSelectedLineId(null)
    }

    return (
        <TubeLineStatusContext.Provider value={data ?? null}>
            {
                selectedLineId !== null && (
                    <LineStatusModal
                        lineId={selectedLineId}
                        closeModalCb={handleCloseModal}
                    />
                )
            }
            <section className="flex flex-col gap-2 items-center w-full h-fit">
                <div className="h-10 w-full">
                    <DebouncedSearchBar placeholder="search for a line" setChangeCb={handleSetChange} />
                </div>
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <LineTable filterString={filterString} selectLineCb={handleSelectLine} />
                )}
            </section>
        </TubeLineStatusContext.Provider>
    );
}

export function LoadingIndicator() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[70vh] animate-pulse">
            <Image alt="TfL-logo" src="/tfl_no_text.png" height={100} width={100} />
        </div>
    );
}
