"use client"

import useFetchTflLine from "@/lib/api-hooks/useFetchTflLine/useFetchTflLine"
import { TubeLineStatusContext } from "@/lib/contexts/TubeLineStatusContext"
import { useEffect, useState } from "react"
import useSWR from "swr"
import withDebounce from "./HOC/withDebounce"
import SearchBar from "./SearchBar"
import LineTable from "./LineTable"
import { TflLineInfo } from "@/lib/types/types"
import LineStatusModal from "./LineStatusModal"

const DebouncedSearchBar = withDebounce(SearchBar)

export default function LineInformation () {

    const {data, isLoading, error} = useSWR("tube", (mode) => {
        return useFetchTflLine('/Mode/{modes}/Status', {modes: mode})
    }, {
        refreshInterval: 60000
    })
    const [filterString, setFilterString] = useState("")
    const [selectedLineId, setSelectedLineId] = useState<null | string>(null)

    const handleSetChange = (value: string) => {
        setFilterString(value)
    }

    const handleSelectLine = (id: string) => {
        setSelectedLineId(id ?? null)
    }

    return (
        <TubeLineStatusContext.Provider value={data ?? null}>
            {selectedLineId !== null && <LineStatusModal lineId={selectedLineId} closeModalCb={() => {setSelectedLineId(null)}}/>}
            <section className="flex flex-col gap-2 items-center w-full h-fit">
                <div className="h-10 w-full">
                    <DebouncedSearchBar placeholder="search for a line" setChangeCb={handleSetChange}/>
                </div>
                <LineTable filterString={filterString} selectLineCb={handleSelectLine}/>
            </section>
        </TubeLineStatusContext.Provider>
    )
}