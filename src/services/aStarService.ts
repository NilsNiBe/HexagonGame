import { GridNode } from "../models/gridNode";

export function runAStar<T extends GridNode>(
  startNode: T,
  endNode: T,
  gToNeighbor: (a: T, b: T) => number,
  heuristic: (a: T, b: T) => number
): T[] {
  const openList: T[] = [];
  const closedList: T[] = [];

  // Initialisierung der Open List, die Closed List ist noch leer
  // (die Priorität bzw. der f-Wert des Startknotens ist unerheblich)
  openList.push(startNode);
  // diese Schleife wird durchlaufen bis entweder
  // - die optimale Lösung gefunden wurde oder
  // - feststeht, dass keine Lösung existiert
  while (openList.length > 0) {
    // Knoten mit dem geringsten f-Wert aus der Open List entfernen
    let current = openList.reduce((r, e) => (r.f < e.f ? r : e));
    openList.splice(openList.indexOf(current), 1);
    // Wurde das Ziel gefunden?
    if (endNode.key === current.key) {
      return pathFound(current);
    }
    // Der aktuelle Knoten soll durch nachfolgende Funktionen
    // nicht weiter untersucht werden, damit keine Zyklen entstehen
    closedList.push(current);
    // Wenn das Ziel noch nicht gefunden wurde: Nachfolgeknoten
    // des aktuellen Knotens auf die Open List setzen
    expandNode(current, openList, closedList, endNode, gToNeighbor, heuristic);
  }
  // die Open List ist leer, es existiert kein Pfad zum Ziel
  return [];
}

function pathFound<T extends GridNode>(endNode: T): T[] {
  const res: T[] = [];
  if (!endNode.predecessor) {
    return res;
  }
  let current = endNode;
  res.push(current);
  while (current.predecessor) {
    res.push(current.predecessor as T);
    current = current.predecessor as T;
  }
  return res;
}

// Überprüft alle Nachfolgeknoten und fügt sie der Open List hinzu, wenn entweder
// - der Nachfolgeknoten zum ersten Mal gefunden wird, oder
// - ein besserer Weg zu diesem Knoten gefunden wird
function expandNode<T extends GridNode>(
  current: T,
  openList: T[],
  closedList: T[],
  endNode: T,
  gToNeighbor: (current: T, neighbor: T) => number,
  heuristic: (a: T, b: T) => number
) {
  const neighbors = current.neighbors.filter((x) => !x.blocked);

  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];

    // wenn der Nachfolgeknoten bereits auf der Closed List ist – tue nichts
    if (closedList.indexOf(neighbor as T) > -1) {
      continue;
    }
    // g-Wert für den neuen Weg berechnen: g-Wert des Vorgängers plus
    // die Kosten der gerade benutzten Kante
    const g = current.g + gToNeighbor(current, neighbor as T);
    // wenn der Nachfolgeknoten bereits auf der Open List ist,
    // aber der neue Weg nicht besser ist als der alte – tue nichts
    if (openList.indexOf(neighbor as T) > -1 && g >= neighbor.g) {
      continue;
    }
    // Vorgängerzeiger setzen und g Wert merken oder anpassen
    neighbor.predecessor = current;
    neighbor.g = g;
    if (neighbor.h === undefined) {
      neighbor.h = heuristic(neighbor as T, endNode);
    }
    // f-Wert des Knotens in der Open List aktualisieren
    // bzw. Knoten mit f-Wert in die Open List einfügen
    const f = g + neighbor.h!;
    const neighborIndex = openList.indexOf(neighbor as T);
    if (neighborIndex > -1) {
      openList[neighborIndex].f = f;
    } else {
      neighbor.f = f;
      openList.push(neighbor as T);
    }
  }
}
