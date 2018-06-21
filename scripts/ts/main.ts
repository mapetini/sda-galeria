import { Photo } from "./Photo";
import { Gallery } from "./Gallery";

fetch("data.json").then((response: Response) => {
    response.json().then((dataJson: Photo[]) => {
        const element = document.getElementsByClassName("gallery-box")[0];
        const loadingElement = document.getElementsByClassName("loader")[0];
        loadingElement.remove();
        new Gallery(dataJson, element);
    });
});