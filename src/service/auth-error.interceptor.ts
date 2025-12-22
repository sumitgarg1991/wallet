import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';



export const authErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    tap({ error: (err) => {
      if (err.status === 401) {
        // trigger re-auth, show generic message
      }
    }})
  );