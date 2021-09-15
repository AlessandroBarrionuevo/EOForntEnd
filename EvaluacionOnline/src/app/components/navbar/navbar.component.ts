import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profileJson: string = null;
  usuario: any;

  constructor(public auth: AuthService,  private msalService: MsalService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {this.profileJson = JSON.stringify(profile, null, 2)
        console.dir(this.profileJson)
      }
    );
  }

}
