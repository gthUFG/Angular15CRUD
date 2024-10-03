import { UserService } from './../user.service';
import { NgFor, KeyValuePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Person } from './../user.service';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-button',
  standalone: true,
  template: `
    <button type="button" id="deletePerson" >x</button>
  `,
})
export class DeleteButton{
  @Input() index: number = 0;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgFor, KeyValuePipe, DeleteButton],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit{
  @Input()
  people: Person[] = []

  
  headerTitles: string[] = ["Id", "Nome", "CPF", "Idade", "E-mail"];
  
  constructor(private userService: UserService) {}
  
  ngOnInit(){
  }
  
  ponctuateCPF(cpf: string): string{
    if(cpf.length!=11) return "CPF inválido"
    return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);
  }

  delPerson(id: number){
    this.userService.deletePerson(id).subscribe((data)=>{
      this.people = this.people.filter(x=> x.id!=id);
    });
  }

  updatePerson(id: number, pessoaCadastrada: Person) {
    this.userService.updatePerson(id, pessoaCadastrada).subscribe((data)=>{
      // this.people = data;
    });
  }

}