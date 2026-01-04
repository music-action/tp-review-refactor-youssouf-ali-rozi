/* eslint-disable */

export class Game {
  private _lastSymbol = " ";
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == " ") {
      if (player == "O") {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != " ") {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      const winner = this.getRowWinner(row);
      if (winner != " ") {
        return winner;
      }
    }
    return " ";
  }

  private getRowWinner(row: number): string {
    const tile0 = this._board.TileAt(row, 0)!;
    const tile1 = this._board.TileAt(row, 1)!;
    const tile2 = this._board.TileAt(row, 2)!;

    if (
      tile0.Symbol != " " &&
      tile0.Symbol == tile1.Symbol &&
      tile1.Symbol == tile2.Symbol
    ) {
      return tile0.Symbol;
    }
    return " ";
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: " " };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
