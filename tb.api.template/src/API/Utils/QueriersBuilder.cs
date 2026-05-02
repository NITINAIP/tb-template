using System.Text;
using Dapper;

namespace tb.api.template.API.Utils;

public static class QueriersBuilder
{
    public static void AddFilter(DynamicParameters parameters, string? value, string columnName)
    {
        if (!string.IsNullOrEmpty(value))
        {
            parameters.Add($"@{columnName}", value);
            // builder.AppendLine($" AND {columnName} = @{columnName} ");
        }
    }
    public static void AddLike(DynamicParameters parameters, string? value, string columnName)
    {
        if (!string.IsNullOrEmpty(value))
        {
            parameters.Add($"@{columnName}", value);
            // builder.AppendLine($" AND {columnName} LIKE '%@{columnName}%' ");
        }
    }
    public static void AddFilterActive(DynamicParameters parameters, bool? value, string columnName)
    {
        if (value.HasValue)
        {
            parameters.Add($"@{columnName}", value);
            // builder.AppendLine($" AND {columnName} = @{columnName} ");
        }
    }
}