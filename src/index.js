/**
 * mdrwishlist - Mandarake wishlist generator <https://bitbucket.org/msikma/mdrwishlist>
 * Copyright © 2018, Michiel Sikma
 */

import fs from 'fs'
import { mandarakeFavorites } from 'mdrscr'

import makeList from './list'
import setupCookies from './cookies'
import { printResults } from './print'

const progress = (currItem, totalItems) => {
  console.log(`curr: ${currItem}, total: ${totalItems}`)
}

/**
 * This is run right after parsing the user's command line arguments.
 * We check what type of URL the user passed and call the appropriate script.
 *
 * All command line arguments are passed here.
 */
export const run = async (args) => {
  const { action, cookies, rawData } = args

  // Setup cookies. If something goes wrong we must abort because
  // we need to be able to make authenticated requests.
  try {
    await setupCookies(cookies)
  }
  catch (err) {
    if (err.message === 'Cookies file does not exist') {
      console.log(`mdrwishlist: error: could not find cookie file at ${cookies}`)
    }
    else console.log(err)
    process.exit(1)
  }

  // Retrieve all items from the user's favorites list. Then make a shopping list.
  // We're requesting the favorites with extended shop availability information.
  // This takes a while, so we're actually printing a progress indicator.
  try {
    const favs = await mandarakeFavorites('ja', true, progress)
    const results = makeList(action, favs)

    // Format the list properly and output it to the user.
    if (rawData) {
      console.log(results)
    }
    else {
      printResults(action, results)
    }
  }
  catch (err) {
    if (err.message === 'Not logged in') {
      // Display a slightly more helpful error message if we can't log in.
      console.log(`mdrwishlist: could not log in to Mandarake using the provided cookies file at ${cookies}`)
    }
    else console.log(err)
    process.exit(1)
  }

  return process.exit(0)
}
