/**
 * mdrwishlist - Mandarake wishlist generator <https://bitbucket.org/msikma/mdrwishlist>
 * Copyright © 2018, Michiel Sikma
 */

import mandarakeSearch, { categories, shops } from 'mdrscr'

/**
 * This is run right after parsing the user's command line arguments.
 * We check what type of URL the user passed and call the appropriate script.
 *
 * All command line arguments are passed here.
 */
export const run = async (args) => {
  const { action, cookies, rawData } = args
  console.log(action, cookies, rawData);
  return process.exit(0)
}
