'use client';

import { useEffect, useState } from 'react';
import { getRequests } from '@/lib/api';
import { TourRequest } from '@/types';
import RequestTable from '@/components/RequestTable';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function Home() {
  const [requests, setRequests] = useState<TourRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getRequests();
      setRequests(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách phiếu. Vui lòng kiểm tra backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Phiếu đề nghị Tour</h1>
          <Link
            href="/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Tạo phiếu mới
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Danh sách phiếu yêu cầu</h2>
          </div>

          {error && (
            <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="p-6">
            <RequestTable requests={requests} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
