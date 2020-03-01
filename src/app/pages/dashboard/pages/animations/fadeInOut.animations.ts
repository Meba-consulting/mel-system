import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

export const fadeInOutAnimation = trigger('open', [
  state(
    'in',
    style({
      transform: 'translateX(0)'
    })
  ),
  transition('void => *', [
    style({
      transform: 'translateX(0) scale(0)'
    }),
    animate(800)
  ]),
  transition('* => void', [
    animate(800),
    style({
      transform: 'translateX(0) scale(0)'
    })
  ])
]);
