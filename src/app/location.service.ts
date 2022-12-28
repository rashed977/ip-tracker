import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getData(ip: string): Observable<Data> {
    return this.http.get<Data>(
      `https://geo.ipify.org/api/v2/country?apiKey=at_vZcNgrREFvkFjXAZS64MQuEu60jnj&ipAddress=${ip}`
    );
  }

  getLocation(ip: string): Observable<IpData>{
    return this.http.get<IpData>(`https://ipinfo.io/${ip}?token=d7fbf676b6f87f`)
  }
}

export interface Data {
  as?: {},
  domains?: {},
  ip: string,
  isp: string,
  location: {
    country: string,
    region: string,
    timezone: string
  }
}
export interface Loc {

  split?: any;
  lat: number,
  lng: number
}

export interface IpData{
    ip: number,
    hostname: string,
    city: string,
    region: string,
    country: string,
    loc: Loc,
    org: string,
    timezone: string
}
