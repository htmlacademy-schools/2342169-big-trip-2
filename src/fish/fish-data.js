import { DESCRIPTIONS, DESTINATIONS, TYPES, Prices, NumberServices } from './const.js';
import { generatePictures } from './image.js';
import { getRandomNumber, getRandomElement, filterPoints } from '../utils.js';
import { generateOffersByType} from './list-offers.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

export const getDate = (day1 = dayjs()) =>{
  const allDays = 7;
  const allHours = 24;
  const allMinutes = 60;

  const gapD = getRandomNumber(0, allDays);
  const gapH = getRandomNumber(0, allHours);
  const gapM = getRandomNumber(0, allMinutes);

  return dayjs(day1).add(gapD, 'day').add(gapH, 'hour').add(gapM, 'minute').toDate();
};

export const getDestination = (id) => ({
  'id': id,
  'description': getRandomElement(DESCRIPTIONS),
  'name': DESTINATIONS[id],
  'pictures': generatePictures(),
});

export const getForm = () => {
  const dateFrom = getDate();
  const type = getRandomElement(TYPES);
  const destinations = Array.from({length: DESTINATIONS.length}, (value, index) => getDestination(index));

  return ({
    'basePrice': getRandomNumber(Prices.MIN, Prices.MAX),
    dateFrom,
    'dateTo': getDate(dateFrom),
    'destination': getRandomElement(destinations).id,
    'isFavorite': Boolean(getRandomNumber(0,1)),
    'offers': generateOffersByType(type, NumberServices.MIN, NumberServices.MAX),
    type,
  });
};

export function getFilter(points) {
  return Object.entries(filterPoints).map(
    ([name, filteredPoints]) => ({
      name: name,
      isPoints: filteredPoints(points).length > 0,
    }),
  );
}

export const getPoint = () => {
  const type = getRandomElement(TYPES);
  const dateFrom = getDate();
  const destinations = Array.from({length: DESTINATIONS.length}, (value, index) => getDestination(index));

  return ({
    'basePrice': getRandomNumber(Prices.MIN, Prices.MAX),
    dateFrom,
    'dateTo': getDate(dateFrom),
    'destination': getRandomElement(destinations).id,
    'id': nanoid(),
    'isFavourite': Boolean(getRandomNumber(0,1)),
    'offers': generateOffersByType(type),
    type,
  });
};
