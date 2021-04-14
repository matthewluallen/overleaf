const chai = require('chai')
const { expect } = chai

function clearSettingsCache() {
  delete require.cache[
    require.resolve('../../../../config/settings.defaults.coffee')
  ]
  const settingsDeps = Object.keys(require.cache).filter(x =>
    x.includes('/settings-sharelatex/')
  )
  settingsDeps.forEach(dep => delete require.cache[dep])
}

describe('settings.defaults', function () {
  it('additional text extensions can be added via config', function () {
    clearSettingsCache()
    process.env.ADDITIONAL_TEXT_EXTENSIONS = 'abc, xyz'
    const settings = require('settings-sharelatex')
    expect(settings.textExtensions).to.include('tex') // from the default list
    expect(settings.textExtensions).to.include('abc')
    expect(settings.textExtensions).to.include('xyz')
  })
})
