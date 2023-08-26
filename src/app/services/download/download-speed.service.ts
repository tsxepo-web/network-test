import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class DownloadSpeedService {
  private apiUrl = 'https://network-speed-test.azurewebsites.net';

  constructor(private http: HttpClient) { }

  startDownload(): Observable<{ duration: number, fileSize: number }> {
    const startTime = new Date().getTime();
    const req = new HttpRequest('GET', `${this.apiUrl}/FileShare/download-test-file`, {
      reportProgress: true,
      responseType: 'blob',
    });

    return this.http.request(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.DownloadProgress) {
          const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          const message = `File download is ${percentDone}% complete.`;
          this.showProgress(message);
        }
      }),
      last(),
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          const endTime = new Date().getTime();
          const fileSize = (event as HttpResponse<Blob>).body!.size;
          return {
            duration: endTime - startTime,
            fileSize: fileSize
          };
        }
        return { duration: 0, fileSize: 0 };
      }),
      catchError(this.handleError)
    );
  }

  private showProgress(message: string) {
    console.log(message);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('An error occurred while downloading your file.')
  }
}