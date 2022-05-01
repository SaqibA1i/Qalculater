export const switchSlide = (slide: number) => {
    let element = document
        .getElementsByClassName("control-dots")[0]
        .getElementsByClassName("dot")[slide] as HTMLElement;
    element.click();
}
