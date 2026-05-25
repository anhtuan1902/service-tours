import TourRequestForm from '@/components/TourRequestForm';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Tạo phiếu đề nghị tour mới</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <TourRequestForm />
      </main>
    </div>
  );
}
