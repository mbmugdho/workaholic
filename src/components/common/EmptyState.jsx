export default function EmptyState({
  title = 'Nothing here yet',
  message,
  action,
}) {
  return (
    <div className="border rounded-lg bg-base-100 p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {message ? (
        <p className="text-sm text-base-content/70 mt-2">{message}</p>
      ) : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  )
}
