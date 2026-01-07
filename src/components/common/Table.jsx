export default function Table({ children }) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-base-100">
      <table className="table table-zebra">{children}</table>
    </div>
  )
}
