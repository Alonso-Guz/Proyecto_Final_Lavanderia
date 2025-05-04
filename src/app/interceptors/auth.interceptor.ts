import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Definimos rutas que NO deben llevar Authorization
    const excludedUrls = ['/api/auth/login'];

    // Revisa si la URL actual está en la lista de excluidas
    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    if (isExcluded) {
      console.log('[Interceptor] Request excluida del Authorization:', req.url);
      return next.handle(req.clone({ withCredentials: true }));
    }

    let authReq = req.clone({
      withCredentials: true
    });

    if (token) {
      authReq = authReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('[Interceptor] Agregando Authorization a:', req.url);
    }

    return next.handle(authReq);
  }
}
