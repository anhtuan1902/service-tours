using Microsoft.AspNetCore.Mvc;
using TourRequestApi.DTOs;
using TourRequestApi.Models;
using TourRequestApi.Services;

namespace TourRequestApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RequestsController : ControllerBase
{
    private readonly ITourRequestService _service;

    public RequestsController(ITourRequestService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<TourRequestResponseDto>> GetAll()
    {
        var requests = _service.GetAll();
        return Ok(requests);
    }

    [HttpGet("{id:guid}")]
    public ActionResult<TourRequestResponseDto> GetById(Guid id)
    {
        var request = _service.GetById(id);
        if (request == null)
        {
            return NotFound(new { message = "Không tìm thấy phiếu yêu cầu" });
        }
        return Ok(request);
    }

    [HttpPost]
    public ActionResult<TourRequestResponseDto> Create([FromBody] CreateTourRequestDto dto)
    {
        var errors = ValidateDto(dto);
        if (errors.Any())
        {
            return BadRequest(new { errors });
        }

        var warning = _service.Create(dto, out var warningMessage);

        if (!string.IsNullOrEmpty(warningMessage))
        {
            return StatusCode(201, new
            {
                data = warning,
                warning = warningMessage
            });
        }

        return StatusCode(201, warning);
    }

    private static List<string> ValidateDto(CreateTourRequestDto dto)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(dto.TourName))
            errors.Add("Tên tour là bắt buộc");

        if (dto.DepartureDate == default)
            errors.Add("Ngày khởi hành là bắt buộc");

        if (!Enum.IsDefined(typeof(TourType), dto.TourType))
            errors.Add("Loại tour không hợp lệ (FIT, GIT, MICE)");

        if (dto.GuestCount <= 0)
            errors.Add("Số lượng khách phải lớn hơn 0");

        if (dto.Services == null || dto.Services.Count == 0)
            errors.Add("Phải có ít nhất 1 dịch vụ");

        if (dto.Services != null)
        {
            for (int i = 0; i < dto.Services.Count; i++)
            {
                var s = dto.Services[i];
                if (s.Quantity <= 0)
                    errors.Add($"Dịch vụ [{i + 1}]: Số lượng phải lớn hơn 0");
                if (s.UnitPrice <= 0)
                    errors.Add($"Dịch vụ [{i + 1}]: Đơn giá phải lớn hơn 0");
            }
        }

        return errors;
    }
}
