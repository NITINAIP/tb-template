namespace tb.api.template.API.DTOs;
public class Result<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public List<string> Errors { get; set; }

    public Result()
    {
        Errors = new List<string>();
    }

    public static Result<T> SuccessResult(T data, string message = "Operation successful")
    {
        return new Result<T>
        {
            Success = true,
            Message = message,
            Data = data,
            Errors = new List<string>()
        };
    }
}

public class Result : Result<object>
{
    public new static Result<object> Success(object? data = null, string message = "Operation successful")
    {
        return SuccessResult(data, message);
    }

    public new static Result<object> AffectedRows<TKey>(TKey affectedRows = default(TKey), string message = "Operation successful")
    {
        return SuccessResult(new { AffectedRows = affectedRows }, message);
    }
}