function onError(err) {
  console.error('[gatsby-plugin-vercel]', err) // eslint-disable-line no-console
}

function onDebug(label, payload) {
  console.log(label, payload) // eslint-disable-line no-console
}

function sendToAnalytics(fullPath, metric) {
  const body = {
    dsn: process.env.VERCEL_ANALYTICS_ID,
    id: metric.id,
    page: fullPath,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed:
      'connection' in navigator &&
      navigator['connection'] &&
      'effectiveType' in navigator['connection']
        ? navigator['connection']['effectiveType']
        : ''
  }

  const debug = parseInt('<%= options.debug %>')
  if (debug === 1) {
    onDebug(metric.name, JSON.stringify(body, null, 2))
    return
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`:
    type: 'application/x-www-form-urlencoded'
  })
  const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'
  ;(navigator.sendBeacon && navigator.sendBeacon(vitalsUrl, blob)) ||
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true
    })
}

async function webVitals(fullPath) {
  try {
    const { getCLS, getFID, getLCP, getTTFB, getFCP } = await import(
      'web-vitals'
    )
    getFID(metric => sendToAnalytics(fullPath, metric))
    getTTFB(metric => sendToAnalytics(fullPath, metric))
    getLCP(metric => sendToAnalytics(fullPath, metric))
    getCLS(metric => sendToAnalytics(fullPath, metric))
    getFCP(metric => sendToAnalytics(fullPath, metric))
  } catch (err) {
    onError(err)
  }
}

export default function ({ app: { router } }) {
  router.onReady(to => {
    webVitals(to.fullPath)
    router.afterEach(to => webVitals(to.fullPath))
  })
}
