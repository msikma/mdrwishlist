/**
 * mdrwishlist - Mandarake wishlist generator <https://bitbucket.org/msikma/mdrwishlist>
 * Copyright © 2018, Michiel Sikma
 */

/**
 * Take the user's favorites and make a shopping list.
 *
 * Each entry in 'favs' looks like this:
 *
 * { title: 'タイトル:デジキューブ 予約特典/ファイナルファンタジー9 ビビ ヌイグルミ',
 *   itemNo: [ 'nitem-00HTHXU5', '0200071791-0000000' ],
 *   image: 'https://img.mandarake.co.jp/webshopimg/02/00/791/0200071791/s_020007179110.jpg',
 *   link: 'https://order.mandarake.co.jp/order/detailPage/item?itemCode=1077470861&ref=flist',
 *   shop: 'SAHRA',
 *   shopCode: '55',
 *   price: 540,
 *   isAdult: false,
 *   inStock: false,
 *   inStorefront: false,
 *   otherShops: [
 *     { shop: '渋谷店', shopCode: '6' },
 *     { shop: '小倉店', shopCode: '29' },
 *     { shop: 'コンプレックス', shopCode: '30' },
 *     { shop: '中野店', shopCode: '1' },
 *     { shop: '渋谷店', shopCode: '6' },
 *     { shop: '名古屋店', shopCode: '4' },
 *     { shop: 'SAHRA', shopCode: '55' } ] }
 */
const makeList = (action, favs) => {
  // TODO: currently, we only support one action.
  if (action === 'shopping-list') return makeShoppingList(favs)
  else throw TypeError('Invalid list action')
}

/**
 * Makes a shopping list for each store.
 */
const makeShoppingList = (favs) => {
  const shopNames = {}
  const shops = {}
  const items = {}

  favs.forEach(fav => {
    const key = fav.itemNo.join('$')
    items[key] = fav

    // Loop over all shops and put the item in its list.
    const shopsList = [{ shop: fav.shop, shopCode: fav.shopCode }, ...fav.otherShops]
    shopsList.forEach(shop => {
      // Create the list if it doesn't exit.
      if (!shops[shop.shopCode]) shops[shop.shopCode] = []
      shops[shop.shopCode].push(key)
      shopNames[shop.shopCode] = shop.shop
    })
  })

  return { shops, items, shopNames }
}

export default makeList
