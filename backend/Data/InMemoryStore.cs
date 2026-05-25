using TourRequestApi.Models;

namespace TourRequestApi.Data;

public class InMemoryStore
{
    public List<TourRequest> TourRequests { get; } = new()
    {
        new TourRequest
        {
            Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            TourName = "Tour Hạ Long 2N1D",
            DepartureDate = new DateTime(2026, 6, 15),
            PersonInCharge = "Nguyễn Văn A",
            TourType = TourType.FIT,
            GuestCount = 5,
            Services = new List<ServiceItem>
            {
                new ServiceItem
                {
                    ServiceType = "Vận chuyển",
                    ServiceName = "Xe limousine",
                    Supplier = "Hoàn Kiếm Travel",
                    Quantity = 1,
                    UnitPrice = 5000000,
                    Note = "Đón tại khách sạn",
                    LineTotal = 5000000
                },
                new ServiceItem
                {
                    ServiceType = "Lưu trú",
                    ServiceName = "Khách sạn 4 sao",
                    Supplier = "Saigon Halong Hotel",
                    Quantity = 5,
                    UnitPrice = 1500000,
                    Note = "Phòng đôi",
                    LineTotal = 7500000
                }
            },
            TotalCost = 12500000,
            Status = "Đã tiếp nhận",
            CreatedAt = DateTime.Now.AddDays(-2)
        },
        new TourRequest
        {
            Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
            TourName = "Hội thảo Doanh nghiệp 2026",
            DepartureDate = new DateTime(2026, 7, 1),
            PersonInCharge = "Trần Thị B",
            TourType = TourType.MICE,
            GuestCount = 25,
            Services = new List<ServiceItem>
            {
                new ServiceItem
                {
                    ServiceType = "Venue",
                    ServiceName = "Grand Hall",
                    Supplier = "Saigon Convention Center",
                    Quantity = 1,
                    UnitPrice = 50000000,
                    Note = "Full day",
                    LineTotal = 50000000
                },
                new ServiceItem
                {
                    ServiceType = "Catering",
                    ServiceName = "Buffet lunch",
                    Supplier = "ABC Catering",
                    Quantity = 25,
                    UnitPrice = 500000,
                    Note = "Per person",
                    LineTotal = 12500000
                }
            },
            TotalCost = 62500000,
            Status = "Đã tiếp nhận",
            CreatedAt = DateTime.Now.AddDays(-1)
        }
    };
}
