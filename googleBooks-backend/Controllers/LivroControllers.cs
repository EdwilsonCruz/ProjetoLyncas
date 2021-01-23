using googleBooks_backend.Models;
using googleBooks_backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace googleBooks_backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class LivroControllers : Controller
  {
    private readonly StoreDataContext _context;
    public LivroControllers(StoreDataContext context)
    {
      _context = context;
    }

    [Route("/api/book/{id}/favorite")]
    [HttpPost]
    public async Task<Livro> PostAsync(string id)
    {
      var httpClient = new HttpClient();
      httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      var response = await httpClient.GetAsync(new Uri("https://www.googleapis.com/books/v1/volumes?q=" + id));
      var result = await response.Content.ReadAsStringAsync();

      dynamic obj = JsonConvert.DeserializeObject(result);
      Livro livro = new Livro();

      //valores atribuidos da resposta
      livro.Id = obj.items[0].id;
      livro.Titulo = obj.items[0].volumeInfo.title is null ? "" : obj.items[0].volumeInfo.title;
      livro.Descricao = obj.items[0].volumeInfo.description;
      livro.ImagemThumbnail = obj.items[0].volumeInfo.imageLinks.smallThumbnail;
      //add data de entrada qnd é add na lista de favoritos.
      livro.DataEntrada = DateTime.Now;
      //insert e salvando
      _context.Livros.Add(livro);
      _context.SaveChanges();

      return livro;
    }


    [Route("/api/books/{term}")]
    [HttpGet]
    public async Task<string> GetLivroAsync(string term)
    {
      var httpClient = new HttpClient();
      httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      var response = await httpClient.GetAsync(new Uri("https://www.googleapis.com/books/v1/volumes?q=" + term + "&startIndex=0&maxResults=40"));
      var result = await response.Content.ReadAsStringAsync();

      return result;
    }

    [Route("/api/book/favorites")]
    [HttpGet]
    public IEnumerable<Livro> Get()
    {
      return _context.Livros.AsNoTracking().ToList();
    }

    [Route("/api/book/{id}/favorite")]
    [HttpGet]
    public Livro Get(string id)
    {
      var livroRemove = _context.Livros.AsNoTracking().Where(x => x.Id == id).FirstOrDefault();
      _context.Livros.Remove(livroRemove);
      _context.SaveChanges();

      return livroRemove;
    }
  }
}