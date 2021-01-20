using System;

namespace googleBooks_backend.Models
{
  public class Livro
  {
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public string ImagemThumbnail { get; set; }
    public DateTime DataEntrada { get; set; }
  }
}