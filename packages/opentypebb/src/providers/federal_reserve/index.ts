/**
 * Federal Reserve Provider Module.
 * Maps to: openbb_platform/providers/federal_reserve/openbb_federal_reserve/__init__.py
 */

import { Provider } from '../../core/provider/abstract/provider.js'
import { FedCentralBankHoldingsFetcher } from './models/central-bank-holdings.js'

export const federalReserveProvider = new Provider({
  name: 'federal_reserve',
  website: 'https://www.federalreserve.gov',
  description: 'Federal Reserve Economic Data.',
  credentials: ['api_key'],
  fetcherDict: {
    CentralBankHoldings: FedCentralBankHoldingsFetcher,
  },
})
