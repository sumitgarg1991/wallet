// app.config.ts (or a centralized place for HttpClient)
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authErrorInterceptor } from 'src/service/auth-error.interceptor';

export const appConfig = {
    providers: [
        provideHttpClient(
            withFetch(),
            withInterceptors([authErrorInterceptor])
        ),
    ],
};