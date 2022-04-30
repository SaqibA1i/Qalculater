export type Confirmation = {
    isOpen: boolean;
    onSubmit: () => void | Promise<void>;
}
