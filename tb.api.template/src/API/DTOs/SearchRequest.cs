namespace tb.api.template.API.DTOs;

public class SearchRequest<T> where T : class
{
    public T? Filter { get; set; }
    public int Page { get; set; } = 1;
    public int Limit { get; set; } = 10;
}