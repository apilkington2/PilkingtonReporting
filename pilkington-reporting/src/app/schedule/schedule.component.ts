import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

export interface ControlValueAccessor {
  schedulingAttorneyName: string,
  firmName: string,
  firmAddress: string,
  firmPhoneNumber: string,
  clientCity: string,
  clientState: string,
  clientZip: string,
  yourName: string,
  yourEmailAddress: string,
  yourPhoneNumber: string,
  opposingCounselsName: string,

    // Scheduling Information
  type: string,
  length: string,
  time: string,
  depositionDate: string,
  businessLocation: string,
  locationAddress: string,
  jobCity: string,
  jobState: string,
  jobZip: string,
  caseCaption: string,
  additionalServices: string

}

export interface Event {
  summary: string,
  location: string,
  description: string,
  start: {
    dateTime: string,
    timeZone: string
  },
  end: {
    dateTime: string,
    timeZone: string
  },
  attendees: [
    {
      email: string
    }
  ]
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})


export class ScheduleComponent implements OnInit {
  schedulingAttorneyName = new FormControl('');
  firmName = new FormControl('');
  firmAddress = new FormControl('');
  firmPhoneNumber = new FormControl('');
  clientCity = new FormControl('');
  clientState = new FormControl('');
  clientZip = new FormControl('');
  yourName = new FormControl('');
  yourEmailAddress = new FormControl('');
  yourPhoneNumber = new FormControl('');
  opposingCounselsName = new FormControl('');

  // Scheduling
  time = new FormControl('');
  depositionDate = new FormControl('');
  businessLocation = new FormControl('');
  locationAddress = new FormControl('');
  jobCity = new FormControl('');
  jobState = new FormControl('');
  jobZip = new FormControl('');
  caseCaption = new FormControl('');
  additionalServices = new FormControl('');
  
  selected = 'Deposition';
  length = 'Other';
  appt : ControlValueAccessor;

  event : Event;


  constructor(private router: Router, public requestService: RequestService, public fb: FormBuilder, private intl: IntlService) { 

  }

  ngOnInit() {
  }

  submit() {
    let newTime = this.time.value.getHours() + ':' + this.time.value.getMinutes();
    if(this.time.value.getMinutes() < 10) {
      newTime = this.time.value.getHours() + ':0' + this.time.value.getMinutes();
    }
    let endTime = this.time.value.getHours();
    let intTime = 0;
    if(endTime == "1") {
      intTime = 1;
    } else if(endTime == "2") {
      intTime = 2;
    } else if(endTime == "3") {
      intTime = 3;
    } else if(endTime == "4") {
      intTime = 4;
    } else if(endTime == "5") {
      intTime = 5;
    } else if(endTime == "6") {
      intTime = 6;
    } else if(endTime == "7") {
      intTime = 7;
    } else if(endTime == "8") {
      intTime = 8;
    } else if(endTime == "9") {
      intTime = 9;
    } else if(endTime == "10") {
      intTime = 10;
    } else if(endTime == "11") {
      intTime = 11;
    } else if(endTime == "12") {
      intTime = 12;
    } else if(endTime == "13") {
      intTime = 13;
    } else if(endTime == "14") {
      intTime = 14;
    } else if(endTime == "15") {
      intTime = 15;
    } else if(endTime == "16") {
      intTime = 16;
    } else if(endTime == "17") {
      intTime = 17;
    } else if(endTime == "18") {
      intTime = 18;
    } else if(endTime == "19") {
      intTime = 19;
    } else if(endTime == "20") {
      intTime = 20;
    } else if(endTime == "21") {
      intTime = 21;
    } else if(endTime == "22") {
      intTime = 22;
    } else if(endTime == "23") {
      intTime = 23;
    } else if(endTime == "24") {
      intTime = 24;
    }
    if(this.length == "0-1 Hrs") {
      intTime+= 1;
    } else if(this.length == "1-2 Hrs"){
      intTime+= 2;
    } else if(this.length == "2-3 Hrs"){
      intTime+= 3;
    } else if(this.length == "All A.M."){
      intTime = 12;
    } else if(this  .length == "All P.M."){
      intTime = 18;
    } else if(this.length == "All Day"){
      intTime = 18;
    }
    endTime = `${intTime}` + ':' + this.time.value.getMinutes();
    if(this.time.value.getMinutes() < 10) {
      endTime = `${intTime}` + ':0' + this.time.value.getMinutes();
    }
    this.appt = {
      schedulingAttorneyName: this.schedulingAttorneyName.value,
      firmName: this.firmName.value,
      firmAddress: this.firmAddress.value,
      firmPhoneNumber: this.firmPhoneNumber.value,
      clientCity: this.clientCity.value,
      clientState: this.clientState.value,
      clientZip: this.clientZip.value,
      yourName: this.yourName.value,
      yourEmailAddress: this.yourEmailAddress.value,
      yourPhoneNumber: this.yourPhoneNumber.value,
      opposingCounselsName: this.opposingCounselsName.value,

        // Scheduling Information
      type: this.selected,
      length: this.length,
      time: newTime,
      depositionDate: this.depositionDate.value.getFullYear() + '-' + (this.depositionDate.value.getMonth()+ 1) + '-' + this.depositionDate.value.getDate(),
      businessLocation: this.businessLocation.value,
      locationAddress: this.locationAddress.value,
      jobCity: this.jobCity.value,
      jobState: this.jobState.value,
      jobZip: this.jobZip.value,
      caseCaption: this.caseCaption.value,
      additionalServices: this.additionalServices.value
    };
    const email = 'Contact Information' + "\n" + 
    'Scheduling Attorney Name: ' + `${this.appt.schedulingAttorneyName}` + "\n" +
    'Firm Name: ' + `${this.appt.firmName}` + "\n" + 
    'Firm Address: ' + `${this.appt.firmAddress}` + "\n" +
    'City, State, Zip: ' + `${this.appt.clientCity}, ${this.appt.clientState}, ${this.appt.clientZip}` + "\n" +
    'Firm Phone Number: ' + `${this.appt.firmPhoneNumber}` + "\n" +
    'Your Name: ' + `${this.appt.yourName}` + "\n" +
    'Your Phone Number: ' + `${this.appt.yourPhoneNumber}` + "\n" +
    'Opposing Counsel\'s Name: ' + `${this.appt.opposingCounselsName}` + "\n" +

    'Scheduling Information' + "\n" +
    'Type of Engagement: ' + `${this.appt.type}` + "\n" +
    'Deposition/Hearing Date: ' + `${this.appt.depositionDate}` + "\n" +
    'Start Time: ' + `${this.appt.time}` + "\n" +
    'Estimated Length: ' + `${this.appt.length}` + "\n" +
    'Name of Location or Business: ' + `${this.appt.businessLocation}` + "\n" +
    'Location Address: ' + `${this.appt.locationAddress}` + "\n" +
    'City, State, Zip: ' + `${this.appt.jobCity}, ${this.appt.jobState}, ${this.appt.jobZip}` + "\n" +
    'Case Caption: ' + `${this.appt.caseCaption}` + "\n" +
    'Additional Services/Requests: ' + `${this.appt.additionalServices}` + "\n \n" +
    'Thank you for hiring Pilkington Reporting for your court reporting needs.'
    ;
    this.event = {
      'summary': `${this.appt.type} for ${this.appt.schedulingAttorneyName} from ${this.appt.firmName}`,
      'location': `${this.locationAddress.value}`,
      'description': `${email}`,
      'start': {
        'dateTime': `${this.appt.depositionDate}` +'T' + `${this.appt.time}` + ':00-05:00',
        'timeZone': 'America/Chicago',
      },
      'end': {
        'dateTime': `${this.appt.depositionDate}` +'T' + `${endTime}` + ':00-05:00',
        'timeZone': 'America/Chicago',
      },
      'attendees': [
        {'email': 'pilkadrian6@gmail.com'}],
    };
    // console.log("APPOITNMENT");
    console.log(this.appt);
    // console.log("EVENT")
    console.log(this.event);
    // console.log(intTime);

    // POST
    this.requestService.register(this.event).subscribe((res)=> {
      this.router.navigateByUrl('schedule');
    });
    // CLEARING EVERYTHING FROM INPUT

  }

}
