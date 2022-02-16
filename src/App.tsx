import * as React from 'react'
import axios from 'axios'

import { Pagination } from 'antd'
import Search from 'antd/lib/input/Search'
import Table from '@/components/Table'

import { CardType } from '@/types'

import { URL, PAGE_SIZE } from '@/constants'

import * as S from './App.style'

const App = (): JSX.Element => {
  const [ gallery, setGallery ] = React.useState<CardType[]>([])
  const [ filteredGallery, setFilteredGallery ] = React.useState<CardType[]>([])
  const [ currentPage, setCurrentPage ] = React.useState<number>(1)
  const [ album, setAlbum ] = React.useState<string>('')

  React.useEffect(() => {
    const getGallery = async () => {
      const response = await axios.get<CardType[]>(URL)
      setGallery(response.data)
    }

    // eslint-disable-next-line no-console
    getGallery().catch(console.error)
  }, [])
  
  React.useEffect(() => {
    const filtered = album ? gallery.filter(card => card.albumId === Number(album)) : gallery
    
    setFilteredGallery(filtered)
  }, [ album, currentPage, gallery ])
  
  const onSearch = (albumId: string) => {
    const trimmedAlbumId = albumId.trim()

    setAlbum(trimmedAlbumId)
  }

  const deleteCard = (id: number) => {
    setGallery(prevState => prevState.filter(card => card.id !== id))
  }

  return (
    <S.App>
      <Search
        placeholder="Filter by album ID"
        allowClear
        enterButton="Filter"
        size="large"
        onSearch={onSearch}
      />
      <Table gallery={filteredGallery.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)}  deleteCard={deleteCard}/>
      {!!filteredGallery.length && <Pagination current={currentPage} total={filteredGallery.length} defaultPageSize={PAGE_SIZE} onChange={setCurrentPage} showSizeChanger={false} />}
    </S.App>
  )
}

export default App
