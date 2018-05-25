/**
 * mdrwishlist - Mandarake wishlist generator <https://bitbucket.org/msikma/mdrwishlist>
 * Copyright © 2018, Michiel Sikma
 */

import fs from 'fs'
import { loadCookies } from 'mdrscr'

const setupCookies = async (cookies) => {
  // Cookies are mandatory. Check if we have a valid file, and then load it.
  if (!fs.existsSync(cookies)) {
    throw TypeError('Cookies file does not exist')
  }
  // Assume the cookies are ok.
  await loadCookies(cookies)
}

export default setupCookies
