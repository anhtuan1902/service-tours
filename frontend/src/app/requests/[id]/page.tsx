'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getRequestById } from '@/lib/api';
import { TourRequest } from '@/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RequestDetailPage() {
  const params = useParams();
  const [request, setRequest] = useState<TourRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequestById(params.id as string);
        setRequest(data);
      } catch (err) {
        setError('Không tìm thấy phiếu yêu cầu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Không tìm thấy phiếu'}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Quay về danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            Quay về danh sách
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Chi tiết phiếu yêu cầu</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                request.status === 'Chờ duyệt quản lý'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {request.status}
            </span>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Mã phiếu</label>
                <p className="font-mono text-sm text-gray-800">{request.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Tên tour</label>
                <p className="font-semibold text-gray-800">{request.tourName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Loại tour</label>
                <span
                  className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    request.tourType === 'MICE'
                      ? 'bg-purple-100 text-purple-700'
                      : request.tourType === 'GIT'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {request.tourType}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Ngày khởi hành</label>
                <p className="text-gray-800">
                  {new Date(request.departureDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Người phụ trách</label>
                <p className="text-gray-800">{request.personInCharge || 'Không có'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Số lượng khách</label>
                <p className="text-gray-800">{request.guestCount} khách</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Danh sách dịch vụ</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left text-gray-600">
                      <th className="py-2 px-3 font-medium">Loại DV</th>
                      <th className="py-2 px-3 font-medium">Tên dịch vụ</th>
                      <th className="py-2 px-3 font-medium">Nhà cung cấp</th>
                      <th className="py-2 px-3 font-medium text-right">Số lượng</th>
                      <th className="py-2 px-3 font-medium text-right">Đơn giá</th>
                      <th className="py-2 px-3 font-medium text-right">Thành tiền</th>
                      <th className="py-2 px-3 font-medium">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {request.services.map((service, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-3">{service.serviceType}</td>
                        <td className="py-2 px-3 font-medium">{service.serviceName}</td>
                        <td className="py-2 px-3">{service.supplier}</td>
                        <td className="py-2 px-3 text-right">{service.quantity}</td>
                        <td className="py-2 px-3 text-right">
                          {service.unitPrice.toLocaleString('vi-VN')} đ
                        </td>
                        <td className="py-2 px-3 text-right font-medium">
                          {(service.quantity * service.unitPrice).toLocaleString('vi-VN')} đ
                        </td>
                        <td className="py-2 px-3 text-gray-500">{service.note || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={5} className="py-3 px-3 text-right text-gray-700">
                        Tổng chi phí:
                      </td>
                      <td className="py-3 px-3 text-right text-lg text-blue-600">
                        {request.totalCost.toLocaleString('vi-VN')} đ
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
