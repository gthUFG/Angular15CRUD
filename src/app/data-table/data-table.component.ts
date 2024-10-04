import { UserService } from './../user.service';
import { NgFor, KeyValuePipe, NgStyle } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Person } from './../user.service';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'delete-button',
  standalone: true,
  imports: [ButtonModule, StyleClassModule, NgStyle, Ripple],
  styleUrl: './data-table.component.css',
  template: `
    <button pButton pRipple class="p-button-danger deleteButton" label="✖"></button>
  `,
})
export class DeleteButton{
  @Input() index: number = 0;
}

@Component({
  selector: 'edit-button',
  standalone: true,
  imports: [ButtonModule, StyleClassModule, NgStyle, Ripple],
  styleUrl: './data-table.component.css',
  template: `
    <button pButton pRipple class="p-button-info editButton" label="✎ "></button>
  `,
})
export class EditButton{
  @Input() index: number = 0;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgFor, KeyValuePipe, DeleteButton, EditButton, ButtonModule, TableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit{
  @Input()
  people: Person[] = []
  
  headerTitles: string[] = ["Nome", "CPF", "Data de Nascença", "E-mail"];
  
  constructor(private userService: UserService) {}
  
  ngOnInit(){
  }
  
  ponctuateCPF(cpf: string): string{
    if(cpf.length!=11) return "CPF inválido"
    return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);
  }
  displayBirth(birth: string): string{
    return birth.slice(8,10) + "/" + birth.slice(5,7) + "/" + birth.slice(0,4);
  }
  
  parseN(n: string): number { return parseInt(n); }

  delPerson(id: number){
    this.userService.deletePerson(id).subscribe((data)=>{
      this.people = this.people.filter(x=> x.id!=id.toString());
    });
  }

  @Output() edit = new EventEmitter<number>();
  callEditPerson(id: number){
    this.edit.emit(id);
  }

  updatePerson(id: number, pessoaCadastrada: Person) {
    this.userService.updatePerson(id, pessoaCadastrada).subscribe((data)=>{
    });
  }

}