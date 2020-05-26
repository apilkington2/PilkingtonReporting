import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('simpleFadeAnimation1', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(1000)
      ])
    ]),
    trigger('simpleFadeAnimation2', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(1200)
      ])
    ]),
    trigger('simpleFadeAnimation3', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(1400)
      ])
    ]),
      trigger('simpleFadeAnimation4', [
        state('in', style({opacity: 1})),
        transition(':enter', [
          style({opacity: 0}),
          animate(1600)  ])
        ]),
        trigger('simpleFadeAnimation5', [
          state('in', style({opacity: 1})),
          transition(':enter', [
            style({opacity: 0}),
            animate(1800)  ])
          ]),
          trigger('simpleFadeAnimation6', [
            state('in', style({opacity: 1})),
            transition(':enter', [
              style({opacity: 0}),
              animate(2000)   ])
            ]),
            trigger('simpleFadeAnimation7', [
              state('in', style({opacity: 1})),
              transition(':enter', [
                style({opacity: 0}),
                animate(2200)  ])
              ]),
              trigger('simpleFadeAnimation8', [
                state('in', style({opacity: 1})),
                transition(':enter', [
                  style({opacity: 0}),
                  animate(2400)  ])
                ]),
                trigger('simpleFadeAnimation9', [
                  state('in', style({opacity: 1})),
                  transition(':enter', [
                    style({opacity: 0}),
                    animate(2600)  ])
                  ]),
                  trigger('simpleFadeAnimation10', [
                    state('in', style({opacity: 1})),
                    transition(':enter', [
                      style({opacity: 0}),
                      animate(2800)
                    ])
    ])
]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
