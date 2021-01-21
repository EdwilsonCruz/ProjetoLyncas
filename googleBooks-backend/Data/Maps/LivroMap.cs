
using Microsoft.EntityFrameworkCore;
using FileContextCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using googleBooks_backend.Models;

namespace googleBooks_backend.Data.Maps
{
  public class LivroMap : IEntityTypeConfiguration<Livro>
  {
    public void Configure(EntityTypeBuilder<Livro> builder)
    {
      builder.ToTable("custom_usuario_tabela");
      builder.HasKey(x => x.Id);
    }
  }
}