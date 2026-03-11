/**
 * OECD Provider Module.
 * Maps to: openbb_platform/providers/oecd/openbb_oecd/__init__.py
 */

import { Provider } from '../../core/provider/abstract/provider.js'
import { OECDCompositeLeadingIndicatorFetcher } from './models/composite-leading-indicator.js'
import { OECDConsumerPriceIndexFetcher } from './models/consumer-price-index.js'
import { OECDCountryInterestRatesFetcher } from './models/country-interest-rates.js'

export const oecdProvider = new Provider({
  name: 'oecd',
  website: 'https://data.oecd.org',
  description: 'OECD provides international economic, social, and environmental data.',
  fetcherDict: {
    CompositeLeadingIndicator: OECDCompositeLeadingIndicatorFetcher,
    ConsumerPriceIndex: OECDConsumerPriceIndexFetcher,
    CountryInterestRates: OECDCountryInterestRatesFetcher,
  },
})
