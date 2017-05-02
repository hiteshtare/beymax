import { trigger, state, animate, transition, style } from '@angular/animations';

export const enterAnimation =
    trigger('enter', [

        state('right', style({ transform: 'translateX(0)', opacity: '1' })),

        transition('void => *', [
            style({ transform: 'translateX(50%)', opacity: '0' }),
            animate('200ms ease-in-out')
        ])
    ]);
