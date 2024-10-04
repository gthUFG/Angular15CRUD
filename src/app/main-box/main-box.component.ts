import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchingFieldComponent } from '../searching-field/searching-field.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { Person } from '../user.service';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { parse } from 'path';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

type SideBarMode = "registering" | "editing" | "";

@Component({
  selector: 'app-main-box',
  standalone: true,
  imports: [SearchingFieldComponent, DataTableComponent,
            FormsModule, ButtonModule, FloatLabelModule, InputTextModule],
  templateUrl: './main-box.component.html',
  styleUrl: './main-box.component.css'
})
export class MainBoxComponent implements OnInit{
  people: Person[] = [];

  mode: SideBarMode = "registering";
  editingId: number = 0;

  pessoaCadastrada: Person = {
    id: "",
    nome: "",
    cpf: "",
    nascimento: "",
    email: "",
  };
  nextId: number = 0;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}
  
  getActualPeople() {
    this.userService.getUsers().subscribe((data)=>{
      this.people = data;
      this.nextId = parseInt(this.people[this.people.length-1].id)+1 || 1;
    })
    
  }

  redefinePerson(){
    this.pessoaCadastrada = {
      id: "",
      nome: "",
      cpf: "",
      nascimento: "",
      email: "",
    };
  }

  validatePerson(): boolean{
    if(this.pessoaCadastrada.nome=="" || /\d/.test(this.pessoaCadastrada.nome)){
      alert("Nome inválido.");
      return false;
    }
    else if(this.pessoaCadastrada.cpf.length!=11 || /[a-zA-Z]+/.test(this.pessoaCadastrada.cpf)){
      alert("CPF inválido.")
      alert(this.pessoaCadastrada.nascimento);
      return false;
    }
    // else if(this.pessoaCadastrada.nascimento.length<10/* ||
    //   new Date().getFullYear() < parseInt(this.pessoaCadastrada.nascimento.slice(0, 4)) ||
    //   parseInt(this.pessoaCadastrada.nascimento.slice(5,7)) > 12 ||
    //   parseInt(this.pessoaCadastrada.nascimento.slice(8,10)) > 31*/){
    //   alert("Data de nascimento inválida.");
    //   return false;
    // }
    else{
      return true;
    }
  }

  addPerson(): void{
    if(this.validatePerson()){
      
      this.pessoaCadastrada.id = this.nextId.toString();
      this.userService.createPerson(this.pessoaCadastrada).subscribe();
      window.location.reload();
      this.search = "";
      this.redefinePerson(); 
    }
    
  }

  openRegister(): void{
    this.mode = 'registering';
    this.redefinePerson();
  }

  openEditor(id: number): void{
    this.editingId = id;
    let pessoaSelecionada =  this.people.filter(x=>parseInt(x.id) == this.editingId)[0];
    this.mode = "editing"; 
    this.pessoaCadastrada = {...pessoaSelecionada};
    
  }
  editPerson(): void{
    if(this.validatePerson()){
      this.userService.updatePerson(this.editingId, this.pessoaCadastrada).subscribe();
      window.location.reload();
      this.editingId = 0;
    }
  }
  displayEditing(): string{
    return this.people.filter(x=>parseInt(x.id)==this.editingId)[0].nome;
  }

  search: string = "";
  attSearch(){
    this.userService.getUsers().subscribe((data)=>{
      let matchingPp = [];
      for(let i=0; i<data.length; i++){
        if(new RegExp(`${this.search}`).test(data[i].nome)){
          matchingPp.push(data[i]);
        }
      }
      this.people = matchingPp;
    })
  }


  ngOnInit(){
    this.getActualPeople();
  }  
  
}


