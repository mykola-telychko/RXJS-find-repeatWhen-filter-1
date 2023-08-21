import './style.css';

// https://www.learnrxjs.io/learn-rxjs/operators/filtering/find
// Example 1: Find click inside box, repeat when a click occurs outside of box

import { fromEvent } from 'rxjs';
import { find, repeatWhen, mapTo, startWith, filter } from 'rxjs/operators';

// elem ref
const status = document.getElementById('status');

// streams
const clicks$ = fromEvent(document, 'click');

clicks$
  .pipe(
    find((event: any) => event.target.id === 'box'),
    mapTo('Found!'),
    startWith('Find me!'),
    // reset when click outside box
    repeatWhen(() =>
      clicks$.pipe(filter((event: any) => event.target.id !== 'box'))
    )
  )
  .subscribe((message) => (status.innerHTML = message));
