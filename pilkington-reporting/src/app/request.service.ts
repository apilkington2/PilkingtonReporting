import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { Event, ControlValueAccessor } from './schedule/schedule.component';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  AUTH_SERVER="http://localhost:3001";

  register(event: Event): Observable<Event> {
    console.log("This is the event:");
    console.log(event);
    return this.httpClient.post<Event>(`${this.AUTH_SERVER}/register`, event).pipe();
  }

  constructor(private httpClient: HttpClient) { }
}
