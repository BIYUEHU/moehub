import config from '@/config'

export function handleUrl() {
  return config.url.startsWith('http')
    ? config.url
    : `${new URL(location.href).origin}${config.url.charAt(0) === '/' ? '' : '/'}${config.url}`
}
