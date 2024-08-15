import { Image, Flex, Spin } from 'antd'
import Masonry from 'react-masonry-css'
import styles from './styles.module.css' // 我们会创建一个最小化的 CSS 文件
import useSWR from 'swr'
import { getImgs } from '@/http'
import Loading from '@/components/Loading'
import ErrorResult from '@/components/result/error'
import { useCallback, useEffect, useState } from 'react'
import { t } from '@/i18n'
import { handleUrl } from '@/utils'

const IMAGES_PER_PAGE = 10

const PhotosView: React.FC = () => {
  const { data, error, isLoading } = useSWR('/api/imgs', getImgs)
  const [page, setPage] = useState(0)
  const [displayedImages, setDisplayedImages] = useState<string[]>([])

  const loadMoreImages = useCallback(() => {
    if (!data || data.length === 0) return
    const nextPage = page + 1
    const startIndex = page * IMAGES_PER_PAGE
    const endIndex = startIndex + IMAGES_PER_PAGE
    const newImages = data.slice(startIndex, endIndex)

    setDisplayedImages((prev) => [...prev, ...newImages])
    setPage(nextPage)
  }, [data, page])

  useEffect(() => {
    if (!data || data.length === 0) return
    if (displayedImages.length === 0) {
      setDisplayedImages(data.slice(0, IMAGES_PER_PAGE))
    }
    const handleScroll = () => {
      if (
        document.documentElement.scrollTop ===
          document.documentElement.scrollHeight -
            (document.documentElement.clientHeight ?? document.body.clientHeight) &&
        displayedImages.length < data.length
      ) {
        loadMoreImages()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayedImages, data, loadMoreImages])

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }

  if (isLoading) return <Loading />
  if (error || !data) return <ErrorResult />

  return (
    <div>
      <h1>{t`view.photos.title`}</h1>
      <Flex justify="center" wrap>
        <div className={styles.photoGallery}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.myMasonryGrid}
            columnClassName={styles.myMasonryGridColumn}
          >
            {displayedImages.map((img, index) => (
              <div key={Number(index.toString())} className="image-item">
                <Image src={`${new URL(handleUrl()).origin}/imgs/${img}`} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </Masonry>
          {displayedImages.length < data.length && (
            <div className="loading-more">
              <Spin />
            </div>
          )}
        </div>
      </Flex>
    </div>
  )
}

export default PhotosView
