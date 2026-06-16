import { useEffect, useState } from "react";
import { useInstrumentorContext } from "../lib/use-instrumentor";
import { INSTRUMENTED_FRAME_COUNT } from "@/experiments/mouse-trail/constants";

export function Instrumentation() {
    const { records } = useInstrumentorContext();
    
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }, [])
    
    return (
        <div className="flex flex-col items-center gap-3 border-none">
            <table
                style={{
                    width: "100%",
                }}
            >
                <thead>
                    <tr>
                        <th style={cellStyle}>Approach</th>
                        <th style={cellStyle}>Avg Frame Time</th>
                        <th style={cellStyle}>Janked Frame Count (out of {INSTRUMENTED_FRAME_COUNT})</th>
                        <th style={cellStyle}>Worst Frame Time</th>
                    </tr>
                </thead>

                <tbody>
                    {records.length === 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                style={{
                                    ...cellStyle,
                                    textAlign: "center",
                                    padding: "24px",
                                    opacity: 0.7,
                                }}
                            >
                                No frame data yet :(
                                <br />
                                Move your {isTouch ? "finger" : "mouse"} around in the demos, until a popup appears on the top saying stats for that demo is recorded!
                            </td>
                        </tr>
                    ) : (
                        records.map((record: InstrumentRecord) => (
                            <tr key={record.key}>
                                <td style={cellStyle}>
                                    {record.key}
                                </td>

                                <td style={cellStyle}>
                                    {record.averageFrameTime.toFixed(2)} ms
                                </td>

                                <td style={cellStyle}>
                                    {record.jankedFrameCount}
                                </td>

                                <td style={cellStyle}>
                                    {record.worstFrameTime.toFixed(2)} ms
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <span className="text-muted-foreground text-sm">Your device stats :)</span>
        </div>
    );
}

const cellStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px 12px",
    textAlign: "left",
};

export interface InstrumentRecord {
    key: string;
    averageFrameTime: number;
    jankedFrameCount: number;
    worstFrameTime: number;
}