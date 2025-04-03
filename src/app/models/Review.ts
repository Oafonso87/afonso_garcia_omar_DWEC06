export class Review {
    
    public id : number;
    public serie : string;
    public usuario : string;
    public comentario : string;
    public puntuacion : number;
    public fecha : any;
    
    constructor(id : number, serie : string, usuario : string, comentario : string, puntuacion : number, fecha : any) {
        this.id = id;
        this.serie = serie;
        this.usuario = usuario;
        this.comentario = comentario;
        this.puntuacion = puntuacion;
        this.fecha = fecha;
    }        
}