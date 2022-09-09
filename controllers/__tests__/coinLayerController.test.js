const CoinLayer = require('../coinLayerController')

test('Return data is an object', async () => {
  const coinLayer = new CoinLayer()

  await expect(typeof coinLayer.getLive()).toBe('object')
})