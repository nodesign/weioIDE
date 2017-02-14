import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

export const ModalAnimation = [
    trigger('showModal', [
        // Set states
        state('invisible', style({ transform: 'translateX(-100%)', opacity: 0, display: 'none' })),
        state('visible', style({ transform: 'translateX(0)', opacity: 1, display: 'flex' })),
        // Make transitions
        transition('invisible => visible', animate(300, keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 0, transform: 'translateX(0)', offset: 0.1 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 })
        ]))),
        transition('visible => invisible', animate(300, keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0, transform: 'translateX(0)', offset: 0.9 }),
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 1 })
        ])))
    ])
];
