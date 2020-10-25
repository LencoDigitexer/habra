import Flow from './Flow'
import Hub from './HubObject'
import { User } from './User'

export default interface Post {
	id: string | number
	author: User
  commentsEnabled: boolean
	editorVersion: string
	flows: Flow[]
	hubs: Hub[]
	isCorporative: boolean
	isEditorial: boolean
	lang: 'ru' | 'en'
	leadData: {
		buttonTextHtml: string
		imageUrl: string | null
		textHtml: string
	}
	metadata: {
    metaDescription: string
    schemaJsonLd: string
		scriptUrls: string[]
		shareImageHeight: number
		shareImageWidth: number
		shareImageUrl: string
		stylesUrls: string[]
		vkShareImageUrl: string
	}
	polls: never[]
	postLabels: never[]
	postType: string
	statistics: {
    commentsCount: number
    favoritesCount: number
		readingCount: number
		score: number
		votesCount: number
	}
	tags: { titleHtml: string }[]
	textHtml: string
	timePublished: string
	titleHtml: string
	translationData: never
	votesEnabled: boolean
}
