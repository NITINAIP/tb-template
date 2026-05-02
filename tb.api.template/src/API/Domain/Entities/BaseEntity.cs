namespace tb.api.template.API.Domain.Entities;

public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string CreatedBy { get; set; } = "system";
    public DateTime CreatedOn { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTime? ModifiedOn { get; set; }
}