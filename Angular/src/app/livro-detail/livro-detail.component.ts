import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LivroService } from '../livro-service/livro.service'

@Component({
  selector: 'app-livro-detail',
  templateUrl: './livro-detail.component.html',
  styleUrls: ['./livro-detail.component.css']
})
export class LivroDetailComponent implements OnInit {
  livro : any;
  private logado :any;
  
  constructor(
    private route: ActivatedRoute,
    private livroService: LivroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.logado = {super : localStorage.getItem("super"), pk : localStorage.getItem("pk")}
    this.livro = {titulo: '', genero: '', autor: '', editora: '', ano_lancamento: '', quantidade: ''}
    this.getLivro();
  }
  
  getLivro(): void {
    const pk = +this.route.snapshot.paramMap.get('pk');
    if (pk != 0){
      this.livroService.getLivro(pk)
        .subscribe(livro => this.livro = livro);
    }
  }

  updateLivro(): void {
    this.livroService.updateLivro(this.livro)
      .subscribe(() => this.getLivro());
  }

  deleteLivro(): void {
    const pk = +this.route.snapshot.paramMap.get('pk')
    this.livroService.delLivro(pk)
      .subscribe(genero => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }

}
