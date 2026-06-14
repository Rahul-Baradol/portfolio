import React, { createContext, useCallback, useContext, useRef, useState } from "react";

export interface InstrumentRecord {
    key: string;
    averageFrameTime: number;
    jankedFrameCount: number;
    worstFrameTime: number;
}

export function useInstrumentor() {
    const [records, setRecords] = useState<InstrumentRecord[]>([]);
    const recordKeys = useRef(new Set<string>());

    const hasRecord = useCallback((key: string) => {
        return recordKeys.current.has(key);
    }, []);

    const recordFrameTime = useCallback((record: InstrumentRecord) => {
        if (recordKeys.current.has(record.key)) {
            return;
        }

        recordKeys.current.add(record.key);

        setRecords(prev => {
            const next = [...prev, record];
            console.log("updating records", next);
            return next;
        });
    }, []);

    return {
        recordFrameTime,
        hasRecord,
        records,
    };
}

type InstrumentorContextType = ReturnType<typeof useInstrumentor>;

export const InstrumentorContext = createContext<InstrumentorContextType | undefined>(undefined);

export function InstrumentorProvider({ children }: { children: React.ReactNode }) {
    const value = useInstrumentor();

    return (
        <InstrumentorContext.Provider value={value}>
            {children}
        </InstrumentorContext.Provider>
    );
}

export function useInstrumentorContext() {
    const ctx = useContext(InstrumentorContext);
    if (!ctx) {
        throw new Error("useInstrumentorContext must be used within an InstrumentorProvider");
    }
    return ctx;
}
