import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleAddressService {
  private map!: google.maps.Map;
  @ViewChild('addresstext')
  addresstext!: ElementRef;

  zoom!: number;
  latitude: any = 19.295821;
  longitude: any = 72.8719911;
  optionsData: any = {
    center: {
      lat: Number(this.latitude),
      lng: Number(this.longitude),
    },
    zoom: 18,
    mapTypeId: 'terrain',
  };
  geocoder = new google.maps.Geocoder();
  address: any;
  markerOpt: any;
  markerPositions: google.maps.LatLngLiteral[] = [];
  //markers = [] as any;
  infoContent = '';
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;
  place!: Observable<any>;
  placeSubj = new Subject<any>();
  placeResult = this.placeSubj.asObservable();
  markersSubj = new Subject<any>();
  markersResult = this.markersSubj.asObservable();
  constructor(


  ) {
    this.GetCurrentLocation()
  }

  getlat(place: any) {
    return place.geometry.location?.lat();
  }
  getlng(place: any) {
    return place.geometry.location?.lng();
  }
  getPlaceId(place: any) {
    if (place == null) {
      place = this.place
    }
    return place.place_id;
  }

  getFormattedAddress(place: any) {
    if (place == null) {
      place = this.place

    }
    if (place)
      return place.formatted_address;
    else
      return "";
  }

  getAddrComponent(place: any, componentTemplate: any) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place: any) {
    if (place == null) {
      place = this.place
    }
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },

      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);

    return streetNumber === undefined ? '' : streetNumber;
  }

  getStreet(place: any) {
    if (place == null) {
      place = this.place
    }
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getLocality(place: any) {
    if (place == null) {
      place = this.place
    }
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place: any) {
    if (place == null) {
      place = this.placeResult
    }
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place: any) {
    if (place == null) {
      place = this.placeResult
    }

    const COMPONENT_TEMPLATE = { sublocality_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    // if(state == undefined)
    // {
    //   const COMPONENT_TEMPLATE2 = { administrative_area_level_3: 'short_name' },
    //   state = this.getAddrComponent(place, COMPONENT_TEMPLATE2);
    //   temp = state;
    // }
    const  COMPONENT_TEMPLATE1 = { locality: 'short_name' },
      state1 = this.getAddrComponent(place, COMPONENT_TEMPLATE1);

      //let test = place.address_components[place.address_components.length-4].long_name+","+place.address_components[place.address_components.length-3].long_name;
    return (typeof(state)==undefined)?(state +","+state1):state1;

  }

  getCountryShort(place: any) {
    if (place == null) {
      place = this.placeResult
    }
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place: any) {
    if (place == null) {
      place = this.placeResult
    }
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place: any) {
    if (place == null) {
      place = this.placeResult
    }
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place: any) {
    if (place == null) {
      place = this.placeResult
    }
    const COMPONENT_TEMPLATE = {
      formatted_phone_number: 'formatted_phone_number',
    },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }
  // Get Current Location Coordinates
  GetCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        console.log("this.latitude, this.longitude",this.latitude, this.longitude)
        this.getCurrentAddress(this.latitude, this.longitude);

      });
    }
  }
  getCurrentAddress(latitude: any, longitude: any) {
    const point: google.maps.LatLngLiteral = {
      lat: latitude,
      lng: longitude,
    };
    this.geocoder.geocode({ location: point }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          console.log("getCurrentAddress",results[0])
          this.placeSubj.next(results[0]);
          this.placeResult=results[0];
          this.dropMarker(null)
          // this.address = results[0].formatted_address;
          /* this.markerOpt = this.AddMarker('#00AAE0', '', this.address);
        let element = {
          lat: latitude,
          lng: longitude,
          markerOpt: this.markerOpt,
        };

        this.markerPositions.push(element); */
          // this.dropMarker(null);
          // console.log('getCurrentAddress', this.address);
          //console.log('markerPositions', this.markerPositions);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  AddMarker(fillcolor: any, title: string, text: string) {
    const mIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: fillcolor,
      fillOpacity: 1,
      strokeColor: fillcolor,
      strokeOpacity: 1,
      strokeWeight: 1,
      scale: 10,
    };
    const marker = {
      draggable: false,
      title: title, // `Position Name : ${element.positionName} Position Number: ${element.positionNumber}`,
      label: {
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: '600',
        text: String(text), //String(element.positionNumber)
      },
      icon: mIcon,
    };
    return marker;
  }
  dropMarker(event: any) {
    let lat = 0;
    let lng = 0;
    if (event == null) {
      lat = this.latitude;
      lng = this.longitude;
    } else {
      lat = event.latLng.lat();
      lng = event.latLng.lng();
    }
    let markers = []
    markers.push({
      position: {
        lat: lat,
        lng: lng,
      },
      label: {
        color: 'blue',
        text: 'Marker label ' + (markers.length + 1),
      },
      title: 'Marker title ' + (markers.length + 1),
      info: `Marker info ${this.getFormattedAddress(null)}`,
      options: {
        animation: google.maps.Animation.DROP,
      },
    });
    this.markersSubj.next(markers)
  }
}
