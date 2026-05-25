using TourRequestApi.DTOs;
using TourRequestApi.Models;

namespace TourRequestApi.Services;

public interface ITourRequestService
{
    List<TourRequestResponseDto> GetAll();
    TourRequestResponseDto? GetById(Guid id);
    TourRequestResponseDto Create(CreateTourRequestDto dto, out string? warning);
}

public class TourRequestService : ITourRequestService
{
    private readonly Data.InMemoryStore _store;

    public TourRequestService(Data.InMemoryStore store)
    {
        _store = store;
    }

    public List<TourRequestResponseDto> GetAll()
    {
        return _store.TourRequests
            .OrderByDescending(r => r.CreatedAt)
            .Select(MapToResponse)
            .ToList();
    }

    public TourRequestResponseDto? GetById(Guid id)
    {
        var request = _store.TourRequests.FirstOrDefault(r => r.Id == id);
        return request != null ? MapToResponse(request) : null;
    }

    public TourRequestResponseDto Create(CreateTourRequestDto dto, out string? warning)
    {
        warning = null;

        var serviceItems = dto.Services.Select(s => new ServiceItem
        {
            ServiceType = s.ServiceType,
            ServiceName = s.ServiceName,
            Supplier = s.Supplier,
            Quantity = s.Quantity,
            UnitPrice = s.UnitPrice,
            Note = s.Note,
            LineTotal = s.Quantity * s.UnitPrice
        }).ToList();

        var totalCost = serviceItems.Sum(s => s.LineTotal);

        if (dto.TourType == TourType.MICE && dto.GuestCount < 10)
        {
            warning = $"Cảnh báo: Tour MICE có ít hơn 10 khách ({dto.GuestCount} khách).";
        }

        var status = totalCost > 100000000 ? "Chờ duyệt quản lý" : "Đã tiếp nhận";

        var tourRequest = new TourRequest
        {
            Id = Guid.NewGuid(),
            TourName = dto.TourName,
            DepartureDate = dto.DepartureDate,
            PersonInCharge = dto.PersonInCharge,
            TourType = dto.TourType,
            GuestCount = dto.GuestCount,
            Services = serviceItems,
            TotalCost = totalCost,
            Status = status,
            CreatedAt = DateTime.Now
        };

        _store.TourRequests.Add(tourRequest);

        return MapToResponse(tourRequest);
    }

    private static TourRequestResponseDto MapToResponse(TourRequest request)
    {
        return new TourRequestResponseDto
        {
            Id = request.Id,
            TourName = request.TourName,
            DepartureDate = request.DepartureDate,
            PersonInCharge = request.PersonInCharge,
            TourType = request.TourType.ToString(),
            GuestCount = request.GuestCount,
            Services = request.Services.Select(s => new ServiceItemDto
            {
                ServiceType = s.ServiceType,
                ServiceName = s.ServiceName,
                Supplier = s.Supplier,
                Quantity = s.Quantity,
                UnitPrice = s.UnitPrice,
                Note = s.Note
            }).ToList(),
            TotalCost = request.TotalCost,
            Status = request.Status,
            CreatedAt = request.CreatedAt
        };
    }
}
