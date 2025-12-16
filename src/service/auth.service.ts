import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    // async login() {
    //     await this.userManager.signinRedirect();
    // }


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


    signup(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/signup`, user);
    }


    login(credentials: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, credentials);
    }
}