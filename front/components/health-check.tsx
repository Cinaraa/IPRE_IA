'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function HealthCheck() {
  const [status, setStatus] = useState<string>('Not tested')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setStatus('Testing...')
    try {
      const response = await fetch('http://localhost:5000/api/health')
      if (response.ok) {
        setStatus('Connection successful!')
      } else {
        setStatus(`Connection failed: ${response.statusText}`)
      }
    } catch (error) {
      setStatus(`Connection error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Backend Connection Test</h3>
      <Button onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test Connection'}
      </Button>
      <p className="mt-2">{status}</p>
    </div>
  )
}