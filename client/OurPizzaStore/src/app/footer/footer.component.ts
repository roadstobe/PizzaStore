import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  customer: String;
  year: Date;

  constructor() { }

  ngOnInit(): void {
    this.year = new Date();
  }

  addMail() {

  }
}
