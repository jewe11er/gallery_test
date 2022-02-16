export type CardType = {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

export type CardsActionType = {type: 'filter' | 'full', payload: number | CardType[]}