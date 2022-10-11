/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"3YU9sKmDzximwpiS","label":"socialmedia","bookmarks":[{"id":"wiSf8c4q9HUzqEAm","label":"twitter","url":"https://twitter.com/ekeoffline"},{"id":"8v1fBa7GwTEXgjfI","label":"youtube","url":"https://www.youtube.com/channel/UCXzc_rVljvSs1M4TelCYhog"},{"id":"ZmUcAZtOIZtUcDot","label":"github","url":"https://github.com/whyghost"}]},{"id":"UWREKhN3hhZ0XrSV","label":";)","bookmarks":[{"id":"T8NeT14Ts1rMBqbU","label":"my website","url":"https://whyghost.github.com"}]},{"id":"LwqpAfBuiU15Ycky","label":"surf","bookmarks":[{"id":"KohYj1CwH5eLt7yK","label":"youtube","url":"https://youtu.be"},{"id":"9wVkNU0jnjGOKFMm","label":"twitter","url":"https://m.twitter.com/explore"},{"id":"DStWIcXZ49ZLNKOy","label":"insta viewer","url":"https://www.pixwox.com/"},{"id":"OtsE17eCQm1qsOJU","label":"github","url":"https://github.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
