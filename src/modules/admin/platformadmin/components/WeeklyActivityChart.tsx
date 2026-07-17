import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { day: "MON", registration: 200 },
  { day: "TUE", registration: 380 },
  { day: "WED", registration: 420 },
  { day: "THU", tracking: 330, registration: 330 },
  { day: "FRI", registration: 480 },
  { day: "SAT", registration: 360 },
  { day: "SUN", registration: 560 },
];

export default function WeeklyActivityChart() {
  return (
    <div className="w-full !px-6 !py-5">
      <div className="w-full bg-white rounded-[24px] !p-8 flex flex-col border border-[#F1F5F9]">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mb-6">
          <div>
            <h3 className="text-[22px] font-bold text-[#0D3B73] tracking-tight">
              Weekly Platform Activity
            </h3>
            <p className="text-[14px] text-[#99A1AF] font-medium mt-0.5">
              Comparison between User Registration and System Activation.
            </p>
          </div>

          <div className="flex items-center gap-5 text-[11px] font-extrabold tracking-wider text-[#99A1AF] shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1E4385]" />
              <span>REGISTRATION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D2E0FB]" />
              <span>ACTIVATION</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[300px] min-h-[300px] relative">
          <ResponsiveContainer width="80%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2C4F931F" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2C4F9300" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#99A1AF', fontSize: 12, fontWeight: 700 }}
                dy={15}
              />

              <YAxis hide={true} />

              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid #EAEAEA',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
                labelStyle={{ color: '#99A1AF', fontWeight: 700 }}
                itemStyle={{ color: '#0D3B73', fontWeight: 800 }}
              />

              <Area
                type="monotone"
                dataKey="registration"
                stroke="#1E4385"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#chartGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}