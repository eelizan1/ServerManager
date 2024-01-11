import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from './enum/data-state.enum';
import { Status } from './enum/status.enum';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { Server } from './interface/server';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>>;

  constructor(private serverService: ServerService) {} // dependency injection

  /* SETTING APPLICATION STATE (SERVER DATA) ON INIT */
  ngOnInit(): void {
    // after page initializing set the state of the application
    this.appState$ = this.serverService.servers$.pipe(
      // map any reposne we get
      map((response) => {
        return {
          dataState: DataState.LOADED_STATE,
          appData: {
            response,
          },
        };
      }),
      startWith({ dataState: DataState.LOADING_STATE }), // pass something to observable in until we get the response back
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }
}
