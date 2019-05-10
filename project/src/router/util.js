
export function filterRouteByKey (routes = [], key = '') {
  let res = []
  routes.forEach(route => { 
      if (hasChild(route)){
        res = res.concat(filterRouteByKey(route.children, key))
      }
      if (isRouteHasKey(route, key)) {
        res.push(route.name)
      }
  })
  return res
}

export function isRouteHasKey (route = {}, key = '') {
  return route.meta && route.meta[key]
}

export function hasChild (item) {
  return item.children && item.children.length !== 0
}