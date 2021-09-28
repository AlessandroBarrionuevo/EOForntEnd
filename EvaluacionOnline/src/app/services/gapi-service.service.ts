import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GapiServiceService {

  private auth2: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)

  constructor() { 
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init(
        {
          client_id: '941952913538-2rfqdi5edd11nbscroboc7fe1cannel8.apps.googleusercontent.com'
        }
      )
    })
  }

  public signIn() {
    this.auth2.signIn().then(user => { 
      this.subject.next(user)
    }).catch(() => { 
      this.subject.next(null)
    })
  }

  public signOut() {
    this.auth2.signOut().then(user => { 
      
    })
  }

  public observable(): Observable<gapi.auth2.GoogleUser> { 
    return this.subject.asObservable()
  }
}
