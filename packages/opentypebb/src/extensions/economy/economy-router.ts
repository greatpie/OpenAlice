/**
 * Economy Router.
 * Maps to: openbb_economy/economy_router.py
 */

import { Router } from '../../core/app/router.js'

export const economyRouter = new Router({
  prefix: '/economy',
  description: 'Economic data.',
})

economyRouter.command({
  model: 'EconomicCalendar',
  path: '/calendar',
  description: 'Get the upcoming and historical economic calendar events.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'EconomicCalendar', params, credentials)
  },
})

economyRouter.command({
  model: 'TreasuryRates',
  path: '/treasury_rates',
  description: 'Get current and historical Treasury rates.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'TreasuryRates', params, credentials)
  },
})

economyRouter.command({
  model: 'DiscoveryFilings',
  path: '/discovery_filings',
  description: 'Search and discover SEC filings by form type and date range.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'DiscoveryFilings', params, credentials)
  },
})

economyRouter.command({
  model: 'AvailableIndicators',
  path: '/available_indicators',
  description: 'Get the list of available economic indicators.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'AvailableIndicators', params, credentials)
  },
})

economyRouter.command({
  model: 'ConsumerPriceIndex',
  path: '/cpi',
  description: 'Get Consumer Price Index (CPI) data.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'ConsumerPriceIndex', params, credentials)
  },
})

economyRouter.command({
  model: 'CompositeLeadingIndicator',
  path: '/composite_leading_indicator',
  description: 'Get Composite Leading Indicator (CLI) data from the OECD.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'CompositeLeadingIndicator', params, credentials)
  },
})

economyRouter.command({
  model: 'CountryInterestRates',
  path: '/interest_rates',
  description: 'Get short-term interest rates by country.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'CountryInterestRates', params, credentials)
  },
})

economyRouter.command({
  model: 'BalanceOfPayments',
  path: '/balance_of_payments',
  description: 'Get balance of payments data from the ECB.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'BalanceOfPayments', params, credentials)
  },
})

economyRouter.command({
  model: 'CentralBankHoldings',
  path: '/central_bank_holdings',
  description: 'Get central bank holdings data (Fed balance sheet).',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'CentralBankHoldings', params, credentials)
  },
})

economyRouter.command({
  model: 'CountryProfile',
  path: '/country_profile',
  description: 'Get a comprehensive economic profile for a country.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'CountryProfile', params, credentials)
  },
})

economyRouter.command({
  model: 'DirectionOfTrade',
  path: '/direction_of_trade',
  description: 'Get direction of trade statistics from the IMF.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'DirectionOfTrade', params, credentials)
  },
})

economyRouter.command({
  model: 'ExportDestinations',
  path: '/export_destinations',
  description: 'Get top export destinations for a country.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'ExportDestinations', params, credentials)
  },
})

economyRouter.command({
  model: 'EconomicIndicators',
  path: '/indicators',
  description: 'Get economic indicator time series data.',
  handler: async (executor, provider, params, credentials) => {
    return executor.execute(provider, 'EconomicIndicators', params, credentials)
  },
})
