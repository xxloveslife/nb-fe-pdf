import axios from 'axios'
import qs from 'qs'
// 写在公用方法中
export const downloadPdf = (blobData: Blob, downloadFileName: string) => {
  const link = document.createElement('a')
  const url = window.URL.createObjectURL(
    new Blob([blobData], { type: 'application/pdf,charset=utf-8' }),
  )
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', downloadFileName)
  document.body.appendChild(link)
  link.click()
}

export type OnDownloadProgress = () => void
export interface DownloadParam {
  pageRouter: string
  originUrl: string
  isServer?: boolean
  downloadFileName?: string
}

// 异步单个下载
export const asyncFetch = (params: object) => {
  return axios.get(`/asyncPrint?${qs.stringify(params)}`, {
    baseURL: '/pdf-server/api/pdf/v1',
    timeout: 300000,
  })
}

// 同步单个下载
export const downLoadPdfApi = (
  params: object,
  onDownloadProgress: OnDownloadProgress, // 可选
) => {
  return axios.get(`/syncDownload?${qs.stringify(params)}`, {
    baseURL: '/pdf-server/api/pdf/v1',
    timeout: 300000,
    responseType: 'blob', // 一定要加
    onDownloadProgress,
  })
}
export const formatFetchUrl = (originUrl: string, params: DownloadParam) => {
  return `${originUrl}${params.pageRouter}`
}
