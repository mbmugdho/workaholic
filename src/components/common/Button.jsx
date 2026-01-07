export default function Button({
  children,
  variant = 'primary', // primary | outline | ghost | neutral
  size = 'md', // xs | sm | md | lg
  className = '',
  type = 'button',
  disabled = false,
  onClick,
}) {
  const variantClass =
    variant === 'outline'
      ? 'btn-outline'
      : variant === 'ghost'
      ? 'btn-ghost'
      : variant === 'neutral'
      ? 'btn-neutral'
      : 'btn-primary'

  const sizeClass =
    size === 'xs'
      ? 'btn-xs'
      : size === 'sm'
      ? 'btn-sm'
      : size === 'lg'
      ? 'btn-lg'
      : ''

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </button>
  )
}
