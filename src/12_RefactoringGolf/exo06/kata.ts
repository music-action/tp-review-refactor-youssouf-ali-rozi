/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const PLAYER_O = 'O';
const EMPTY = ' ';

export class Game {
  private _lastPlayer = EMPTY;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == EMPTY) {
      if (player == PLAYER_O) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.cellAt(x, y).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.addMark(player, x, y);
  }

  public Winner(): string {
    return this._board.findWinner();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private mark: string = ' ';

  constructor(x: number, y: number, mark: string) {
    this.x = x;
    this.y = y;
    this.mark = mark;
  }

  get Symbol() {
    return this.mark;
  }

  get isNotEmpty() {
    return this.Symbol !== EMPTY;
  }

  hasSameSymbolAs(other: Tile) {
    return this.Symbol === other.Symbol;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updateSymbol(newSymbol: string) {
    this.mark = newSymbol;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, EMPTY));
      }
    }
  }

  public cellAt(x: number, y: number): Tile {
    return this._plays.find(
      (t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, EMPTY))
    )!;
  }

  public addMark(mark: string, x: number, y: number): void {
    this._plays
      .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, mark)))!
      .updateSymbol(mark);
  }

  public findWinner(): string {
    for (let row = firstRow; row <= thirdRow; row++) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this.cellAt(row, firstColumn)!.Symbol;
      }
    }
    return EMPTY;
  }

  private isRowFull(row: number) {
    return (
      this.cellAt(row, firstColumn)!.isNotEmpty &&
      this.cellAt(row, secondColumn)!.isNotEmpty &&
      this.cellAt(row, thirdColumn)!.isNotEmpty
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.cellAt(row, firstColumn)!.hasSameSymbolAs(
        this.cellAt(row, secondColumn)!
      ) &&
      this.cellAt(row, thirdColumn)!.hasSameSymbolAs(
        this.cellAt(row, secondColumn)!
      )
    );
  }
}
