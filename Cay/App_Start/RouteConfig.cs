using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Cay
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "about",
                url: "about",
                defaults: new { controller = "about", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "photo",
                url: "photo",
                defaults: new { controller = "photo", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "jiazi",
                url: "jiazi",
                defaults: new { controller = "jiazi", action = "Index", id = UrlParameter.Optional }
            );
            #region canvas小游戏
            routes.MapRoute(
                name: "NB",
                url: "nb",
                defaults: new { controller = "NB", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "air",
                url: "air",
                defaults: new { controller = "NB", action = "airplane", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "fish",
                url: "fish",
                defaults: new { controller = "NB", action = "fish", id = UrlParameter.Optional }
            );
            #endregion
            routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{id}",
            defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
        );
        }
    }
}
