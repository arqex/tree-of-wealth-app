import urlhub from "urlhub";
import pushStrategy from 'urlhub/pushStrategy';


let router;
export function injectUrlhub(urlhubRouter) {
	router = urlhubRouter;
}

export function getCurrentScreenComponents() {
	return router.location.matches;
}

export function getCurrentLocation() {
	return router.location;
}

export function createRouter(routes){
  const router = urlhub.create({strategy: pushStrategy});
  router.setRoutes(routes);
  router.start();
  return router;
}

export function getRouter(){
	return router;
}