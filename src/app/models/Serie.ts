export class Serie {
    
    public id : number;
    public name : string;
    public rating : number;
    public image : string;
    public genres : string;
    public premiered : any;
    public network : string;
    public summary : string;
    
    constructor(id : number, name : string, rating : number, image : string, genres : string, premiered : any, network : string, summary : string ) {
        this.id = id;
        this.name = name;
        this.rating = rating || 0;
        this.image = image;
        this.genres = genres;
        this.premiered = premiered;
        this.network = network;
        this.summary = summary;
    }        
}