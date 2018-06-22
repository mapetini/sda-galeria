import { Photo } from "./Photo";

export class Gallery {
        private prev: Element; 
        private next: Element;
        private imgTitle: Element; 
        private mainImg: Element;
        private description: Element;
        private thumbnail:Element;
        private counter: number = 0;
    constructor(private photos: Photo[], element: Element) {
        this.prev = element.getElementsByClassName("btn-prev")[0];
        this.next = element.getElementsByClassName("btn-next")[0];
        this.imgTitle = element.getElementsByTagName("h1")[0];
        this.mainImg = element.getElementsByTagName("img")[0];
        this.description = element.getElementsByTagName("p")[0];
        this.thumbnail = element.getElementsByClassName("thumb-container")[0];
        this.next.addEventListener("click", () => this.showNextPhoto());
        this.prev.addEventListener("click", () => this.showPrevPhoto());       
        this.mainImg.style.width = '50vw';
        this.updateMainPhoto();
    }
    updateMainPhoto(){
        const photo = this.photos[this.counter];
        this.imgTitle.innerText = photo.title;
        this.description.innerText = photo.description;
        this.mainImg.setAttribute('src',photo.source);
    }
    showNextPhoto() {
        this.counter++;
        if (this.counter >= this.photos.length){
            this.counter = 0;
        }
        this.updateMainPhoto();
        console.log('Slajd do przodu')
    }
    showPrevPhoto() {
        this.counter--;
        if (this.counter < 0){
            this.counter = this.photos.length - 1;
        }
        this.updateMainPhoto();
        console.log('Slajd do tylu')
    }
}
