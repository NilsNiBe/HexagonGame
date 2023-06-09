import { TileMap } from "../map";

export const PULSE: TileMap = {
  name: "Pulse",
  nodes: [
    { q: 0, r: 0, t: "Forest" },
    { q: 0, r: 1, t: "Plains" },
    { q: 0, r: 2, t: "Water" },
    { q: 0, r: 3, t: "Street" },
    { q: 0, r: 4, t: "Street" },
    { q: 0, r: 5, t: "Water" },
    { q: 0, r: 6, t: "Street" },
    { q: 0, r: 7, t: "Plains" },
    { q: 0, r: 8, t: "Forest" },
    { q: 0, r: 9, t: "Forest" },
    { q: 0, r: 10, t: "Forest" },
    { q: 0, r: 11, t: "Forest" },
    { q: 0, r: 12, t: "Forest" },
    { q: 0, r: 13, t: "Forest" },
    { q: 0, r: 14, t: "Forest" },
    { q: 0, r: 15, t: "Forest" },
    { q: 0, r: 16, t: "Plains" },
    { q: 0, r: 17, t: "Street" },
    { q: 0, r: 18, t: "Street" },
    { q: 0, r: 19, t: "Forest" },
    { q: 0, r: 20, t: "Forest" },
    { q: 0, r: 21, t: "Mountain" },
    { q: 0, r: 22, t: "Mountain" },
    { q: 1, r: 0, t: "Street" },
    {
      q: 1,
      r: 1,
      t: "Street",
      u: { t: "Light-Artillery", c: "Central" },
    },
    { q: 1, r: 2, t: "Street" },
    { q: 1, r: 3, t: "Street" },
    { q: 1, r: 4, t: "Street" },
    { q: 1, r: 5, t: "Water" },
    { q: 1, r: 6, t: "Street" },
    { q: 1, r: 7, t: "Forest" },
    { q: 1, r: 8, t: "Forest" },
    { q: 1, r: 9, t: "Forest" },
    { q: 1, r: 10, t: "Forest" },
    { q: 1, r: 11, t: "Forest" },
    { q: 1, r: 12, t: "Forest" },
    { q: 1, r: 13, t: "Plains" },
    { q: 1, r: 14, t: "Plains" },
    { q: 1, r: 15, t: "Street" },
    {
      q: 1,
      r: 16,
      t: "Street",
      u: { t: "Heavy-Artillery", c: "Entente" },
    },
    { q: 1, r: 17, t: "Street" },
    { q: 1, r: 18, t: "Street" },
    { q: 1, r: 19, t: "Plains" },
    { q: 1, r: 20, t: "Forest" },
    { q: 1, r: 21, t: "Mountain" },
    { q: 1, r: 22, t: "Mountain" },
    { q: 2, r: -1, t: "Forest" },
    { q: 2, r: 0, t: "Street" },
    { q: 2, r: 1, t: "Water" },
    { q: 2, r: 2, t: "Street" },
    { q: 2, r: 3, t: "Street" },
    { q: 2, r: 4, t: "Water" },
    { q: 2, r: 5, t: "Street" },
    { q: 2, r: 6, t: "Plains" },
    { q: 2, r: 7, t: "Forest" },
    { q: 2, r: 8, t: "Forest" },
    { q: 2, r: 9, t: "Forest" },
    { q: 2, r: 10, t: "Forest" },
    { q: 2, r: 11, t: "Plains" },
    { q: 2, r: 12, t: "Plains" },
    { q: 2, r: 13, t: "Plains" },
    { q: 2, r: 14, t: "Street" },
    { q: 2, r: 15, t: "Plains" },
    { q: 2, r: 16, t: "Street" },
    { q: 2, r: 17, t: "Street" },
    { q: 2, r: 18, t: "Plains" },
    { q: 2, r: 19, t: "Plains" },
    { q: 2, r: 20, t: "Forest" },
    { q: 2, r: 21, t: "Mountain" },
    { q: 3, r: -1, t: "Plains" },
    { q: 3, r: 0, t: "Street", u: { t: "Cavalry", c: "Central" } },
    { q: 3, r: 1, t: "Water" },
    { q: 3, r: 2, t: "Water" },
    { q: 3, r: 3, t: "Water" },
    { q: 3, r: 4, t: "Street" },
    { q: 3, r: 5, t: "Forest" },
    { q: 3, r: 6, t: "Plains" },
    { q: 3, r: 7, t: "Forest" },
    { q: 3, r: 8, t: "Plains" },
    { q: 3, r: 9, t: "Forest" },
    { q: 3, r: 10, t: "Plains" },
    { q: 3, r: 11, t: "Plains" },
    { q: 3, r: 12, t: "Street" },
    { q: 3, r: 13, t: "Street" },
    { q: 3, r: 14, t: "Street" },
    { q: 3, r: 15, t: "Plains" },
    { q: 3, r: 16, t: "Street" },
    { q: 3, r: 17, t: "Street" },
    { q: 3, r: 18, t: "Plains" },
    { q: 3, r: 19, t: "Forest" },
    { q: 3, r: 20, t: "Forest" },
    { q: 3, r: 21, t: "Forest" },
    { q: 4, r: -2, t: "Forest" },
    { q: 4, r: -1, t: "Forest" },
    { q: 4, r: 0, t: "Street" },
    { q: 4, r: 1, t: "Street" },
    { q: 4, r: 2, t: "Street" },
    { q: 4, r: 3, t: "Street" },
    { q: 4, r: 4, t: "Plains" },
    { q: 4, r: 5, t: "Plains" },
    { q: 4, r: 6, t: "Forest" },
    { q: 4, r: 7, t: "Forest" },
    { q: 4, r: 8, t: "Plains" },
    { q: 4, r: 9, t: "Plains" },
    { q: 4, r: 10, t: "Plains" },
    { q: 4, r: 11, t: "Street" },
    { q: 4, r: 12, t: "Mountain" },
    { q: 4, r: 13, t: "Mountain" },
    { q: 4, r: 14, t: "Street" },
    { q: 4, r: 15, t: "Street" },
    { q: 4, r: 16, t: "Plains" },
    { q: 4, r: 17, t: "Plains" },
    { q: 4, r: 18, t: "Plains" },
    { q: 4, r: 19, t: "Forest" },
    { q: 4, r: 20, t: "Forest" },
    { q: 5, r: -2, t: "Forest" },
    { q: 5, r: -1, t: "Plains" },
    { q: 5, r: 0, t: "Plains" },
    { q: 5, r: 1, t: "Plains" },
    { q: 5, r: 2, t: "Street" },
    {
      q: 5,
      r: 3,
      t: "Plains",
      u: { t: "Medium-Artillery", c: "Central" },
    },
    { q: 5, r: 4, t: "Plains" },
    { q: 5, r: 5, t: "Plains" },
    { q: 5, r: 6, t: "Plains" },
    { q: 5, r: 7, t: "Plains" },
    { q: 5, r: 8, t: "Street" },
    { q: 5, r: 9, t: "Street" },
    { q: 5, r: 10, t: "Street" },
    { q: 5, r: 11, t: "Plains" },
    { q: 5, r: 12, t: "Mountain" },
    { q: 5, r: 13, t: "Mountain" },
    { q: 5, r: 14, t: "Street" },
    { q: 5, r: 15, t: "Plains" },
    { q: 5, r: 16, t: "Plains" },
    { q: 5, r: 17, t: "Plains" },
    { q: 5, r: 18, t: "Plains" },
    { q: 5, r: 19, t: "Plains" },
    { q: 5, r: 20, t: "Forest" },
    { q: 6, r: -3, t: "Forest" },
    { q: 6, r: -2, t: "Forest" },
    { q: 6, r: -1, t: "Forest" },
    {
      q: 6,
      r: 0,
      t: "Plains",
      u: { t: "Elite-Infantry", c: "Central" },
    },
    { q: 6, r: 1, t: "Plains", u: { t: "Infantry", c: "Central" } },
    { q: 6, r: 2, t: "Street" },
    { q: 6, r: 3, t: "Plains" },
    { q: 6, r: 4, t: "Plains" },
    { q: 6, r: 5, t: "Plains" },
    { q: 6, r: 6, t: "Plains" },
    { q: 6, r: 7, t: "Street" },
    { q: 6, r: 8, t: "Plains" },
    { q: 6, r: 9, t: "Forest" },
    { q: 6, r: 10, t: "Plains" },
    { q: 6, r: 11, t: "Forest" },
    { q: 6, r: 12, t: "Mountain" },
    { q: 6, r: 13, t: "Forest" },
    {
      q: 6,
      r: 14,
      t: "Street",
      u: { t: "Elite-Infantry", c: "Entente" },
    },
    { q: 6, r: 15, t: "Plains" },
    { q: 6, r: 16, t: "Plains" },
    { q: 6, r: 17, t: "Plains" },
    { q: 6, r: 18, t: "Plains" },
    { q: 6, r: 19, t: "Forest" },
    { q: 7, r: -3, t: "Forest" },
    { q: 7, r: -2, t: "Forest" },
    {
      q: 7,
      r: -1,
      t: "Plains",
      u: { t: "Infantry", c: "Central" },
    },
    { q: 7, r: 0, t: "Plains", u: { t: "Infantry", c: "Central" } },
    {
      q: 7,
      r: 1,
      t: "Plains",
      u: { t: "Light-Artillery", c: "Central" },
    },
    { q: 7, r: 2, t: "Street" },
    { q: 7, r: 3, t: "Plains" },
    { q: 7, r: 4, t: "Plains" },
    { q: 7, r: 5, t: "Plains" },
    { q: 7, r: 6, t: "Street" },
    { q: 7, r: 7, t: "Plains" },
    { q: 7, r: 8, t: "Plains" },
    { q: 7, r: 9, t: "Plains" },
    { q: 7, r: 10, t: "Plains" },
    { q: 7, r: 11, t: "Forest" },
    {
      q: 7,
      r: 12,
      t: "Forest",
      u: { t: "Cavalry", c: "Entente" },
    },
    { q: 7, r: 13, t: "Plains" },
    {
      q: 7,
      r: 14,
      t: "Street",
      u: { t: "Medium-Artillery", c: "Entente" },
    },
    { q: 7, r: 15, t: "Plains" },
    { q: 7, r: 16, t: "Plains" },
    { q: 7, r: 17, t: "Plains" },
    { q: 7, r: 18, t: "Plains" },
    { q: 7, r: 19, t: "Mountain" },
    { q: 8, r: -4, t: "Forest" },
    { q: 8, r: -3, t: "Forest" },
    { q: 8, r: -2, t: "Plains" },
    {
      q: 8,
      r: -1,
      t: "Plains",
      u: { t: "Elite-Infantry", c: "Central" },
    },
    { q: 8, r: 0, t: "Plains", u: { t: "Infantry", c: "Central" } },
    { q: 8, r: 1, t: "Plains" },
    { q: 8, r: 2, t: "Street" },
    { q: 8, r: 3, t: "Plains" },
    { q: 8, r: 4, t: "Plains" },
    { q: 8, r: 5, t: "Street" },
    { q: 8, r: 6, t: "Plains" },
    { q: 8, r: 7, t: "Plains" },
    { q: 8, r: 8, t: "Plains" },
    { q: 8, r: 9, t: "Plains" },
    { q: 8, r: 10, t: "Plains" },
    {
      q: 8,
      r: 11,
      t: "Forest",
      u: { t: "Cavalry", c: "Entente" },
    },
    { q: 8, r: 12, t: "Forest" },
    {
      q: 8,
      r: 13,
      t: "Plains",
      u: { t: "Infantry", c: "Entente" },
    },
    {
      q: 8,
      r: 14,
      t: "Street",
      u: { t: "Light-Artillery", c: "Entente" },
    },
    { q: 8, r: 15, t: "Plains" },
    {
      q: 8,
      r: 16,
      t: "Plains",
      u: { t: "Elite-Infantry", c: "Entente" },
    },
    { q: 8, r: 17, t: "Plains" },
    { q: 8, r: 18, t: "Plains" },
    { q: 9, r: -4, t: "Forest" },
    { q: 9, r: -3, t: "Forest" },
    { q: 9, r: -2, t: "Plains" },
    { q: 9, r: -1, t: "Forest" },
    { q: 9, r: 0, t: "Plains" },
    { q: 9, r: 1, t: "Plains" },
    { q: 9, r: 2, t: "Street" },
    { q: 9, r: 3, t: "Mountain" },
    { q: 9, r: 4, t: "Street" },
    { q: 9, r: 5, t: "Street" },
    { q: 9, r: 6, t: "Street" },
    { q: 9, r: 7, t: "Plains" },
    { q: 9, r: 8, t: "Plains" },
    { q: 9, r: 9, t: "Plains" },
    { q: 9, r: 10, t: "Forest" },
    { q: 9, r: 11, t: "Mountain" },
    { q: 9, r: 12, t: "Plains" },
    {
      q: 9,
      r: 13,
      t: "Plains",
      u: { t: "Infantry", c: "Entente" },
    },
    {
      q: 9,
      r: 14,
      t: "Street",
      u: { t: "Medium-Artillery", c: "Entente" },
    },
    { q: 9, r: 15, t: "Plains" },
    { q: 9, r: 16, t: "Plains" },
    { q: 9, r: 17, t: "Plains" },
    { q: 9, r: 18, t: "Plains" },
    { q: 10, r: -5, t: "Forest" },
    { q: 10, r: -4, t: "Forest" },
    { q: 10, r: -3, t: "Plains" },
    { q: 10, r: -2, t: "Plains" },
    { q: 10, r: -1, t: "Plains" },
    { q: 10, r: 0, t: "Plains" },
    { q: 10, r: 1, t: "Plains" },
    { q: 10, r: 2, t: "Street" },
    { q: 10, r: 3, t: "Street" },
    {
      q: 10,
      r: 4,
      t: "Street",
      u: { t: "Heavy-Artillery", c: "Central" },
    },
    { q: 10, r: 5, t: "Street" },
    { q: 10, r: 6, t: "Street" },
    { q: 10, r: 7, t: "Plains" },
    { q: 10, r: 8, t: "Plains" },
    { q: 10, r: 9, t: "Water" },
    { q: 10, r: 10, t: "Mountain" },
    { q: 10, r: 11, t: "Mountain" },
    { q: 10, r: 12, t: "Plains" },
    {
      q: 10,
      r: 13,
      t: "Plains",
      u: { t: "Infantry", c: "Entente" },
    },
    {
      q: 10,
      r: 14,
      t: "Street",
      u: { t: "Infantry", c: "Entente" },
    },
    { q: 10, r: 15, t: "Plains" },
    { q: 10, r: 16, t: "Street" },
    { q: 10, r: 17, t: "Street" },
    { q: 11, r: -5, t: "Plains" },
    { q: 11, r: -4, t: "Plains" },
    { q: 11, r: -3, t: "Forest" },
    { q: 11, r: -2, t: "Plains" },
    { q: 11, r: -1, t: "Plains" },
    { q: 11, r: 0, t: "Plains" },
    { q: 11, r: 1, t: "Plains" },
    { q: 11, r: 2, t: "Plains" },
    { q: 11, r: 3, t: "Plains" },
    { q: 11, r: 4, t: "Street" },
    { q: 11, r: 5, t: "Street" },
    { q: 11, r: 6, t: "Plains" },
    { q: 11, r: 7, t: "Plains" },
    { q: 11, r: 8, t: "Water" },
    { q: 11, r: 9, t: "Water" },
    { q: 11, r: 10, t: "Mountain" },
    { q: 11, r: 11, t: "Water" },
    { q: 11, r: 12, t: "Water" },
    { q: 11, r: 13, t: "Plains" },
    { q: 11, r: 14, t: "Street" },
    { q: 11, r: 15, t: "Street" },
    { q: 11, r: 16, t: "Street" },
    { q: 11, r: 17, t: "Street" },
    { q: 12, r: -6, t: "Plains" },
    { q: 12, r: -5, t: "Plains" },
    { q: 12, r: -4, t: "Plains" },
    {
      q: 12,
      r: -3,
      t: "Plains",
      u: { t: "Cavalry", c: "Central" },
    },
    { q: 12, r: -2, t: "Plains" },
    { q: 12, r: -1, t: "Plains" },
    { q: 12, r: 0, t: "Plains" },
    { q: 12, r: 1, t: "Plains" },
    { q: 12, r: 2, t: "Plains" },
    { q: 12, r: 3, t: "Mountain" },
    { q: 12, r: 4, t: "Plains" },
    { q: 12, r: 5, t: "Plains" },
    { q: 12, r: 6, t: "Plains" },
    { q: 12, r: 7, t: "Water" },
    { q: 12, r: 8, t: "Water" },
    { q: 12, r: 9, t: "Water" },
    { q: 12, r: 10, t: "Water" },
    { q: 12, r: 11, t: "Plains" },
    { q: 12, r: 12, t: "Water" },
    { q: 12, r: 13, t: "Plains" },
    { q: 12, r: 14, t: "Plains" },
    { q: 12, r: 15, t: "Street" },
    { q: 12, r: 16, t: "Street" },
    { q: 13, r: -6, t: "Plains" },
    { q: 13, r: -5, t: "Plains" },
    { q: 13, r: -4, t: "Plains" },
    { q: 13, r: -3, t: "Forest" },
    { q: 13, r: -2, t: "Plains" },
    { q: 13, r: -1, t: "Plains" },
    { q: 13, r: 0, t: "Plains" },
    { q: 13, r: 1, t: "Plains" },
    { q: 13, r: 2, t: "Mountain" },
    { q: 13, r: 3, t: "Plains" },
    { q: 13, r: 4, t: "Plains" },
    { q: 13, r: 5, t: "Plains" },
    { q: 13, r: 6, t: "Forest" },
    { q: 13, r: 7, t: "Water" },
    { q: 13, r: 8, t: "Water" },
    { q: 13, r: 9, t: "Water" },
    { q: 13, r: 10, t: "Forest" },
    { q: 13, r: 11, t: "Plains" },
    { q: 13, r: 12, t: "Water" },
    { q: 13, r: 13, t: "Plains" },
    { q: 13, r: 14, t: "Plains" },
    { q: 13, r: 15, t: "Plains" },
    { q: 13, r: 16, t: "Plains" },
    { q: 14, r: -7, t: "Forest" },
    { q: 14, r: -6, t: "Forest" },
    { q: 14, r: -5, t: "Forest" },
    { q: 14, r: -4, t: "Forest" },
    { q: 14, r: -3, t: "Forest" },
    { q: 14, r: -2, t: "Forest" },
    { q: 14, r: -1, t: "Plains" },
    { q: 14, r: 0, t: "Plains" },
    { q: 14, r: 1, t: "Mountain" },
    { q: 14, r: 2, t: "Forest" },
    { q: 14, r: 3, t: "Plains" },
    { q: 14, r: 4, t: "Plains" },
    { q: 14, r: 5, t: "Plains" },
    { q: 14, r: 6, t: "Plains" },
    { q: 14, r: 7, t: "Water" },
    { q: 14, r: 8, t: "Water" },
    { q: 14, r: 9, t: "Forest" },
    { q: 14, r: 10, t: "Plains" },
    { q: 14, r: 11, t: "Water" },
    { q: 14, r: 12, t: "Plains" },
    { q: 14, r: 13, t: "Plains" },
    { q: 14, r: 14, t: "Plains" },
    { q: 14, r: 15, t: "Plains" },
  ],
};

export const PULSE2: TileMap = {
  name: "Pulse",
  nodes: [
    { q: 0, r: 0, t: "Forest" },
    { q: 0, r: 1, t: "Plains" },
    { q: 0, r: 2, t: "Water" },
    { q: 0, r: 3, t: "Street" },
    { q: 0, r: 4, t: "Street" },
    { q: 0, r: 5, t: "Water" },
    { q: 0, r: 6, t: "Street" },
    { q: 0, r: 7, t: "Plains" },
    { q: 0, r: 8, t: "Forest" },
    { q: 0, r: 9, t: "Forest" },
    { q: 0, r: 10, t: "Forest" },
    { q: 0, r: 11, t: "Forest" },
    { q: 0, r: 12, t: "Forest" },
    { q: 0, r: 13, t: "Forest" },
    { q: 0, r: 14, t: "Forest" },
    { q: 0, r: 15, t: "Forest" },
    { q: 0, r: 16, t: "Plains" },
    { q: 0, r: 17, t: "Street" },
    { q: 0, r: 18, t: "Street" },
    { q: 0, r: 19, t: "Forest" },
    { q: 0, r: 20, t: "Forest" },
    { q: 0, r: 21, t: "Mountain" },
    { q: 0, r: 22, t: "Mountain" },
    { q: 1, r: 0, t: "Street" },
    { q: 1, r: 1, t: "Street", u: { t: "Light-Artillery", c: "Central" } },
    { q: 1, r: 2, t: "Street" },
    { q: 1, r: 3, t: "Street" },
    { q: 1, r: 4, t: "Street" },
    { q: 1, r: 5, t: "Water" },
    { q: 1, r: 6, t: "Street" },
    { q: 1, r: 7, t: "Forest" },
    { q: 1, r: 8, t: "Forest" },
    { q: 1, r: 9, t: "Forest" },
    { q: 1, r: 10, t: "Forest" },
    { q: 1, r: 11, t: "Forest" },
    { q: 1, r: 12, t: "Forest" },
    { q: 1, r: 13, t: "Plains" },
    { q: 1, r: 14, t: "Plains" },
    { q: 1, r: 15, t: "Street" },
    { q: 1, r: 16, t: "Street", u: { t: "Heavy-Artillery", c: "Entente" } },
    { q: 1, r: 17, t: "Street" },
    { q: 1, r: 18, t: "Street" },
    { q: 1, r: 19, t: "Plains" },
    { q: 1, r: 20, t: "Forest" },
    { q: 1, r: 21, t: "Mountain" },
    { q: 1, r: 22, t: "Mountain" },
    { q: 2, r: -1, t: "Forest" },
    { q: 2, r: 0, t: "Street" },
    { q: 2, r: 1, t: "Water" },
    { q: 2, r: 2, t: "Street" },
    { q: 2, r: 3, t: "Street" },
    { q: 2, r: 4, t: "Water" },
    { q: 2, r: 5, t: "Street" },
    { q: 2, r: 6, t: "Plains" },
    { q: 2, r: 7, t: "Forest" },
    { q: 2, r: 8, t: "Forest" },
    { q: 2, r: 9, t: "Forest" },
    { q: 2, r: 10, t: "Forest" },
    { q: 2, r: 11, t: "Plains" },
    { q: 2, r: 12, t: "Plains" },
    { q: 2, r: 13, t: "Plains" },
    { q: 2, r: 14, t: "Street" },
    { q: 2, r: 15, t: "Plains" },
    { q: 2, r: 16, t: "Street" },
    { q: 2, r: 17, t: "Street" },
    { q: 2, r: 18, t: "Plains" },
    { q: 2, r: 19, t: "Plains" },
    { q: 2, r: 20, t: "Forest" },
    { q: 2, r: 21, t: "Mountain" },
    { q: 3, r: -1, t: "Plains" },
    { q: 3, r: 0, t: "Street", u: { t: "Cavalry", c: "Central" } },
    { q: 3, r: 1, t: "Water" },
    { q: 3, r: 2, t: "Water" },
    { q: 3, r: 3, t: "Water" },
    { q: 3, r: 4, t: "Street" },
    { q: 3, r: 5, t: "Forest" },
    { q: 3, r: 6, t: "Plains" },
    { q: 3, r: 7, t: "Forest" },
    { q: 3, r: 8, t: "Plains" },
    { q: 3, r: 9, t: "Forest" },
    { q: 3, r: 10, t: "Plains" },
    { q: 3, r: 11, t: "Plains" },
    { q: 3, r: 12, t: "Street" },
    { q: 3, r: 13, t: "Street" },
    { q: 3, r: 14, t: "Street" },
    { q: 3, r: 15, t: "Plains" },
    { q: 3, r: 16, t: "Street" },
    { q: 3, r: 17, t: "Street" },
    { q: 3, r: 18, t: "Plains" },
    { q: 3, r: 19, t: "Forest" },
    { q: 3, r: 20, t: "Forest" },
    { q: 3, r: 21, t: "Forest" },
    { q: 4, r: -2, t: "Forest" },
    { q: 4, r: -1, t: "Forest" },
    { q: 4, r: 0, t: "Street" },
    { q: 4, r: 1, t: "Street" },
    { q: 4, r: 2, t: "Street" },
    { q: 4, r: 3, t: "Street" },
    { q: 4, r: 4, t: "Plains" },
    { q: 4, r: 5, t: "Plains" },
    { q: 4, r: 6, t: "Forest" },
    { q: 4, r: 7, t: "Forest" },
    { q: 4, r: 8, t: "Plains" },
    { q: 4, r: 9, t: "Plains" },
    { q: 4, r: 10, t: "Plains" },
    { q: 4, r: 11, t: "Street" },
    { q: 4, r: 12, t: "Mountain" },
    { q: 4, r: 13, t: "Mountain" },
    { q: 4, r: 14, t: "Street" },
    { q: 4, r: 15, t: "Street" },
    { q: 4, r: 16, t: "Plains" },
    { q: 4, r: 17, t: "Plains" },
    { q: 4, r: 18, t: "Plains" },
    { q: 4, r: 19, t: "Forest" },
    { q: 4, r: 20, t: "Forest" },
    { q: 5, r: -2, t: "Forest" },
    { q: 5, r: -1, t: "Plains" },
    { q: 5, r: 0, t: "Plains" },
    { q: 5, r: 1, t: "Plains" },
    { q: 5, r: 2, t: "Street" },
    { q: 5, r: 3, t: "Plains", u: { t: "Medium-Artillery", c: "Central" } },
    { q: 5, r: 4, t: "Plains" },
    { q: 5, r: 5, t: "Plains" },
    { q: 5, r: 6, t: "Plains" },
    { q: 5, r: 7, t: "Plains" },
    { q: 5, r: 8, t: "Street" },
    { q: 5, r: 9, t: "Street" },
    { q: 5, r: 10, t: "Street" },
    { q: 5, r: 11, t: "Plains" },
    { q: 5, r: 12, t: "Mountain" },
    { q: 5, r: 13, t: "Mountain" },
    { q: 5, r: 14, t: "Street" },
    { q: 5, r: 15, t: "Plains" },
    { q: 5, r: 16, t: "Plains" },
    { q: 5, r: 17, t: "Plains" },
    { q: 5, r: 18, t: "Plains" },
    { q: 5, r: 19, t: "Plains" },
    { q: 5, r: 20, t: "Forest" },
    { q: 6, r: -3, t: "Forest" },
    { q: 6, r: -2, t: "Forest" },
    { q: 6, r: -1, t: "Forest" },
    { q: 6, r: 0, t: "Plains", u: { t: "Elite-Infantry", c: "Central" } },
    { q: 6, r: 1, t: "Plains", u: { t: "Infantry", c: "Central" } },
    { q: 6, r: 2, t: "Street" },
    { q: 6, r: 3, t: "Plains" },
    { q: 6, r: 4, t: "Plains" },
    { q: 6, r: 5, t: "Plains" },
    { q: 6, r: 6, t: "Plains" },
    { q: 6, r: 7, t: "Street" },
    { q: 6, r: 8, t: "Plains" },
    { q: 6, r: 9, t: "Forest" },
    { q: 6, r: 10, t: "Plains" },
    { q: 6, r: 11, t: "Forest" },
    { q: 6, r: 12, t: "Mountain" },
    { q: 6, r: 13, t: "Forest" },
    { q: 6, r: 14, t: "Street", u: { t: "Elite-Infantry", c: "Entente" } },
    { q: 6, r: 15, t: "Plains" },
    { q: 6, r: 16, t: "Plains" },
    { q: 6, r: 17, t: "Plains" },
    { q: 6, r: 18, t: "Plains" },
    { q: 6, r: 19, t: "Forest" },
    { q: 7, r: -3, t: "Forest" },
    { q: 7, r: -2, t: "Forest" },
    { q: 7, r: -1, t: "Plains", u: { t: "Infantry", c: "Central" } },
    { q: 7, r: 0, t: "Plains", u: { t: "Infantry", c: "Central" } },
    { q: 7, r: 1, t: "Plains", u: { t: "Light-Artillery", c: "Central" } },
    { q: 7, r: 2, t: "Street" },
    { q: 7, r: 3, t: "Plains" },
    { q: 7, r: 4, t: "Plains" },
    { q: 7, r: 5, t: "Plains" },
    { q: 7, r: 6, t: "Street" },
    { q: 7, r: 7, t: "Plains" },
    { q: 7, r: 8, t: "Plains" },
    { q: 7, r: 9, t: "Plains" },
    { q: 7, r: 10, t: "Plains" },
    { q: 7, r: 11, t: "Forest" },
    { q: 7, r: 12, t: "Forest", u: { t: "Cavalry", c: "Entente" } },
    { q: 7, r: 13, t: "Plains" },
    { q: 7, r: 14, t: "Street", u: { t: "Medium-Artillery", c: "Entente" } },
    { q: 7, r: 15, t: "Plains" },
    { q: 7, r: 16, t: "Plains" },
    { q: 7, r: 17, t: "Plains" },
    { q: 7, r: 18, t: "Plains" },
    { q: 7, r: 19, t: "Mountain" },
    { q: 8, r: -4, t: "Forest" },
    { q: 8, r: -3, t: "Forest" },
    { q: 8, r: -2, t: "Plains" },
    { q: 8, r: -1, t: "Plains", u: { t: "Elite-Infantry", c: "Central" } },
    { q: 8, r: 0, t: "Plains", u: { t: "Infantry", c: "Central" } },
    { q: 8, r: 1, t: "Plains" },
    { q: 8, r: 2, t: "Street" },
    { q: 8, r: 3, t: "Plains" },
    { q: 8, r: 4, t: "Plains" },
    { q: 8, r: 5, t: "Street" },
    { q: 8, r: 6, t: "Plains" },
    { q: 8, r: 7, t: "Plains" },
    { q: 8, r: 8, t: "Plains" },
    { q: 8, r: 9, t: "Plains" },
    { q: 8, r: 10, t: "Plains" },
    { q: 8, r: 11, t: "Forest", u: { t: "Cavalry", c: "Entente" } },
    { q: 8, r: 12, t: "Forest" },
    { q: 8, r: 13, t: "Plains", u: { t: "Infantry", c: "Entente" } },
    { q: 8, r: 14, t: "Street", u: { t: "Light-Artillery", c: "Entente" } },
    { q: 8, r: 15, t: "Plains" },
    { q: 8, r: 16, t: "Plains", u: { t: "Elite-Infantry", c: "Entente" } },
    { q: 8, r: 17, t: "Plains" },
    { q: 8, r: 18, t: "Plains" },
    { q: 9, r: -4, t: "Forest" },
    { q: 9, r: -3, t: "Forest" },
    { q: 9, r: -2, t: "Plains" },
    { q: 9, r: -1, t: "Forest", u: { t: "Elite-Infantry", c: "Entente" } },
    { q: 9, r: 0, t: "Plains", u: { t: "Elite-Infantry", c: "Entente" } },
    { q: 9, r: 1, t: "Plains" },
    { q: 9, r: 2, t: "Street" },
    { q: 9, r: 3, t: "Mountain" },
    { q: 9, r: 4, t: "Street" },
    { q: 9, r: 5, t: "Street" },
    { q: 9, r: 6, t: "Street" },
    { q: 9, r: 7, t: "Plains" },
    { q: 9, r: 8, t: "Plains" },
    { q: 9, r: 9, t: "Plains" },
    { q: 9, r: 10, t: "Forest" },
    { q: 9, r: 11, t: "Mountain" },
    { q: 9, r: 12, t: "Plains" },
    { q: 9, r: 13, t: "Plains", u: { t: "Infantry", c: "Entente" } },
    { q: 9, r: 14, t: "Street", u: { t: "Medium-Artillery", c: "Entente" } },
    { q: 9, r: 15, t: "Plains" },
    { q: 9, r: 16, t: "Plains" },
    { q: 9, r: 17, t: "Plains" },
    { q: 9, r: 18, t: "Plains" },
    { q: 10, r: -5, t: "Forest" },
    { q: 10, r: -4, t: "Forest" },
    { q: 10, r: -3, t: "Plains" },
    { q: 10, r: -2, t: "Plains" },
    { q: 10, r: -1, t: "Plains" },
    { q: 10, r: 0, t: "Plains" },
    { q: 10, r: 1, t: "Plains" },
    { q: 10, r: 2, t: "Street" },
    { q: 10, r: 3, t: "Street" },
    { q: 10, r: 4, t: "Street", u: { t: "Heavy-Artillery", c: "Central" } },
    { q: 10, r: 5, t: "Street" },
    { q: 10, r: 6, t: "Street" },
    { q: 10, r: 7, t: "Plains" },
    { q: 10, r: 8, t: "Plains" },
    { q: 10, r: 9, t: "Water" },
    { q: 10, r: 10, t: "Mountain" },
    { q: 10, r: 11, t: "Mountain" },
    { q: 10, r: 12, t: "Plains" },
    { q: 10, r: 13, t: "Plains", u: { t: "Infantry", c: "Entente" } },
    { q: 10, r: 14, t: "Street", u: { t: "Infantry", c: "Entente" } },
    { q: 10, r: 15, t: "Plains" },
    { q: 10, r: 16, t: "Street" },
    { q: 10, r: 17, t: "Street" },
    { q: 11, r: -5, t: "Plains" },
    { q: 11, r: -4, t: "Plains" },
    { q: 11, r: -3, t: "Forest" },
    { q: 11, r: -2, t: "Plains" },
    { q: 11, r: -1, t: "Plains" },
    { q: 11, r: 0, t: "Plains" },
    { q: 11, r: 1, t: "Plains" },
    { q: 11, r: 2, t: "Plains" },
    { q: 11, r: 3, t: "Plains" },
    { q: 11, r: 4, t: "Street" },
    { q: 11, r: 5, t: "Street" },
    { q: 11, r: 6, t: "Plains" },
    { q: 11, r: 7, t: "Plains" },
    { q: 11, r: 8, t: "Water" },
    { q: 11, r: 9, t: "Water" },
    { q: 11, r: 10, t: "Mountain" },
    { q: 11, r: 11, t: "Water" },
    { q: 11, r: 12, t: "Water" },
    { q: 11, r: 13, t: "Plains" },
    { q: 11, r: 14, t: "Street" },
    { q: 11, r: 15, t: "Street" },
    { q: 11, r: 16, t: "Street" },
    { q: 11, r: 17, t: "Street" },
    { q: 12, r: -6, t: "Plains" },
    { q: 12, r: -5, t: "Plains" },
    { q: 12, r: -4, t: "Plains" },
    { q: 12, r: -3, t: "Plains", u: { t: "Cavalry", c: "Central" } },
    { q: 12, r: -2, t: "Plains" },
    { q: 12, r: -1, t: "Plains" },
    { q: 12, r: 0, t: "Plains" },
    { q: 12, r: 1, t: "Plains" },
    { q: 12, r: 2, t: "Plains" },
    { q: 12, r: 3, t: "Mountain" },
    { q: 12, r: 4, t: "Plains" },
    { q: 12, r: 5, t: "Plains" },
    { q: 12, r: 6, t: "Plains" },
    { q: 12, r: 7, t: "Water" },
    { q: 12, r: 8, t: "Water" },
    { q: 12, r: 9, t: "Water" },
    { q: 12, r: 10, t: "Water" },
    { q: 12, r: 11, t: "Plains" },
    { q: 12, r: 12, t: "Water" },
    { q: 12, r: 13, t: "Plains" },
    { q: 12, r: 14, t: "Plains" },
    { q: 12, r: 15, t: "Street" },
    { q: 12, r: 16, t: "Street" },
    { q: 13, r: -6, t: "Plains" },
    { q: 13, r: -5, t: "Plains" },
    { q: 13, r: -4, t: "Plains" },
    { q: 13, r: -3, t: "Forest" },
    { q: 13, r: -2, t: "Plains" },
    { q: 13, r: -1, t: "Plains" },
    { q: 13, r: 0, t: "Plains" },
    { q: 13, r: 1, t: "Plains" },
    { q: 13, r: 2, t: "Mountain" },
    { q: 13, r: 3, t: "Plains" },
    { q: 13, r: 4, t: "Plains" },
    { q: 13, r: 5, t: "Plains" },
    { q: 13, r: 6, t: "Forest" },
    { q: 13, r: 7, t: "Water" },
    { q: 13, r: 8, t: "Water" },
    { q: 13, r: 9, t: "Water" },
    { q: 13, r: 10, t: "Forest" },
    { q: 13, r: 11, t: "Plains" },
    { q: 13, r: 12, t: "Water" },
    { q: 13, r: 13, t: "Plains" },
    { q: 13, r: 14, t: "Plains" },
    { q: 13, r: 15, t: "Plains" },
    { q: 13, r: 16, t: "Plains" },
    { q: 14, r: -7, t: "Forest" },
    { q: 14, r: -6, t: "Forest" },
    { q: 14, r: -5, t: "Forest" },
    { q: 14, r: -4, t: "Forest" },
    { q: 14, r: -3, t: "Forest" },
    { q: 14, r: -2, t: "Forest" },
    { q: 14, r: -1, t: "Plains" },
    { q: 14, r: 0, t: "Plains" },
    { q: 14, r: 1, t: "Mountain" },
    { q: 14, r: 2, t: "Forest" },
    { q: 14, r: 3, t: "Plains" },
    { q: 14, r: 4, t: "Plains" },
    { q: 14, r: 5, t: "Plains" },
    { q: 14, r: 6, t: "Plains" },
    { q: 14, r: 7, t: "Water" },
    { q: 14, r: 8, t: "Water" },
    { q: 14, r: 9, t: "Forest" },
    { q: 14, r: 10, t: "Plains" },
    { q: 14, r: 11, t: "Water" },
    { q: 14, r: 12, t: "Plains" },
    { q: 14, r: 13, t: "Plains" },
    { q: 14, r: 14, t: "Plains" },
    { q: 14, r: 15, t: "Plains" },
  ],
};
