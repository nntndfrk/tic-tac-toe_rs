import { Game } from './game.js';

/**
 * Get all DOM-elements
 */
const gameInfo = document.querySelector('#game-info');
const board = document.querySelector('#game-board');
const restartButton = document.querySelector('#game-restart');

/**
 * Init Game instance
 */
new Game(board, gameInfo, restartButton);
