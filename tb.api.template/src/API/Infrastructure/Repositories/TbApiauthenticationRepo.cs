using System.Text;
using Dapper;
using tb.api.template.API.Domain.Entities;
using tb.api.template.API.Infrastructure.Data;
using tb.api.template.API.Utils;

namespace tb.api.template.API.Infrastructure.Repositories;

public interface ITbApiAuthenticationRepo : IBaseRepository<TbApiAuthentication, Guid>
{

}

public sealed class TbApiAuthenticationRepo(IDapperContext ctx) : BaseRepository<TbApiAuthentication, Guid>(ctx), ITbApiAuthenticationRepo
{

    protected override string sqlInsert => @"
    INSERT INTO tb_apiauthentication (account_user, account_name, app_id, app_key, active, created_by, created_on)
    OUTPUT INSERTED.id
    VALUES (@AccountUser, @AccountName, @AppId, @AppKey, @Active, @CreatedBy, @CreatedOn);";
    protected override string sqlDelete => @"
    DELETE FROM tb_apiauthentication WHERE id = @Id;";
    protected override string sqlUpdate => @"
    UPDATE tb_apiauthentication
    SET account_user = @AccountUser,
        account_name = @AccountName,
        app_id = @AppId,
        app_key = @AppKey,
        active = @Active,
        updated_by = @UpdatedBy,
        modified_on = @ModifiedOn
    WHERE id = @Id;";
    protected override string sqlFindOne => @"
    SELECT 
          id
        , account_user
        , account_name
        , app_id
        , app_key
        , active
        , created_by
        , created_on
        , updated_by
        , modified_on
    FROM tb_apiauthentication
    WHERE id = @Id;
    ";
    protected override string sqlDeletes => "DELETE FROM tb_apiauthentication WHERE id in @Id;";
    public override async Task<(TbApiAuthentication[] Result, int Total)> SearchAsync(TbApiAuthentication Filter, int Page, int Limit, CancellationToken cancellationToken = default)
    {
        using var connection = ctx.CreateConnection();
        var parameters = new DynamicParameters();
        StringBuilder sqlFilter = new();
        StringBuilder sqlTotal = new();
        StringBuilder sql = new(@"
    SELECT 
          TOTAL = COUNT(1) OVER()
        , id
        , account_user
        , account_name
        , app_id
        , app_key
        , active
    FROM 
        tb_apiauthentication where 1=1
        and (@AccountUser IS NULL OR TRIM(@AccountUser)='' OR TRIM(LOWER(account_user)) = TRIM(LOWER(@AccountUser) ) )
        AND (@AccountName IS NULL OR TRIM(@AccountName)='' OR TRIM(LOWER(account_name)) = TRIM(LOWER(@AccountName) ) )
        AND (@AppId IS NULL OR TRIM(@AppId)='' OR TRIM(LOWER(app_id)) = TRIM(LOWER(@AppId) ) )
        AND (@Active IS NULL OR active = @Active)
        ORDER BY created_on
        LIMIT @Limit OFFSET @Offset
        ");
        QueriersBuilder.AddFilter(parameters, Filter.AccountUser, "AccountUser");
        QueriersBuilder.AddFilter(parameters, Filter.AccountName, "AccountName");
        QueriersBuilder.AddFilter(parameters, Filter.AppId, "AppId");
        QueriersBuilder.AddFilterActive(parameters, Filter.Active, "Active");

        sqlTotal.Append(" SELECT COUNT(1) as Total FROM tb_apiauthentication where 1=1 ");
        sqlTotal.Append(sqlFilter.ToString());
        int Total = await ctx.ExecuteScalarAsync<int>(connection, sqlTotal.ToString(), parameters, cancellationToken: cancellationToken);

        parameters.Add("@Limit", Limit);
        parameters.Add("@Offset", (Page - 1) * Limit);
        var result = await ctx.QueryAsync<TbApiAuthentication>(connection, sql.ToString(), parameters, cancellationToken: cancellationToken);
        return (result.ToArray(), Total);
    }
}