'use client';

import { useState } from 'react';
import { ServiceItem, TourType, CreateTourRequestDto } from '@/types';
import { createRequest } from '@/lib/api';
import ServiceItemRow from './ServiceItemRow';
import { useRouter } from 'next/navigation';

interface TourRequestFormProps {
  onSuccess?: () => void;
}

export default function TourRequestForm({ onSuccess }: TourRequestFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tourName: '',
    departureDate: '',
    personInCharge: '',
    tourType: 'FIT' as TourType,
    guestCount: 0,
  });
  const [services, setServices] = useState<ServiceItem[]>([
    { serviceType: '', serviceName: '', supplier: '', quantity: 1, unitPrice: 0, note: '' },
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCost = services.reduce((sum, s) => sum + s.quantity * s.unitPrice, 0);
  const showMiceWarning = formData.tourType === 'MICE' && formData.guestCount < 10 && formData.guestCount > 0;

  const handleFieldChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors([]);
    setWarning(null);
  };

  const handleServiceChange = (index: number, field: keyof ServiceItem, value: string | number) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
    setErrors([]);
  };

  const addService = () => {
    setServices([...services, { serviceType: '', serviceName: '', supplier: '', quantity: 1, unitPrice: 0, note: '' }]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const validate = (): boolean => {
    const errs: string[] = [];
    if (!formData.tourName.trim()) errs.push('Tên tour là bắt buộc');
    if (!formData.departureDate) errs.push('Ngày khởi hành là bắt buộc');
    if (formData.guestCount <= 0) errs.push('Số lượng khách phải lớn hơn 0');
    if (services.length === 0) errs.push('Phải có ít nhất 1 dịch vụ');
    services.forEach((s, i) => {
      if (s.quantity <= 0) errs.push(`Dịch vụ ${i + 1}: Số lượng phải > 0`);
      if (s.unitPrice <= 0) errs.push(`Dịch vụ ${i + 1}: Đơn giá phải > 0`);
    });
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const dto: CreateTourRequestDto = {
        ...formData,
        services,
      };
      const result = await createRequest(dto);
      setWarning(result.warning || null);
      alert('Tạo phiếu thành công!');
      if (onSuccess) onSuccess();
      router.push('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'errors' in err) {
        setErrors((err as { errors: string[] }).errors);
      } else {
        setErrors(['Đã xảy ra lỗi khi tạo phiếu']);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <ul className="list-disc list-inside text-sm">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {warning && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <strong>Cảnh báo:</strong> {warning}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Thông tin phiếu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tour <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.tourName}
              onChange={(e) => handleFieldChange('tourName', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="VD: Tour Hạ Long 2N1D"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày khởi hành <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) => handleFieldChange('departureDate', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Người phụ trách
            </label>
            <input
              type="text"
              value={formData.personInCharge}
              onChange={(e) => handleFieldChange('personInCharge', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="VD: Nguyễn Văn A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại tour <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.tourType}
              onChange={(e) => handleFieldChange('tourType', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="FIT">FIT - Cá nhân</option>
              <option value="GIT">GIT - Nhóm</option>
              <option value="MICE">MICE - Hội thảo/Sự kiện</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng khách <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.guestCount || ''}
              onChange={(e) => handleFieldChange('guestCount', parseInt(e.target.value) || 0)}
              min="1"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="VD: 10"
            />
          </div>
        </div>

        {showMiceWarning && (
          <div className="mt-4 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded text-sm">
            Cảnh báo: Tour MICE nên có từ 10 khách trở lên
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Danh sách dịch vụ</h2>
          <button
            type="button"
            onClick={addService}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center gap-2"
          >
            + Thêm dịch vụ
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="py-2 px-2 font-medium w-28">Loại DV</th>
                <th className="py-2 px-2 font-medium w-36">Tên dịch vụ</th>
                <th className="py-2 px-2 font-medium w-32">Nhà cung cấp</th>
                <th className="py-2 px-2 font-medium w-24 text-center">Số lượng</th>
                <th className="py-2 px-2 font-medium w-32">Đơn giá</th>
                <th className="py-2 px-2 font-medium w-28 text-right">Thành tiền</th>
                <th className="py-2 px-2 font-medium">Ghi chú</th>
                <th className="py-2 px-2 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, index) => (
                <ServiceItemRow
                  key={index}
                  index={index}
                  item={item}
                  onChange={handleServiceChange}
                  onRemove={removeService}
                />
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan={5} className="py-3 px-2 text-right text-gray-700">
                  Tổng chi phí:
                </td>
                <td className="py-3 px-2 text-right text-lg text-blue-600">
                  {totalCost.toLocaleString('vi-VN')} đ
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {totalCost > 100000000 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded text-sm">
            Tổng chi phí trên 100 triệu - Phiếu sẽ có trạng thái: <strong>Chờ duyệt quản lý</strong>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang xử lý...' : 'Tạo phiếu'}
        </button>
      </div>
    </form>
  );
}
