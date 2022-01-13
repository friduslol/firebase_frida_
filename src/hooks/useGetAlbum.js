import useStreamDocument from './useStreamDocument'

const useGetAlbum = id => {
	return useStreamDocument("albums", id)
}

export default useGetAlbum
