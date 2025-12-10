import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CoastFIREChartProps {
  currentAge: number;
  retirementAge: number;
  currentAssets: number;
  monthlyContributions: number;
  growthRate: number;
  inflationRate: number;
  investmentFees: number;
  fireNumber: number;
}

interface ChartDataPoint {
  age: number;
  portfolio: number;
  coastOnly: number;
  fireTarget: number;
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
};

const CoastFIREChart = ({
  currentAge,
  retirementAge,
  currentAssets,
  monthlyContributions,
  growthRate,
  inflationRate,
  investmentFees,
  fireNumber,
}: CoastFIREChartProps) => {
  const chartData = useMemo(() => {
    const data: ChartDataPoint[] = [];
    const netGrowthRate = (growthRate - inflationRate - investmentFees) / 100;
    const annualContribution = monthlyContributions * 12;
    
    let portfolioWithContributions = currentAssets;
    let portfolioCoastOnly = currentAssets;
    
    for (let age = currentAge; age <= retirementAge; age++) {
      data.push({
        age,
        portfolio: Math.round(portfolioWithContributions),
        coastOnly: Math.round(portfolioCoastOnly),
        fireTarget: fireNumber,
      });
      
      // Grow with contributions
      portfolioWithContributions = portfolioWithContributions * (1 + netGrowthRate) + annualContribution;
      // Grow without contributions (coast mode)
      portfolioCoastOnly = portfolioCoastOnly * (1 + netGrowthRate);
    }
    
    return data;
  }, [currentAge, retirementAge, currentAssets, monthlyContributions, growthRate, inflationRate, investmentFees, fireNumber]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">Age {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Portfolio Growth Projection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="coastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis 
                dataKey="age" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis 
                tickFormatter={formatCurrency}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={fireNumber} 
                stroke="hsl(var(--destructive))" 
                strokeDasharray="5 5" 
                label={{ 
                  value: "FIRE Target", 
                  position: "right",
                  fill: "hsl(var(--destructive))",
                  fontSize: 11
                }} 
              />
              <Area
                type="monotone"
                dataKey="coastOnly"
                name="Coast Only"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="url(#coastGradient)"
              />
              <Area
                type="monotone"
                dataKey="portfolio"
                name="With Contributions"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#portfolioGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">With Contributions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-muted-foreground" style={{ borderStyle: 'dashed' }} />
            <span className="text-muted-foreground">Coast Only (No Contributions)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-destructive" style={{ borderStyle: 'dashed' }} />
            <span className="text-muted-foreground">FIRE Target</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoastFIREChart;
