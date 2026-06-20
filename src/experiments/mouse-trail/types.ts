export interface PhysicsImage {
    x: number;
    y: number;
    dx: number;
    dy: number;
    src: string;
    stage: 'initial-bounce-up' | 'free-fall' | 'bounce-up' | 'bounce-down';
}

export interface NaiveImage extends PhysicsImage {
    id: number;
    imageId: number;
}

export interface UncontrolledImage extends PhysicsImage {
    domId: number;
    insertedInDom: boolean;
    shouldBeDeleted: boolean;
}

export interface CanvasImage extends PhysicsImage {
    id: number;
}