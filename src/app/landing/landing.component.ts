import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Data, Loc, LocationService } from '../location.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  ipValue: string = '';
  data: Data = {
    ip: '',
    isp: '',
    location: {
      country: '',
      region: '',
      timezone: ''
    }
  };
  loc: Loc = {
    lat: 0,
    lng: 0
  }
  constructor( private locationService: LocationService ) { }

  ngOnInit(): void {

  }

  markerPosition: google.maps.LatLngLiteral[] = [];

  onSubmit(){
    this.locationService.getData(this.ipValue).subscribe((data)=>{
      this.data = data;
    });

    this.locationService.getLocation(this.ipValue).subscribe((data)=>{

    const words = data.loc.split(',')
    // const loc: Loc = {
    //   lat: +words[0],
    //   lng: +words[1],
    // }
    this.loc.lat = +words[0];
    this.loc.lng = +words[1];

    this.markerPosition[0] = this.loc
    console.log(this.markerPosition, 'markerPositions');
      console.log(this.loc, 'from loc');

    })
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  center: google.maps.LatLngLiteral = {
      lat:24 ,
      lng: 25
  };
  zoom = 4;
  // addMarker(event: google.maps.MapMouseEvent) {
  //     if (event.latLng != null)
  //     {this.markerPosition.push(event.latLng.toJSON());
  //     console.log(event.latLng.toJSON());
  //     }
  // }
  openInfoWindow(marker: MapMarker) {
      if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }
}


