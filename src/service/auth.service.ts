import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

const authConfig: AuthConfig = {
    issuer: environment.auth.issuer,
    clientId: environment.auth.clientId,
    redirectUri: environment.auth.redirectUri,
    responseType: 'code',
    scope: environment.auth.scope,
    showDebugInformation: true,
    disableAtHashCheck: true
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userManager: UserManager;
    public user$ = new BehaviorSubject<any>(null);


    constructor(private oauthService: OAuthService, private http: HttpClient) {
        const config = {
            authority: 'https://auth.qwik2pay.com', // or Auth0 issuer
            client_id: 'MOBILE_CLIENT_ID',
            redirect_uri: 'com.qwik2pay.app://callback', // custom scheme for mobile
            response_type: 'code',
            scope: 'openid profile email offline_access api',
            post_logout_redirect_uri: 'com.qwik2pay.app://logout',
            userStore: new WebStorageStateStore({ store: window.localStorage }),
        };
        this.userManager = new UserManager(config);
        this.configure();
    }


    private configure() {
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh(); // if using refresh tokens/ silent refresh
        // Use PKCE (default for responseType 'code')
    }

    async handleCallback() {
        const user = await this.userManager.signinRedirectCallback();
        this.user$.next(user);
    }


    async logout() {
        await this.userManager.signoutRedirect();
        this.user$.next(null);
    }

    public get accessToken() {
        return this.oauthService.getAccessToken();
    }

    public get userProfile() {
        return this.oauthService.getIdentityClaims();
    }

    public isLoggedIn(): boolean {
        return !!this.oauthService.getAccessToken();
    }

    private baseUrl = 'http://localhost:8080/api/auth';


    // signup(user: any): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/signup`, user);
    // }


    // login(credentials: any): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/login`, credentials);
    // }

    socialLogin(token: string) {
        return this.http.post('/api/auth/social-login', { idToken: token });
    }

    // sendOtp(data: any) {
    //     return this.http.post(`${this.baseUrl}/send-otp`, data);
    // }


    // verifyOtpAndSignup(data: any) {
    //     return this.http.post(`${this.baseUrl}/verify-otp`, data);
    // }

    async loginWithGoogle(): Promise<void> {
        const authResult = await (window as any).GoogleAuth.signIn(); // Use Capacitor Google Auth plugin
        await this.exchangeSocialToken('google', authResult.authentication.idToken);
    }

    async loginWithFacebook(): Promise<void> {
        const fbLogin = await (window as any).FacebookLogin.login({ permissions: ['email'] });
        const accessToken = fbLogin?.accessToken?.token;
        await this.exchangeSocialToken('facebook', accessToken);
    }

    async exchangeSocialToken(provider: 'google' | 'facebook', token: string): Promise<void> {
        // Send to backend for verification and wallet token issuance
        await this.http.post('/api/auth/social/exchange', { provider, token }).toPromise();
    }

// private baseUrl = `${environment.apiBaseUrl}/auth`;

signup(user: any) {
  return this.http.post(`${this.baseUrl}/signup`, user, { withCredentials: true });
}

login(credentials: any) {
  return this.http.post(`${this.baseUrl}/login`, credentials, { withCredentials: true });
}

sendOtp(data: any) {
  return this.http.post(`${this.baseUrl}/send-otp`, data, { withCredentials: true });
}

verifyOtpAndSignup(data: any) {
  return this.http.post(`${this.baseUrl}/verify-otp`, data, { withCredentials: true });
}


}