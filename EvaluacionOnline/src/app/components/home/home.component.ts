import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: number;
  
  constructor(private route: ActivatedRoute) { this.id = route.snapshot.params['id']; }

  ngOnInit(): void {
  }

}
