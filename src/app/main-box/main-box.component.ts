import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchingFieldComponent } from '../searching-field/searching-field.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { Person } from '../user.service';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { parse } from 'path';

type SideBarMode = "registering" | "editing";

@Component({
  selector: 'app-main-box',
  standalone: true,
  imports: [SearchingFieldComponent, DataTableComponent, FormsModule],
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
      this.nextId = data.length+1;
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
      alert("CPF inválido.");
      return false;
    }
    else if(this.pessoaCadastrada.nascimento.length!=10 ||
      new Date().getFullYear() < parseInt(this.pessoaCadastrada.nascimento.slice(0, 4)) ||
      parseInt(this.pessoaCadastrada.nascimento.slice(5,7)) > 12 ||
      parseInt(this.pessoaCadastrada.nascimento.slice(8,10)) > 31){
      alert("Data de nascimento inválida.");
      return false;
    }
    else{
      return true;
    }
  }

  addPerson(): void{
    // this.people.push(pessoaCadastrada);
    if(this.validatePerson()){
      this.pessoaCadastrada.nascimento = this.pessoaCadastrada.nascimento.slice(8,10) + "/" + this.pessoaCadastrada.nascimento.slice(5,7) + "/" + this.pessoaCadastrada.nascimento.slice(0,4);
      this.pessoaCadastrada.id = this.nextId.toString();
      this.userService.createPerson(this.pessoaCadastrada).subscribe();
      this.userService.getUsers().subscribe((data)=>{
        this.people = data;
        this.nextId = data.length+1;
      })
      this.search = "";
      this.redefinePerson(); 
    }
    
  }


  openEditor(id: number): void{
    this.editingId = id;
    this.mode = "editing"; 
  }
  editPerson(): void{
    if(this.validatePerson()){
      this.userService.updatePerson(this.editingId, this.pessoaCadastrada).subscribe();
    }
  }
  displayEditing(): string{
    return this.people.filter(x=>parseInt(x.id)==this.editingId)[0].nome;
  }
  
  // attSearch(pessoasPesquisadas: Person[]): void{
  //   this.people = pessoasPesquisadas;
  //   alert(JSON.stringify(this.people));

  // }
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
      // alert(`Para ${this.search}: \n${JSON.stringify(this.people)}`);
    })
  }


  ngOnInit(){
    this.getActualPeople();
    // alert(this.people.length);
    // this.maxId = this.people[this.people.length-1].id;
  }  
  
}


