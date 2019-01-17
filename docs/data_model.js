/* eslint-disable */

const templates = {
  resource: {
    id: '',
    name: '',
    cap: false,
    unlocked: true,
  },
  generator: {
    id: '',
    name: '',
    cost: {
      resources: [
        {
          resourceID: '',
          initial: 0,
          multiplier: 1,
        },
      ],
    },
    productionRates: [{ resourceId: '', rate: 0 }],
  },
  capacitor: {
    id: '',
    name: '',
    cost: {
      resources: [
        {
          resourceID: '',
          initial: 0,
          multiplier: 1,
        },
      ],
    },
    capacities: [{ resourceId: '', capacity: 0 }],
  },
}

// GAME DEFINES - description of game elements
const resources = [
  { id: 'resource00', name: 'Money', cap: false, unlocked: true },
  { id: 'resource01', name: 'Energy', cap: true, unlocked: true },
  { id: 'resource02', name: 'Iron', cap: true, unlocked: true },
]
const generators = [
  {
    id: 'generator00',
    name: 'Flee Market Stand',
    cost: {
      resources: [
        {
          resourceID: 'resource00',
          initial: 10,
        },
      ],
    },
    productionRates: [
      {
        resourceId: 'resource00',
        rate: 10,
      },
    ],
  },
  {
    id: 'generator01',
    name: 'Avto Odpad',
    cost: {
      resources: [
        {
          resourceID: 'resource00',
          initial: 100,
        },
      ],
    },
    productionRates: [
      { resourceId: 'resource00', rate: 10 },
      { resourceId: 'resource01', rate: -5 },
      { resourceId: 'resource02', rate: 10 },
    ],
  },
  {
    id: 'generator02',
    name: 'Burakdzilnica',
    cost: {
      resources: [
        {
          resourceID: 'resource00',
          initial: 100,
        },
      ],
    },
    productionRates: [
      { resourceId: 'resource00', rate: 10 },
      { resourceId: 'resource01', rate: -5 },
      { resourceId: 'resource02', rate: 10 },
    ],
  },
  {
    id: 'generator03',
    name: 'Urban ciganeraj gang',
    cost: {
      resources: [
        {
          resourceID: 'resource00',
          initial: 100,
        },
      ],
    },
    productionRates: [
      { resourceId: 'resource00', rate: 10 },
      { resourceId: 'resource01', rate: -5 },
      { resourceId: 'resource02', rate: 10 },
    ],
  },
  {
    id: 'generator04',
    name: 'Sposojena elektricna omarca',
    cost: {
      resources: [
        {
          resourceID: 'resource00',
          initial: 100,
        },
      ],
    },
    productionRates: [
      { resourceId: 'resource00', rate: 10 },
      { resourceId: 'resource01', rate: -5 },
      { resourceId: 'resource02', rate: 10 },
    ],
  },
]
const capacitors = [
  {
    id: 'capacitor00',
    name: 'Akumulator od tovornjaka',
    cost: {
      resources: [
        {
          resourceID: 'resource00',
          initial: 100,
        },
      ],
    },
    capacities: [{ resourceId: 'resource01', capacity: 100 }],
  },
  {
    id: 'capacitor01',
    name: 'Skladisce',
    cost: {
      resources: [
        {
          resourceID: 'resource00',
          initial: 1000,
        },
      ],
    },
    capacities: [{ resourceId: 'resource02', capacity: 1000 }],
  },
]

// How saved data object should look. This data set has no initial state and
// when it is not defined (new game) it is constructed from GAME DEFINES so that
// it automatically reflects all the changes to core game defines.
const saveState = {
  resources: [
    { resourceId: 'resource00', base: 0, unlocked: true },
    { resourceId: 'resource01', base: 0, unlocked: false },
    { resourceId: 'resource02', base: 0, unlocked: false },
  ],
  generators: [
    { generatorId: 'generator00', count: 0 },
    { generatorId: 'generator01', count: 0 },
    { generatorId: 'generator02', count: 0 },
  ],
  capacitors: [
    { capacitorId: 'capacitor00', count: 0 },
    { capacitorId: 'capacitor01', count: 0 },
  ],
  game: {
    lastUpdate: 98237459872134, // timestamp
  },
  settings: {
    theme: 'light',
  },
}

// Create this data set on every site load via game defines -> save state
// if (!save) start with these
// if (save) calculate and set updated values (+ set currentValue: 0)
// then set this as initial UI store state
const uiState = {
  resources: [
    {
      resourceId: 'resource00',
      currentValue: 0,
      limit: false,
      unlocked: true,
      modifier: 0, // resource/s - derived from all generators
    },
    {
      resourceId: 'resource01',
      currentValue: 0,
      limit: 0, // if true in static definitions - calculate based on capacitors
      unlocked: false,
      modifier: 0, // resource/s - derived from all generators
    },
    {
      resourceId: 'resource02',
      currentValue: 0,
      limit: 0, // if true in static definitions - calculate based on capacitors
      unlocked: false,
      modifier: 0, // resource/s - derived from all generators
    },
  ],
  generators: [
    { generatorId: 'generator00', count: 0, cost: 0 },
    { generatorId: 'generator01', count: 0, cost: 0 },
    { generatorId: 'generator02', count: 0, cost: 0 },
  ],
  capacitors: [
    { capacitorId: 'capacitor00', count: 0, cost: 0 },
    { capacitorId: 'capacitor01', count: 0, cost: 0 },
  ],
}
