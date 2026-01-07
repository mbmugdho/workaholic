import api from '../api/axios'

/**
 * Exchange Firebase ID token for server JWT + user record.
 * - idToken goes in Authorization header.
 * - role is optional (used only on first-time user creation).
 */
export async function exchangeFirebaseToken({ idToken, role }) {
  const res = await api.post(
    '/api/auth/exchange',
    { role },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  )

  return res.data // { success, token, user }
}

export async function getMe(serverToken) {
  const res = await api.get('/api/auth/me', {
    headers: { Authorization: `Bearer ${serverToken}` },
  })
  return res.data // { success, user }
}
