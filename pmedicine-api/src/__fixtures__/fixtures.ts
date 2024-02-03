const tableWithMedicineInfo = [
    '<div class="ProductAttributestyles__ProductAttributeStyles-sc-1smttju-0">',
    '<table>',
    '<tr><th>SKU</th><td><div>38398</div></td></tr>',
    '<tr><th>EAN</th><td><div>7896094999992</div></td></tr>',
    '</table>',
    '</div>'
  ].join('');

  const scriptWithPrice = [
    '<script type="application/ld+json">',
    '{"offers": { "price" : 32.7 }}',
    '</script>'
  ].join('');

  const divWithName = [
    '<div class="product-name">',
    '<h1>Medicine</h1>',
    '</div>'
  ].join('');

  const divWithBrandImageAndQuantity = [
    '<div class="brand">Brand</div>',
    '<div><img src="some_url" class="small-img"></div>',
    '<div class="quantity">Quantity</div>',
  ].join('');

  export const html = [
    '<html>',
    '<head>',
    scriptWithPrice,
    '</head>',
    '<body>',
    divWithName,
    divWithBrandImageAndQuantity,
    tableWithMedicineInfo,
    '</body>',
    '</html>'
  ].join('');

  export const htmlWithoutTable = [
    '<html>',
    '<head>',
    scriptWithPrice,
    '</head>',
    '<body>',
    divWithName,
    divWithBrandImageAndQuantity,
    '</body>',
    '</html>'
  ].join('');

  export const drogasilConfig = {
    name: ".product-name > h1",
    brand: ".brand",
    barcode: ".ProductAttributestyles__ProductAttributeStyles-sc-1smttju-0 > table",
    price: "script[type=application/ld+json]",
    description: ".quantity",
    image: ".small-img"
}

export const defaultMedicine = {
  name: "Medicine",
  brand: "Brand",
  image: "some_url",
  price: 32.7,
  description: "Quantity",
  barcode: "7896094999992"
}