'use client';

import { ServiceItem } from '@/types';
import { MinusCircle, Trash2 } from 'lucide-react';

interface ServiceItemRowProps {
  index: number;
  item: ServiceItem;
  onChange: (index: number, field: keyof ServiceItem, value: string | number) => void;
  onRemove: (index: number) => void;
}

export default function ServiceItemRow({
  index,
  item,
  onChange,
  onRemove,
}: ServiceItemRowProps) {
  const lineTotal = item.quantity * item.unitPrice;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-2 px-2">
        <input
          type="text"
          value={item.serviceType}
          onChange={(e) => onChange(index, 'serviceType', e.target.value)}
          placeholder="Loại dịch vụ"
          className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </td>
      <td className="py-2 px-2">
        <input
          type="text"
          value={item.serviceName}
          onChange={(e) => onChange(index, 'serviceName', e.target.value)}
          placeholder="Tên dịch vụ"
          className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </td>
      <td className="py-2 px-2">
        <input
          type="text"
          value={item.supplier}
          onChange={(e) => onChange(index, 'supplier', e.target.value)}
          placeholder="Nhà cung cấp"
          className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </td>
      <td className="py-2 px-2 w-24">
        <input
          type="number"
          value={item.quantity || ''}
          onChange={(e) => onChange(index, 'quantity', parseInt(e.target.value) || 0)}
          min="1"
          placeholder="SL"
          className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </td>
      <td className="py-2 px-2 w-32">
        <input
          type="number"
          value={item.unitPrice || ''}
          onChange={(e) => onChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
          min="0"
          step="1000"
          placeholder="Đơn giá"
          className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </td>
      <td className="py-2 px-2 text-right font-medium text-gray-700 w-28">
        {lineTotal.toLocaleString('vi-VN')} đ
      </td>
      <td className="py-2 px-2">
        <input
          type="text"
          value={item.note}
          onChange={(e) => onChange(index, 'note', e.target.value)}
          placeholder="Ghi chú"
          className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </td>
      <td className="py-2 px-2 w-12">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 p-1"
          title="Xóa dịch vụ"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
