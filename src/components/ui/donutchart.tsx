interface FullDonutChartProps {
    values: number[];      // e.g. [40, 25, 15, 20]
    colors: string[];      // same length
    size?: number;         // px
    strokeWidth?: number;  // thickness
}

export function FullDonutChart({ values, colors, size = 200, strokeWidth = 16 }: FullDonutChartProps) {
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    const total = values.reduce((a, b) => a + b, 0);
    let cumulativePercent = 0;

    // Convert percent to radians for SVG arc
    const getArcPath = (percent: number) => {
        const startAngle = 2 * Math.PI * cumulativePercent;
        const endAngle = startAngle + 2 * Math.PI * percent;
        const x1 = center + radius * Math.cos(startAngle - Math.PI / 2);
        const y1 = center + radius * Math.sin(startAngle - Math.PI / 2);
        const x2 = center + radius * Math.cos(endAngle - Math.PI / 2);
        const y2 = center + radius * Math.sin(endAngle - Math.PI / 2);
        const largeArcFlag = percent > 0.5 ? 1 : 0;

        cumulativePercent += percent;

        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    };

    return (
        <div className="flex gap-3">
            <div className="relative flex items-center justify-center w-[300px] h-[200px]">
                <svg width={size} height={size}>
                    {values.map((value, i) => (
                        <path
                            key={i}
                            d={getArcPath(value / total)}
                            stroke={colors[i]}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                        />
                    ))}
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-sm font-medium">
                    {values.map((v, i) => (
                        <div key={i} className="flex items-center text-gray-800">
                            <span className="inline-block w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: colors[i] }} />
                            {Math.round((v / total) * 100)}%
                        </div>
                    ))}
                </div>
                {/* Linear Progress Bars */}

            </div>
            <div className="w-full flex flex-col gap-2">
                {values.map((v, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Segment {i + 1}</span>
                            <span>{Math.round((v / total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="h-3 rounded-full"
                                style={{
                                    width: `${(v / total) * 100}%`,
                                    backgroundColor: colors[i],
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
