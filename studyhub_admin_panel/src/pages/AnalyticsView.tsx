import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export const AnalyticsView: React.FC = () => {
  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'API Requests (Thousands)',
        data: [120, 190, 150, 220, 180, 290, 340],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">System Analytics & Traffic Diagnostics</h2>
        <p className="text-xs text-slate-500">Real-time system bandwidth, API response times, and daily traffic metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="saas-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">API Requests Velocity (Weekly)</h3>
          <div className="h-64">
            <Line data={trafficData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="saas-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Storage & CDN Health</h3>
          <div className="space-y-4 pt-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Cloud Storage Capacity</span>
                <span className="text-blue-600">256 GB / 1000 GB (25.6%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#2563EB] w-[25.6%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>MongoDB Database Connection Pool</span>
                <span className="text-emerald-600">Active (45 / 100 Connections)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[45%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
