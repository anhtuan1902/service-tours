namespace TourRequestApi.DTOs;

public class TourRequestResponseDto
{
    public Guid Id { get; set; }
    public string TourName { get; set; } = string.Empty;
    public DateTime DepartureDate { get; set; }
    public string PersonInCharge { get; set; } = string.Empty;
    public string TourType { get; set; } = string.Empty;
    public int GuestCount { get; set; }
    public List<ServiceItemDto> Services { get; set; } = new();
    public decimal TotalCost { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
