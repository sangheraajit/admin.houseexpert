import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TransformInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        // if (event instanceof HttpResponse) {
        //   let body = event.body;
        //   let results = (body?.results);
        //   //console.log("results",JSON.parse(results))
        //   let Table = results?.table[0];
        //   let document = Table.document;
        //   if (document) {
        //     let data=JSON.parse(document)
        //     //logMessage(`${prefixRes} 🚧 Transform Response`, [], [body]);
        //     if (data) {
        //       return event.clone({ body: data });
        //     }
        //   }
        //   return event.clone({ body: event.body?.results?.Table }); // undefined means dont change it
        // }
        return event;
      })
    );
  }
  isJson(str: any) {
    try {
      let value = JSON.parse(str);
      return value;
    } catch (e) {
      return str;
    }
  }
}
