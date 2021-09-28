import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { GapiServiceService } from 'src/app/services/gapi-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  user: gapi.auth2.GoogleUser

  constructor(private gapi: GapiServiceService) { }

  ngOnInit(): void {
    this.gapi.observable().subscribe(
      (r) => {
        this.user = r
        console.log(r);
      },
      (err) => { 
        console.log(err);
        
      }
    )
  }

  signIn() { 
    this.gapi.signIn()
  }

  signOut() { 
    this.gapi.signOut();
  
  }


}
