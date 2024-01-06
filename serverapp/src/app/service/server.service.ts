import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';

@Injectable({ providedIn: 'root' }) // a service that can be injected throughout the application
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080';
  // DI the HttpClient
  constructor(private http: HttpClient) {}

  // method to retreive all the servers
  // creating an Observable with $
  // servers$ - represents a stream of data that will be emitted when the HTTP request is resolved
  servers$ = <Observable<CustomResponse>>(
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`).pipe(
      // pipe - used to compose a series of operators to process the
      tap(console.log), // used for side effects - log the data to console
      catchError(this.handleError)
    )
  );

  save$ = (server: Server) =>
    <Observable<CustomResponse>>(
      this.http
        .post<CustomResponse>(`${this.apiUrl}/server/save`, server)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  ping$ = (ipAddress: string) =>
    <Observable<CustomResponse>>(
      this.http
        .get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  // filter all servers by specific status
  filter$ = (status: Status, response: CustomResponse) =>
    <Observable<CustomResponse>>new Observable<CustomResponse>((subscriber) => {
      // 1. Logs the initial response to the console.
      console.log(response);

      // 2. Emits a new value to the subscriber.
      subscriber.next(
        // 3. Checks if the status is 'ALL'.
        status === Status.ALL
          ? // 4. If true, returns the original response with a modified message.
            { ...response, message: `Servers filtered by ${status} status` }
          : // 5. If false, filters the servers based on the provided status.
            {
              ...response,
              message:
                // 6. Checks if there are any servers with the given status.
                response.data.servers!.filter(
                  (server) => server.status === status
                ).length > 0
                  ? // 7. If servers are found, constructs a success message.
                    `Servers filtered by 
          ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status`
                  : // 8. If no servers are found, constructs a not found message.
                    `No servers of ${status} found`,
              data: {
                // 9. Updates the data to include only the servers that match the status.
                servers: response.data.servers!.filter(
                  (server) => server.status === status
                ),
              },
            }
      );

      // 10. Signals that the Observable has completed and no more data will be emitted.
      subscriber.complete();
    }).pipe(
      tap(console.log), // 11. Logs any emitted values to the console.
      catchError(this.handleError) // 12. Catches any errors that occur and handles them.
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occurred - Error code: ${error.status}`);
  }
}
