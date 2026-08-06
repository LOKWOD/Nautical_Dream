import { destinationsLakesEast } from "./destinations-lakes-east.mjs";
import { destinationsLakesCoast } from "./destinations-lakes-coast.mjs";
import { destinationsCoastalRoutes } from "./destinations-coastal-routes.mjs";

export const destinations = [...destinationsLakesEast, ...destinationsLakesCoast, ...destinationsCoastalRoutes];
