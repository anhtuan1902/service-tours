namespace TourRequestApi.Models;

public class ServiceItem
{
    public string ServiceType { get; set; } = string.Empty;
    public string ServiceName { get; set; } = string.Empty;
    public string Supplier { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public string Note { get; set; } = string.Empty;
    public decimal LineTotal { get; set; }
}
