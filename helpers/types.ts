export interface TimeoutOptions {
    timeout?: number;
    timeoutMsg?: string;
    timeoutInterval?: number;
}
export interface WaitOptions extends TimeoutOptions {
    visibilityCheck?: boolean;
}
export interface ClearValueOptions extends WaitOptions {
    keyInterval?: number;
}
export declare enum MouseButton {
    LeftClick = 0,
    MiddleClick = 1,
    RightClick = 2
}
export interface ClickOptions extends WaitOptions {
    waitForClickable?: boolean;
    button?: MouseButton;
    x?: number;
    y?: number;
    scrollIntoView?: boolean;
}
export interface EmulatedClickOptions {
    button?: MouseButton;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}
export interface SetValueOptions extends WaitOptions {
    clear?: boolean;
}
export interface ConfigWithPause extends WebdriverIO.Config {
    pauseBetweenActions?: number;
}
