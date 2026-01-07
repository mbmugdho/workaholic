import { useState } from "react";

export default function GoogleSignIn({ onGoogle, loading }) {
  // Optional role selection for first-time Google users
  const [role, setRole] = useState("worker");

  return (
    <div className="space-y-3">
      <div className="form-control">
        <label className="label">
          <span className="label-text">If you are new, choose a role</span>
        </label>
        <select
          className="select select-bordered"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="worker">Worker</option>
          <option value="buyer">Buyer</option>
        </select>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={() => onGoogle({ role })}
        className="btn btn-outline w-full"
      >
        Continue with Google
      </button>
    </div>
  );
}