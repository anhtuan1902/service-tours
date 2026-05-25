using TourRequestApi.Models;

namespace TourRequestApi.DTOs;

public class CreateTourRequestDto
{
    public string TourName { get; set; } = string.Empty;
    public DateTime DepartureDate { get; set; }
    public string PersonInCharge { get; set; } = string.Empty;
    public TourType TourType { get; set; }
    public int GuestCount { get; set; }
    public List<ServiceItemDto> Services { get; set; } = new();
}
