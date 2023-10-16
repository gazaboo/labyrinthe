// Une classe est composée 
// De données (ici : cells)
// De méthodes qui agissent sur les données

class Labyrinthe {

    // Constructeur de ma classe Labyrinthe
    // On initialise les 'champs' de ma classe
    constructor(labyData) {
        this.cells = this.initCells(labyData);
        this.stack = new Stack();
    }

    solveDFS() {
        let entrance = this.getEntrance();
        this.stack.insert(entrance);

        while (!this.stack.isEmpty()) {

            let current_cell = this.stack.pop();
            current_cell.setVisited();

            // Condition de rupture
            if (current_cell.exit) {
                return this.build_path(current_cell);
            }

            let neighbors = this.getUnvisitedNeighbors(current_cell);
            for (let neighbor of neighbors) {
                neighbor.parent = current_cell;
                this.stack.insert(neighbor);
            }
        }
    }

    build_path(cell) {
        let path = [cell];
        while (cell.parent) {
            cell = cell.parent;
            cell.colorAsPath()
            path.push(cell);
        }
        return path;
    }

    getCell(x, y) {
        return this.cells.find(cell => cell.rowX == x && cell.columnY == y);
    }

    getUnvisitedNeighbors(cell) {
        let neighbors = [];
        if (!cell.walls[0]) { // Si pas de mur en haut
            let neighbor = this.getCell(cell.rowX - 1, cell.columnY);
            neighbors.push(neighbor);
        }

        if (!cell.walls[1]) { // Si pas de mur à droite
            let neighbor = this.getCell(cell.rowX, cell.columnY + 1);
            neighbors.push(neighbor);
        }

        if (!cell.walls[2]) { // Si pas de mur en bas
            let neighbor = this.getCell(cell.rowX + 1, cell.columnY);
            neighbors.push(neighbor);
        }

        if (!cell.walls[3]) { // Si pas de mur à gauche
            let neighbor = this.getCell(cell.rowX, cell.columnY - 1);
            neighbors.push(neighbor);
        }

        let unvisitedNeighbors = neighbors.filter(n => !n.visited);
        return unvisitedNeighbors;
    }

    getEntrance() {
        return this.cells.find(cell => cell.entrance)
    }

    // Fonction display :
    // Instancie les objects de type Cell 
    // et 'append' leur representation DOM au container  
    display() {

        // Get le container principal
        let container = document.getElementById('container');

        // On calcule la largeur (en nombre de cellules)
        // ex : si 9 cellules --> carré de taille 3 x 3 cellules 
        let nbre_cells_largeur = Math.sqrt(this.cells.length);

        // Compute width of main container
        let computed_width = nbre_cells_largeur * this.cells[0].width;
        container.style.width = computed_width + 'px';

        // Ajoute la classe CSS 'main-container' à la div 
        container.classList.add('main-container');

        // Get la representation DOM de chacune des cellules
        // Append au container
        for (let cell of this.cells) {
            let cellDOM = cell.getDOM();
            container.appendChild(cellDOM);
        }
    }

    // Fonction initCells :
    // Initialise le champs 'this.cells' 
    // en bouclant sur les données du labyrinthe 
    // et en instanciant une Cell à chaque fois
    initCells(labyData) {
        let cells = [];
        for (let cellData of labyData) {
            let cell = new Cell(cellData);
            cells.push(cell);
        }
        return cells;
    }
}

