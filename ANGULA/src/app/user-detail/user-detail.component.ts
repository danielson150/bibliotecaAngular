import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user-service/user.service'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private user : any;
  private superuser : any;
  private logado :any;
  private password : any;
  private pk = +this.route.snapshot.paramMap.get('pk');
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}
  

  ngOnInit(): void {
    this.logado = {pk : localStorage.getItem("pk"), super : localStorage.getItem("super")}
    this.user = {email : "", username : "", first_name : "", password : ""};
    this.superuser = {pk : this.pk, username : "", first_name : "", is_active : ""}
    this.getUser();  
  }
  
  getUser(): void {
    
    if(this.logado.pk == this.pk){
      this.userService.getUser(this.pk)
      .subscribe(user => {this.user = user, this.password = user.password, this.user.password = ""});
    }
    else{
      this.userService.getUser(this.pk)
      .subscribe(user => this.superuser = user);
    }
    
  }

  updateUser(): void {
    if (this.user.email != ""){
      if (this.user.password == ""){
        this.user.password = this.password
        this.userService.updateUser(this.user)
          .subscribe(() => this.getUser());
      }
      else{
        this.userService.updateUser(this.user)
          .subscribe(() => this.getUser());
      }
    }
    else{
      this.userService.updateUser(this.superuser)
        .subscribe(() => this.getUser());
    }
      
  }

  deleteUser(): void {
    const pk = +this.route.snapshot.paramMap.get('pk')
    this.userService.delUser(pk)
      .subscribe(user => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }

}
