/**
 * mdrwishlist - Mandarake wishlist generator <https://bitbucket.org/msikma/mdrwishlist>
 * Copyright © 2018, Michiel Sikma
 */

import fs from 'fs'
import { mandarakeFavorites } from 'mdrscr'

export const printResults = (action, data) => {
  if (action === 'shopping-list') return printShoppingList(data)
  else throw TypeError('Invalid list action')
}

/**
 * Outputs the shopping list to the user in the terminal.
 */
const printShoppingList = (data) => {
  console.log('printing shopping list')
  console.log(data)
}
