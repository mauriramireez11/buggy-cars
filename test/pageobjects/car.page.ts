class CarPage {

    public get voteSuccessMessage() { return $('p.card-text=Thank you for your vote!');}
    public get unauthMessage() { return $('p.card-text=You need to be logged in to vote.'); } // El mensaje a la derecha, debajo de votos

    // Click en la imagen del Diablo (vehiculo popular actualmente)
    public get imgDiablo() {
        return $('img[title="Diablo"]');
    }
    // Contador de votos 
    public get votesCount() {
        return $('h4 > strong');
    }
    // Botón de votar
    public get btnVote() { return $('button=Vote!'); }

    // Textarea para comentario
    public get commentBox() {
        return $('#comment');
    }

    // Selecciona el primer comentario (más reciente) en la tabla
    public get primerComentario() {
        return $('table.table tbody tr:first-child td:nth-child(3)');
    }

    public get primerComentarioAuthor() {
        return $('table.table tbody tr:first-child td:nth-child(2)');
    }

    public get descripcion() {
        return $('.row > div > p'); 
    }

    public get especificaciones() {
        return $('div.card-block h4=Specification');
    }

    public get votos() {
        return $('div.card-block h4*=Votes');
    }

    // Métodos
    async openDiablo() {
        await this.imgDiablo.click();
    }

    async getVotes() {
        const txt = await this.votesCount.getText();
        return parseInt(txt.trim(), 10);
    }

    async vote() {
        await this.btnVote.click();
    }

    async commentAndVote(comentario: string) {
        await this.commentBox.setValue(comentario);
        await this.vote();
    }
}

export default new CarPage();
