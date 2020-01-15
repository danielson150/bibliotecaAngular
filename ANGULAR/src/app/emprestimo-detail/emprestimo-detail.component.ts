import { EmprestimoService } from '../emprestimo-service/emprestimo.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-emprestimo-detail',
  templateUrl: './emprestimo-detail.component.html',
  styleUrls: ['./emprestimo-detail.component.css']
})
export class EmprestimoDetailComponent implements OnInit {
  
  private emprestimo: any;
  private logado :any;
  private pk = +this.route.snapshot.paramMap.get('pk');
  
  constructor(
    private route: ActivatedRoute,
    private emprestimoService: EmprestimoService,
    private location: Location
  ) {};

  ngOnInit(): void {
    this.logado = {pk : localStorage.getItem("pk"), super : localStorage.getItem("super")}
    this.emprestimo = {usuario: '', livro: '', devovler : ''}
    this.getEmprestimo();
  };
  
  getEmprestimo(): void {
    const pk = +this.route.snapshot.paramMap.get('pk');
    if (pk != 0){
      this.emprestimoService.getEmprestimo(pk)
        .subscribe(emprestimo => this.emprestimo = emprestimo);
    };
  };

  updateEmprestimo(): void {
    this.emprestimoService.updateEmprestimo(this.emprestimo)
      .subscribe(() => this.getEmprestimo());
  };

  deleteEmprestimo(): void {
    this.emprestimoService.delEmprestimo(this.pk)
      .subscribe(emprestimo => this.goBack());
  };

  goBack(): void {
    this.location.back();
  };
};
