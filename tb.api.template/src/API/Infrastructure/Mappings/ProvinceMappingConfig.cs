using Mapster;
using tb.api.template.API.Domain.Entities;
using tb.api.template.API.DTOs.Province;
namespace tb.api.template.API.Infrastructure.Mappings;
public class ProvinceMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        // config.NewConfig<TbProvince, ProvinceDto>().TwoWays();
        // config.NewConfig<TbProvince, SearchResultProvinceDto>().TwoWays();


    }
}