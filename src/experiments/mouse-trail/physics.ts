import { GRAVITY, HORIZONTAL_FRICTION, INITIAL_BOUNCE_UP_SPEED, INITIAL_FALL_SPEED } from "./constants";
import type { PhysicsImage } from "./types";

export function stepImage<T extends PhysicsImage>(image: T, floor: number) {
    switch (image.stage) {
        case 'initial-bounce-up':
            image.y -= image.dy;
            image.x += image.dx;

            image.dy -= GRAVITY;
            image.dx *= HORIZONTAL_FRICTION;
            if (image.dy <= 0) {
                image.stage = 'free-fall';
                image.dy = INITIAL_FALL_SPEED;
            }
            break;

        case 'free-fall':
            image.y += image.dy;
            image.dy += GRAVITY;

            if (image.y >= (floor - 100)) {
                image.stage = 'bounce-up';
                image.dy = INITIAL_BOUNCE_UP_SPEED;
            }
            break;
        
        case 'bounce-up':
            image.y -= image.dy;
            image.dy -= GRAVITY;
            if (image.dy <= 0) {
                image.stage = 'bounce-down';
                image.dy = INITIAL_FALL_SPEED;
            }
            break;

        case 'bounce-down':
            image.y += image.dy;
            image.dy += GRAVITY;
    }
}

export function stepImageWithFrameFactor<T extends PhysicsImage>(image: T, floor: number, frameFactor: number) {
    switch (image.stage) {
        case 'initial-bounce-up':
            image.y -= image.dy * frameFactor;
            image.x += image.dx * frameFactor;

            image.dx *= Math.pow(HORIZONTAL_FRICTION, frameFactor);
            image.dy -= GRAVITY * frameFactor;

            if (image.dy <= 0) {
                image.stage = 'free-fall';
                image.dy = INITIAL_FALL_SPEED;
            }
            break;

        case 'free-fall':
            image.y += image.dy * frameFactor;
            image.dy += GRAVITY * frameFactor;

            if (image.y >= (floor - 100)) {
                image.stage = 'bounce-up';
                image.dy = INITIAL_BOUNCE_UP_SPEED;
            }
            break;

        case 'bounce-up':
            image.y -= image.dy * frameFactor;
            image.dy -= GRAVITY * frameFactor;

            if (image.dy <= 0) {
                image.stage = 'bounce-down';
                image.dy = INITIAL_FALL_SPEED;
            }
            break;

        case 'bounce-down':
            image.y += image.dy * frameFactor;
            image.dy += GRAVITY * frameFactor;
            break;
    }
}