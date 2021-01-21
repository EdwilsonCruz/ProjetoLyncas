using Microsoft.EntityFrameworkCore;
using googleBooks_backend.Models;
using System;
using FileContextCore;
using System.ComponentModel.DataAnnotations;

namespace googleBooks_backend.Data
{
  public class StoreDataContext : DbContext
  {
    public DbSet<Livro> Livros { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {   //usando arquivo .json para gravar os dados.
      optionsBuilder.UseFileContextDatabase();
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Livro>()
          .ToTable("custom_livro_favorito")
          .HasKey(x => x.Id);

    }
  }
}
