import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CoastFIREChartProps {
  currentAge: number;
  retirementAge: number;
  currentAssets: number;
  monthlyContributions: number;
  growthRate: number;
  inflationRate: number;
  investmentFees: number;
  fireNumber: number;
  annualSpending?: number;
  withdrawalRate?: number;
  retirementIncome?: number;
}

interface ChartDataPoint {
  age: number;
  ageLabel: string;
  totalWealth: number;
  realValue: number;
  growth: number;
  withdrawals: number;
  partTimeIncome: number;
}

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }
  return `$${Math.round(value)}`;
};

const formatCurrencyFull = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
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
  annualSpending = 60000,
  withdrawalRate = 4,
  retirementIncome = 0,
}: CoastFIREChartProps) => {
  const [showTable, setShowTable] = useState(false);

  const chartData = useMemo(() => {
    const data: ChartDataPoint[] = [];
    const nominalGrowthRate = (growthRate - investmentFees) / 100;
    const realGrowthRate = (growthRate - inflationRate - investmentFees) / 100;
    const inflationRateDecimal = inflationRate / 100;
    const annualContribution = monthlyContributions * 12;
    
    // Calculate through age 75 or 10 years past retirement
    const endAge = Math.max(retirementAge + 20, 75);
    
    let totalWealth = currentAssets;
    let realValue = currentAssets;
    let cumulativeInflation = 1;
    
    for (let age = currentAge; age <= endAge; age++) {
      const isRetired = age >= retirementAge;
      
      // Calculate inflation-adjusted spending for this year
      const currentSpending = annualSpending * cumulativeInflation;
      
      // Part-time income stays FLAT (nominal value as entered, not inflation-adjusted)
      // This means over time, inflation erodes its purchasing power and portfolio withdrawals must increase
      const flatRetirementIncome = retirementIncome;
      
      // Required withdrawal = spending minus part-time income (only need to withdraw what's not covered)
      const requiredWithdrawal = Math.max(0, currentSpending - flatRetirementIncome);
      
      // Calculate this year's growth
      const yearlyGrowth = totalWealth * nominalGrowthRate;
      
      // Calculate withdrawals (only during retirement, only what's needed)
      const yearlyWithdrawals = isRetired ? requiredWithdrawal : 0;
      
      // Part-time income (only during retirement, flat nominal value)
      const yearlyPartTimeIncome = isRetired ? flatRetirementIncome : 0;
      
      data.push({
        age,
        ageLabel: `Age ${age}`,
        totalWealth: Math.max(0, Math.round(totalWealth)),
        realValue: Math.max(0, Math.round(realValue)),
        growth: Math.max(0, Math.round(yearlyGrowth)),
        withdrawals: Math.round(yearlyWithdrawals),
        partTimeIncome: Math.round(yearlyPartTimeIncome),
      });
      
      // Update for next year
      if (!isRetired) {
        // Accumulation phase: add contributions and growth
        totalWealth = totalWealth * (1 + nominalGrowthRate) + annualContribution;
        realValue = realValue * (1 + realGrowthRate) + annualContribution;
      } else {
        // Retirement phase: subtract only required withdrawal (spending - part-time income), add growth
        const realRequiredWithdrawal = Math.max(0, annualSpending - retirementIncome);
        totalWealth = Math.max(0, totalWealth * (1 + nominalGrowthRate) - requiredWithdrawal);
        realValue = Math.max(0, realValue * (1 + realGrowthRate) - realRequiredWithdrawal);
      }
      
      // Update cumulative inflation
      cumulativeInflation *= (1 + inflationRateDecimal);
    }
    
    return data;
  }, [currentAge, retirementAge, currentAssets, monthlyContributions, growthRate, inflationRate, investmentFees, annualSpending, withdrawalRate, retirementIncome]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex justify-between gap-4" style={{ color: entry.color }}>
              <span>{entry.name}:</span>
              <span className="font-medium">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderLegend = () => (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-1 rounded" style={{ backgroundColor: '#4F7DF3' }} />
        <span className="text-muted-foreground">Total Wealth</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-1 rounded" style={{ backgroundColor: '#4ADE80' }} />
        <span className="text-muted-foreground">Real Value (Today's Money)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-1 rounded" style={{ backgroundColor: '#A78BFA' }} />
        <span className="text-muted-foreground">Growth</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-1 rounded" style={{ backgroundColor: '#F87171' }} />
        <span className="text-muted-foreground">Portfolio Withdrawals</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-1 rounded" style={{ backgroundColor: '#FBBF24' }} />
        <span className="text-muted-foreground">Part-Time Income</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Yearly Overview with Inflation</CardTitle>
        </CardHeader>
        <CardContent>
          {renderLegend()}
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData} 
                margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis 
                  dataKey="ageLabel" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={Math.floor(chartData.length / 12)}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  width={70}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="totalWealth"
                  name="Total Wealth"
                  stroke="#4F7DF3"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#4F7DF3' }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="realValue"
                  name="Real Value (Today's Money)"
                  stroke="#4ADE80"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#4ADE80' }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  name="Growth"
                  stroke="#A78BFA"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#A78BFA' }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="withdrawals"
                  name="Portfolio Withdrawals"
                  stroke="#F87171"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#F87171' }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="partTimeIncome"
                  name="Part-Time Income"
                  stroke="#FBBF24"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#FBBF24' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4 px-4">
            <strong>Note:</strong> Portfolio Withdrawals represent what you need to take from your investments (Spending − Part-Time Income). 
            Your total spending is covered by both withdrawals and part-time income combined.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <Collapsible open={showTable} onOpenChange={setShowTable}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Detailed Financial Projection</CardTitle>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="default" size="sm" className="gap-2">
                  {showTable ? (
                    <>
                      Hide Table
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Show Table
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Age</th>
                      <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Total Wealth</th>
                      <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Real Value</th>
                      <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Growth</th>
                      <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Withdrawals</th>
                      <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Phase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((row, index) => {
                      const isRetirementYear = row.age === retirementAge;
                      const isRetired = row.age >= retirementAge;
                      return (
                        <tr 
                          key={row.age} 
                          className={`border-b border-border/50 ${isRetirementYear ? 'bg-primary/10' : ''} hover:bg-muted/50 transition-colors`}
                        >
                          <td className="py-2 px-2 font-medium">
                            {row.age}
                            {isRetirementYear && (
                              <span className="ml-2 text-xs text-primary font-normal">(Retirement)</span>
                            )}
                          </td>
                          <td className="text-right py-2 px-2" style={{ color: '#4F7DF3' }}>
                            {formatCurrencyFull(row.totalWealth)}
                          </td>
                          <td className="text-right py-2 px-2" style={{ color: '#4ADE80' }}>
                            {formatCurrencyFull(row.realValue)}
                          </td>
                          <td className="text-right py-2 px-2" style={{ color: '#A78BFA' }}>
                            {formatCurrencyFull(row.growth)}
                          </td>
                          <td className="text-right py-2 px-2" style={{ color: '#F87171' }}>
                            {row.withdrawals > 0 ? formatCurrencyFull(row.withdrawals) : '—'}
                          </td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              isRetired 
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' 
                                : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            }`}>
                              {isRetired ? 'Retirement' : 'Accumulation'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default CoastFIREChart;
