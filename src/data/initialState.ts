import { chunkContainer } from '../types/chunkContainer'

const pasteBoard: chunkContainer = {
  id: 'chunk-container-1',
  title: 'pasteboard',
  chunks: []
}

const line1: chunkContainer = {
  id: 'chunk-container-2',
  title: 'line-1',
  chunks: []
}

export const initialChunkContainers = {
  'chunk-container-1': pasteBoard,
  'chunk-container-2': line1
}

export const initialLineOrder = ['chunk-container-2']