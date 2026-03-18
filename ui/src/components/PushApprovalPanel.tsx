import { useState, useEffect, useCallback } from 'react'
import { api } from '../api'
import type { TradingAccount, WalletStatus, WalletPushResult } from '../api/types'

interface PendingAccount {
  account: TradingAccount
  status: WalletStatus
}

/** Format an operation for display. */
function formatOp(op: WalletStatus['staged'][number]): string {
  const symbol = op.contract?.aliceId || op.contract?.symbol || op.contract?.localSymbol || ''
  switch (op.action) {
    case 'placeOrder': {
      const side = op.order?.action || '?'
      const type = op.order?.orderType || ''
      const qty = op.order?.totalQuantity ?? op.order?.cashQty ?? ''
      const price = op.order?.lmtPrice ? ` @ ${op.order.lmtPrice}` : ''
      return `${side} ${qty} ${symbol} ${type}${price}`.trim()
    }
    case 'closePosition':
      return `Close ${symbol}${op.quantity ? ` (${op.quantity})` : ''}`
    case 'modifyOrder':
      return `Modify order ${op.orderId || '?'}`
    case 'cancelOrder':
      return `Cancel order ${op.orderId || '?'}`
    case 'syncOrders':
      return 'Sync orders'
    default:
      return op.action
  }
}

export function PushApprovalPanel() {
  const [pending, setPending] = useState<PendingAccount[]>([])
  const [pushing, setPushing] = useState<string | null>(null)
  const [result, setResult] = useState<{ accountId: string; data: WalletPushResult } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const poll = useCallback(async () => {
    try {
      const { accounts } = await api.trading.listAccounts()
      const results: PendingAccount[] = []
      for (const account of accounts) {
        try {
          const status = await api.trading.walletStatus(account.id)
          if (status.pendingMessage) {
            results.push({ account, status })
          }
        } catch { /* skip unreachable accounts */ }
      }
      setPending(results)
    } catch { /* ignore */ }
  }, [])

  // Poll every 3 seconds
  useEffect(() => {
    poll()
    const id = setInterval(poll, 3000)
    return () => clearInterval(id)
  }, [poll])

  const handlePush = useCallback(async (accountId: string) => {
    setPushing(accountId)
    setError(null)
    setResult(null)
    try {
      const data = await api.trading.walletPush(accountId)
      setResult({ accountId, data })
      // Refresh pending list
      await poll()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Push failed')
    } finally {
      setPushing(null)
    }
  }, [poll])

  // Nothing pending and no recent result — hide panel
  if (pending.length === 0 && !result) return null

  return (
    <div className="w-72 shrink-0 border-l border-border bg-bg-secondary/30 flex flex-col min-h-0">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-text">Pending Push</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {pending.map(({ account, status }) => (
          <div key={account.id} className="space-y-2">
            <div className="text-xs text-text-muted font-medium">{account.label || account.id}</div>

            {/* Commit message */}
            <div className="text-sm text-text font-medium px-2 py-1.5 rounded bg-bg-secondary border border-border">
              {status.pendingMessage}
            </div>

            {/* Operations */}
            <div className="space-y-1">
              {status.staged.map((op, i) => (
                <div key={i} className="text-xs text-text-muted px-2 py-1 rounded bg-bg/50">
                  {formatOp(op)}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handlePush(account.id)}
                disabled={pushing !== null}
                className="flex-1 text-xs px-3 py-1.5 rounded font-medium bg-accent text-white hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {pushing === account.id ? 'Pushing...' : 'Approve & Push'}
              </button>
            </div>
          </div>
        ))}

        {/* Result feedback */}
        {result && (
          <div className="space-y-1 pt-2 border-t border-border">
            <div className="text-xs font-medium text-text-muted">Last push</div>
            <div className="text-xs text-text">
              {result.data.submitted.length > 0 && (
                <span className="text-green-400">{result.data.submitted.length} submitted</span>
              )}
              {result.data.rejected.length > 0 && (
                <>
                  {result.data.submitted.length > 0 && ', '}
                  <span className="text-red-400">{result.data.rejected.length} rejected</span>
                </>
              )}
            </div>
            {result.data.rejected.map((r, i) => (
              <div key={i} className="text-xs text-red-400/80 px-2">{r.error || 'Unknown error'}</div>
            ))}
            <button
              onClick={() => setResult(null)}
              className="text-xs text-text-muted hover:text-text mt-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {error && (
          <div className="text-xs text-red-400 pt-2 border-t border-border">
            {error}
            <button onClick={() => setError(null)} className="ml-2 text-text-muted hover:text-text">Dismiss</button>
          </div>
        )}
      </div>
    </div>
  )
}
