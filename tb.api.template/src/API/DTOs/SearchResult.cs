namespace tb.api.template.API.DTOs;

public class SearchResult<T> where T : class, new()
{
    public T[] Items { get; set; } = [];
    public int TotalItems { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalItems / Limit);
    public int Page { get; set; } = 1;
    public int Limit { get; set; } = 10;
}