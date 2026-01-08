export default function RoleDropdown({ value, onChange, disabled }) {
  return (
    <select
      className="select select-bordered select-sm"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="worker">Worker</option>
      <option value="buyer">Buyer</option>
      <option value="admin">Admin</option>
    </select>
  )
}
