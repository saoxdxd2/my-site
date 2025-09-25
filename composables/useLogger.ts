/**
 * Centralized logging composable with error boundaries
 */

export interface LogLevel {
  DEBUG: 0
  INFO: 1
  WARN: 2
  ERROR: 3
}

export interface LogEntry {
  level: keyof LogLevel
  message: string
  timestamp: Date
  context?: Record<string, any>
  error?: Error
}

class Logger {
  private logs: LogEntry[] = []
  private maxLogs = 1000
  private logLevel: keyof LogLevel = 'INFO'

  constructor() {
    // Set log level based on environment
    if (process.dev) {
      this.logLevel = 'DEBUG'
    }
  }

  private shouldLog(level: keyof LogLevel): boolean {
    const levels: LogLevel = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 }
    return levels[level] >= levels[this.logLevel]
  }

  private addLog(level: keyof LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    if (!this.shouldLog(level)) return

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error
    }

    this.logs.push(logEntry)

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Console output in development
    if (process.dev) {
      const consoleMethod = level === 'ERROR' ? 'error' : 
                           level === 'WARN' ? 'warn' : 
                           level === 'DEBUG' ? 'debug' : 'log'
      
      console[consoleMethod](`[${level}] ${message}`, context || '', error || '')
    }

    // Send critical errors to monitoring service in production
    if (level === 'ERROR' && !process.dev) {
      this.sendToMonitoring(logEntry)
    }
  }

  private async sendToMonitoring(logEntry: LogEntry) {
    try {
      // In a real implementation, send to monitoring service like Sentry
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry)
      })
    } catch (error) {
      console.error('Failed to send log to monitoring:', error)
    }
  }

  debug(message: string, context?: Record<string, any>) {
    this.addLog('DEBUG', message, context)
  }

  info(message: string, context?: Record<string, any>) {
    this.addLog('INFO', message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.addLog('WARN', message, context)
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.addLog('ERROR', message, context, error)
  }

  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  clearLogs() {
    this.logs = []
  }
}

const logger = new Logger()

export const useLogger = () => {
  return {
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    getLogs: logger.getLogs.bind(logger),
    clearLogs: logger.clearLogs.bind(logger)
  }
}
