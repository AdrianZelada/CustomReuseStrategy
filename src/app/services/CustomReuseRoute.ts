import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

import {log} from 'util';

export class CustomReuseStrategy implements RouteReuseStrategy {

  handlers: {[key: string]: DetachedRouteHandle} = {};

  /**
   * Se ejecuta cada vez que cambia una ruta, determina si se reutilizará la ruta, si el método retorna TRUE
   * los demas métodos no seran ejecutados, pero si retorna FALSE los demas métodos seran ejecutados.
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  /**
  * Cuando se sale de un ruta se llama a este método el cual si devuelve TRUE se ejecutara el método store()
  * */

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const pathArray = route.routeConfig.path.split('/');
    const path = pathArray[pathArray.length - 1];
    return path !== 'albums';
  }

  /**
  *   En este método realizamos el guardado de las instancias de las rutas que queremos reutilizar
  * */

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const path = this.replaceParams(route.routeConfig.path, route.params);
    this.handlers[path] = handle;
  }

  /**
  * Si ingresamos a una ruta este método se ejecutará y si devuelve TRUE se ejecutara el método retrieve()
  * */

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.replaceParams(route.routeConfig.path, route.params);
    return !!this.handlers[path];
  }

  /**
  *  Este método retornaria la instancia de la ruta guardada anteriormente, si la instancia no fue guardada retornara un valor NULL
  * */

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const path = this.replaceParams(route.routeConfig.path, route.params);
    return this.handlers[path];
  }

  private replaceParams(path: string, params: any = {}) {
    const keys = Object.keys(params);

    keys.forEach((key: string) => {
      const reg = new RegExp(`:${key}`);
      path = path.replace(reg, params[key]);
      console.log(path);
    });

    return path;
  }
}

// export declare abstract class RouteReuseStrategy {
//   /**
//    * Se ejecuta cada vez que cambia una ruta, determina si se reutilizará la ruta, si el método retorna TRUE
//    * los demas métodos no seran ejecutados, pero si retorna FALSE los demas métodos seran ejecutados.
//    */
//   abstract shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
//   /**
//    * Cuando se sale de un ruta se llama a este método el cual si devuelve TRUE se ejecutara el método store()
//    */
//   abstract shouldDetach(route: ActivatedRouteSnapshot): boolean;
//   /**
//    * En este método realizamos el guardado de las instancias de las rutas que queremos reutilizar
//    */
//   abstract store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void;
//   /**
//    * Si ingresamos a una ruta este método se ejecutará y si devuelve TRUE se ejecutara el método retrieve()
//    */
//   abstract shouldAttach(route: ActivatedRouteSnapshot): boolean;
//   /**
//    * Este método retornaria la instancia de la ruta guardada anteriormente, si la instancia no fue guardada retornara un valor NULL
//    */
//   abstract retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle;
//
// }
