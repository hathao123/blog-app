import React from 'react'

export default function useLoadingState() {
	const [loading, setLoading] = React.useState(false)

	function startLoading() {
		setLoading(true)
	}

	function stopLoading() {
		setLoading(false)
	}

	return { loading, startLoading, stopLoading }
}
