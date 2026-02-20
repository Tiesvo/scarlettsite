"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
  totalClicks: number;
  clicksByButton: Record<string, number>;
  recentClicks: Array<{
    id: string;
    buttonLabel: string;
    buttonHref: string;
    timestamp: string;
    userAgent?: string;
    referer?: string;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/analytics");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Click Analytics
          </h1>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh Data
          </button>
        </div>

        {/* Total Clicks */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Total Clicks
          </h2>
          <div className="text-5xl font-bold text-blue-600">
            {analytics.totalClicks}
          </div>
        </div>

        {/* Clicks by Button */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Clicks by Button
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(analytics.clicksByButton).map(([button, count]) => (
              <div
                key={button}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="text-sm text-gray-600 mb-1">{button}</div>
                <div className="text-3xl font-bold text-gray-900">{count}</div>
              </div>
            ))}
          </div>
          {Object.keys(analytics.clicksByButton).length === 0 && (
            <div className="text-gray-500 text-center py-4">
              No clicks tracked yet
            </div>
          )}
        </div>

        {/* Recent Clicks */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recent Clicks (Last 50)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Button
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Agent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.recentClicks.map((click) => (
                  <tr key={click.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {click.buttonLabel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(click.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                      {click.userAgent || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {analytics.recentClicks.length === 0 && (
              <div className="text-gray-500 text-center py-8">
                No clicks tracked yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

