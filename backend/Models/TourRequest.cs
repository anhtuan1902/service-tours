namespace TourRequestApi.Models;

public class TourRequest
{
    public Guid Id { get; set; }
    public string TourName { get; set; } = string.Empty;
    public DateTime DepartureDate { get; set; }
    public string PersonInCharge { get; set; } = string.Empty;
    public TourType TourType { get; set; }
    public int GuestCount { get; set; }
    public List<ServiceItem> Services { get; set; } = new();
    public decimal TotalCost { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
