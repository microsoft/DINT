export interface IAgent {
    setTestButton(): void;
    setAddToCartButton(callback: () => void): boolean;
    addToCartAction(): void;
}