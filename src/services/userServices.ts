import { API_URL } from '@/configs/api'
import { notFound } from 'next/navigation'

export async function getUser(id: number): Promise<User> {
	const res = await fetch(`${API_URL}/users/${id}`, {
		next: { revalidate: 60 }
	})

	if (!res.ok) {
		if (res.status === 404) notFound()
		throw new Error('Failed to fetch post')
	}

	return res.json()
}
