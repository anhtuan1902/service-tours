'use client';

import { TourRequest } from '@/types';
import Link from 'next/link';

interface RequestTableProps {
  requests: TourRequest[];
  loading?: boolean;
}

export default function RequestTable({ requests, loading }: RequestTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Chưa có phiếu yêu cầu nào</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="py-3 px-4 font-medium">Mã phiếu</th>
            <th className="py-3 px-4 font-medium">Tên tour</th>
            <th className="py-3 px-4 font-medium">Ngày khởi hành</th>
            <th className="py-3 px-4 font-medium">Loại tour</th>
            <th className="py-3 px-4 font-medium text-right">Khách</th>
            <th className="py-3 px-4 font-medium text-right">Tổng chi phí</th>
            <th className="py-3 px-4 font-medium">Trạng thái</th>
            <th className="py-3 px-4 font-medium">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr
              key={req.id}
              className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition"
            >
              <td className="py-3 px-4">
                <Link href={`/requests/${req.id}`} className="text-blue-600 hover:underline font-mono">
                  {req.id.slice(0, 8)}...
                </Link>
              </td>
              <td className="py-3 px-4 font-medium text-gray-800">{req.tourName}</td>
              <td className="py-3 px-4">{new Date(req.departureDate).toLocaleDateString('vi-VN')}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    req.tourType === 'MICE'
                      ? 'bg-purple-100 text-purple-700'
                      : req.tourType === 'GIT'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {req.tourType}
                </span>
              </td>
              <td className="py-3 px-4 text-right">{req.guestCount}</td>
              <td className="py-3 px-4 text-right font-medium">
                {req.totalCost.toLocaleString('vi-VN')} đ
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    req.status === 'Chờ duyệt quản lý'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-500">
                {new Date(req.createdAt).toLocaleDateString('vi-VN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
