import { getDestination } from '../fish/destination';
import { DESTINATIONS } from '../fish/const.js';

export default class DestinationModel{
  #destinations = null;

  constructor (){
    this.#destinations = Array.from({length: DESTINATIONS.length},(value, index) => getDestination(index));
  }

  get destinations () {return this.#destinations;}
}