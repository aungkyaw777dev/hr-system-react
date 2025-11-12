import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Full Pie Chart with percentage labels using shadcn UI + Recharts
// Usage: <FullPieChartWithPercentage data={[{ name: 'A', value: 300 }, { name: 'B', value: 200 }, { name: 'C', value: 14 }]} />

const DEFAULT_COLORS = [
  "#60A5FA", // blue-400
  "#34D399", // emerald-400
  "#F59E0B", // amber-500
  "#F472B6", // pink-400
  "#A78BFA", // violet-400
];

export default function PieChartWithPercentage({
  data = [
    { name: "Completed Project", value: 300 },
    { name: "Ongoing Project", value: 200 },
    { name: "Pending", value: 14 },
  ],
  colors = DEFAULT_COLORS,
  height = 250,
}) {
  const total = data.reduce((sum, d) => sum + (d.value || 0), 0);
  const enriched = data.map((d) => ({
    ...d,
    value: Number(d.value) || 0,
    percent: total > 0 ? (Number(d.value || 0) / total) * 100 : 0,
  }));

  const renderLabel = (entry) => {
    const p = entry.percent;
    return p >= 1 ? `${Math.round(p)}%` : `${p.toFixed(1)}%`;
  };

  return (
    <Card className="w-full bg-natural-50 border-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Project Overview</CardTitle>
        <div className="bg-primary-50 rounded">
          <p className="text-primary-500">Monthly</p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center w-full">
        <div style={{ width: "100%", height }} className="flex">
          <ResponsiveContainer>
            <PieChart className="flex flex-row w-full">
              <Pie
                data={enriched}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                labelLine={true}
                label={(props) => renderLabel(props.payload)}
              >
                {enriched.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  const percent =
                    props && props.payload ? props.payload.percent : null;
                  const percentText =
                    percent != null ? ` (${percent.toFixed(1)}%)` : "";
                  return [value, `${name}${percentText}`];
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
