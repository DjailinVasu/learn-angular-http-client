import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export class AuthInderceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone({
      headers: req.headers.append('AuthInderceptorHeader','some-token')
    })
    console.log('Intercept request cloned', cloned);
    return next.handle(cloned).pipe(
      tap(event => {
        if(event.type === HttpEventType.Response) {
            console.log('Inderceptor Reaponse Event:', event)
        }
      })
    );
  }
}
