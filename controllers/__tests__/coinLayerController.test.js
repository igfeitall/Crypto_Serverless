const coinLayer = require('../coinLayerController')

test('Return data is an object', async () => {
  await expect(typeof coinLayer.getLive()).toBe('object')
})