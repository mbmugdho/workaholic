import { useMemo, useState } from "react";

function pickInitial(displayName, email) {
  const source = (displayName || email || "U").trim();
  return source.charAt(0).toUpperCase();
}

function pickColorClass(key) {
  // stable deterministic colors by hashing the key
  const colors = [
    "bg-primary text-primary-content",
    "bg-secondary text-secondary-content",
    "bg-accent text-accent-content",
    "bg-neutral text-neutral-content",
    "bg-info text-info-content",
    "bg-success text-success-content",
    "bg-warning text-warning-content",
    "bg-error text-error-content",
  ];

  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return colors[hash % colors.length];
}

export default function UserAvatar({ photoURL, displayName, email, size = 40 }) {
  const [imgError, setImgError] = useState(false);

  const initial = useMemo(() => pickInitial(displayName, email), [displayName, email]);
  const colorClass = useMemo(() => pickColorClass(email || displayName || "user"), [email, displayName]);

  const showImage = photoURL && !imgError;

  if (showImage) {
    return (
      <div className="avatar">
        <div className="rounded-full" style={{ width: size, height: size }}>
          <img
            src={photoURL}
            alt={displayName || email || "User"}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="avatar placeholder">
      <div className={`rounded-full ${colorClass}`} style={{ width: size, height: size }}>
        <span className="font-semibold">{initial}</span>
      </div>
    </div>
  );
}