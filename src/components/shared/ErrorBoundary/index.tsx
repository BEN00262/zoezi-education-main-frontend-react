import {ErrorBoundary} from 'react-error-boundary'

const ErrorFallback: React.FC<{
    error: Error,
    resetErrorBoundary: (...args: Array<unknown>) => void
}> = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}