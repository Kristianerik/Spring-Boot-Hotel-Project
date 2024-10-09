import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }

  private baseURL: string = 'http://localhost:8080';

  private getUrl: string = this.baseURL + '/room/reservation/v1/';
  private postUrl: string = this.baseURL + '/room/reservation/v1';
  public submitted!: boolean;
  roomsearch!: FormGroup;
  rooms!: Room[];
  request!: ReserveRoomRequest;
  currentCheckInVal!: string;
  currentCheckOutVal!: string;
  convertedTimes: string = '';

  // Message Vars
  welcomeMessages: {[locale: string]: string } = {};

  ngOnInit() {
    this.roomsearch = new FormGroup({
      checkin: new FormControl(' ', Validators.required),
      checkout: new FormControl(' ', Validators.required)
    });

    //     this.rooms=ROOMS;


    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    // subscribe to the stream
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });


    //grab welcome message
    this.getWelcomeMessage('en_US');
    this.getWelcomeMessage('fr_CA');

    //grab converted time for presentation at 12:00
    this.getConvertedTime(12, 0);
  }


  onSubmit({value, valid}: { value: Roomsearch, valid: boolean }) {
    this.getAll().subscribe(
      rooms => {

        //Conversion Rates
        const conversionRateToCAD = 1.36;
        const conversionRateToEUR = 0.92;


        console.log(Object.values(rooms)[0]);
        this.rooms = (<Room[]>Object.values(rooms)[0]).map(room => {
          const priceUSD = parseFloat(room.price);
          room.priceCAD = priceUSD * conversionRateToCAD;
          room.priceEUR = priceUSD * conversionRateToEUR;
          return room;
        });
      }
    );
  }

  reserveRoom(value: string) {
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);

    this.createReservation(this.request);
  }

  createReservation(body: ReserveRoomRequest) {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
    // let options = new RequestOptions({headers: headers}); // Create a request option

    const options = {
      headers: new HttpHeaders().append('key', 'value'),

    }

    this.httpClient.post(this.postUrl, body, options)
      .subscribe(res => console.log(res));
  }

  /*mapRoom(response:HttpResponse<any>): Room[]{
    return response.body;
  }*/

  getAll(): Observable<any> {


    return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal, {responseType: 'json'});
  }

  // New method to get welcome message
  getWelcomeMessage(locale: string): void {
    this.httpClient.get<string>(`http://localhost:8080/api/welcome/welcome/${locale}`)
      .subscribe({
        next: response => {
          this.welcomeMessages[locale] = response;
        },
        error: error => {
          console.error(`Error fetching welcome message for ${locale}:`, error);
        }
      });

  }

  //New Method to get converted times
  getConvertedTime(hour: number, minute: number) {
    //Setting Parmas passed with Presentation Time
    const presTime = new HttpParams()
    .set('hour', hour.toString())
      .set('minute', minute.toString());

    // @ts-ignore
    this.httpClient.get('http://localhost:8080/api/time-conversion', { params: presTime, responseType: 'text' })
      .subscribe({
        next: (response: string) => {
          this.convertedTimes = response;
        },
        error: (error) => {
          console.error('Error fetching time conversions:', error);
        }
      });
  }
}


export interface Roomsearch{
    checkin:string;
    checkout:string;
  }




export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  links:string;
  priceCAD:number;
  priceEUR:number;


}
export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string,
              checkin:string,
              checkout:string) {

    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}

/*
var ROOMS: Room[]=[
  {
  "id": "13932123",
  "roomNumber" : "409",
  "price" :"20",
  "links" : ""
},
{
  "id": "139324444",
  "roomNumber" : "509",
  "price" :"30",
  "links" : ""
},
{
  "id": "139324888",
  "roomNumber" : "609",
  "price" :"40",
  "links" : ""
}
] */

