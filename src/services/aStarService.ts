export interface node {
  f: number;
  g: number;
  h?: number;
  neighbors: node[];
  predecessor?: node;
  equals(node: node): boolean;
  blocked?: boolean;
}

export class aStar {
  openList: node[] = [];
  closedList: node[] = [];
  startNode: node;
  endNode: node;
  distance: (a: node, b: node) => number;
  heuristic: (a: node, b: node) => number;

  constructor(
    startNode: node,
    endNode: node,
    distance: (a: node, b: node) => number,
    heuristic: (a: node, b: node) => number
  ) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.distance = distance;
    this.heuristic = heuristic;
  }

  run(): node[] {
    // Initialisierung der Open List, die Closed List ist noch leer
    // (die Priorität bzw. der f-Wert des Startknotens ist unerheblich)
    this.openList.push(this.startNode);
    // diese Schleife wird durchlaufen bis entweder
    // - die optimale Lösung gefunden wurde oder
    // - feststeht, dass keine Lösung existiert
    while (this.openList.length > 0) {
      // Knoten mit dem geringsten f-Wert aus der Open List entfernen
      let current = this.openList.reduce((r, e) => (r.f < e.f ? r : e));
      this.openList.splice(this.openList.indexOf(current), 1);
      // Wurde das Ziel gefunden?
      if (this.endNode.equals(current)) {
        return this.pathFound();
      }
      // Der aktuelle Knoten soll durch nachfolgende Funktionen
      // nicht weiter untersucht werden, damit keine Zyklen entstehen
      this.closedList.push(current);
      // Wenn das Ziel noch nicht gefunden wurde: Nachfolgeknoten
      // des aktuellen Knotens auf die Open List setzen
      this.expandNode(current);
    }
    // die Open List ist leer, es existiert kein Pfad zum Ziel
    return [];
  }

  pathFound(): node[] {
    const res: node[] = [];
    if (!this.endNode.predecessor) {
      return res;
    }
    let current = this.endNode;
    res.push(current);
    while (current.predecessor) {
      res.push(current.predecessor);
      current = current.predecessor;
    }
    return res;
  }

  // Überprüft alle Nachfolgeknoten und fügt sie der Open List hinzu, wenn entweder
  // - der Nachfolgeknoten zum ersten Mal gefunden wird, oder
  // - ein besserer Weg zu diesem Knoten gefunden wird
  expandNode(current: node) {
    const neighbors = current.neighbors.filter(x => !x.blocked);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // wenn der Nachfolgeknoten bereits auf der Closed List ist – tue nichts
      if (this.closedList.indexOf(neighbor) > -1) {
        continue;
      }
      // g-Wert für den neuen Weg berechnen: g-Wert des Vorgängers plus
      // die Kosten der gerade benutzten Kante
      const g = current.g + this.distance(current, neighbor);
      // wenn der Nachfolgeknoten bereits auf der Open List ist,
      // aber der neue Weg nicht besser ist als der alte – tue nichts
      if (this.openList.indexOf(neighbor) > -1 && g >= neighbor.g) {
        continue;
      }
      // Vorgängerzeiger setzen und g Wert merken oder anpassen
      neighbor.predecessor = current;
      neighbor.g = g;
      if (neighbor.h === undefined) {
        neighbor.h = this.heuristic(neighbor, this.endNode);
      }
      // f-Wert des Knotens in der Open List aktualisieren
      // bzw. Knoten mit f-Wert in die Open List einfügen
      const f = g + neighbor.h!;
      const neighborIndex = this.openList.indexOf(neighbor);
      if (neighborIndex > -1) {
        this.openList[neighborIndex].f = f;
      } else {
        neighbor.f = f;
        this.openList.push(neighbor);
      }
    }
  }
}
