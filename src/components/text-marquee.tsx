import { marqueeTexts } from "../constants";

export const TextMarquee = () => {
    return (
        <div className="center-content">
            <div className="wrapper">
                <div className="marquee-text rotate-left fadeout-horizontal">
                    <div className="marquee-text-track">
                        {
                            marqueeTexts.map((text, index) => (
                                <p className="select-none" key={index}>{text}</p>
                            ))
                        }
                        {
                            marqueeTexts.map((text, index) => (
                                <p className="select-none" key={index} aria-hidden="true">{text}</p>
                            ))
                        }
                    </div>
                </div>
                <div className="marquee-text rotate-right fadeout-horizontal">
                    <div
                        style={
                            {
                                "--direction": "reverse",
                                "--speed": "20s",
                            } as React.CSSProperties
                        }
                        className="marquee-text-track"
                    >
                        {
                            marqueeTexts.map((text, index) => (
                                <p className="select-none" key={index}>{text}</p>
                            ))
                        }
                        {
                            marqueeTexts.map((text, index) => (
                                <p className="select-none" key={index} aria-hidden="true">{text}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};