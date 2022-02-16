import * as React from 'react'
import { Button, Card, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Meta from 'antd/lib/card/Meta'

import { CardType } from '@/types'

import * as S from './Table.style'

type Props = {
  gallery: CardType[]
  deleteCard: (id: number) => void
}

const Table = ({ gallery, deleteCard }: Props) => {
  const [ showedCard, setShowedCard ] = React.useState<CardType | null>(null)

  return (
    <>
      <S.Tabel>
        {gallery.length ? gallery.map(card => (
          <Card
            key={card.id}
            style={{ width: 300 }}
            cover={
              <img
                alt={card.title}
                src={card.thumbnailUrl}
                onClick={() => setShowedCard(card)}
              />
            }
            actions={[
              <DeleteOutlined key="delete" onClick={() => deleteCard(card.id)} />,
            ]}
          >
            <Meta
              title={card.title}
            />
          </Card>
        )) : <div>This album is empty</div>}
      </S.Tabel>
      <Modal 
        visible={!!showedCard} 
        title={showedCard?.title} 
        width={650} 
        footer={[
          <Button key="close" onClick={() => setShowedCard(null)}>
            Close
          </Button>,
        ]}
        onCancel={() => setShowedCard(null)}
      >
        <img src={showedCard?.url} alt={showedCard?.title} />
      </Modal>
    </>
  )
}

export default Table
