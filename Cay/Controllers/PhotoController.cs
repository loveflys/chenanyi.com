using Cay.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cay.Controllers
{
    public class PhotoController : Controller
    {
        // GET: Photo
        public ActionResult Index()
        {
            List<Photo> model=Helper.DBHelper.SelectPhoto();
            return View(model);
        }
        public ActionResult Upload() {
            return View();
        }
        public string UploadImage() {
            var file=Request.Files[0];
            var title=Request.Params["title"];
            var type = Request.Params["type"];
            string path=Server.MapPath("~/Photo"+"\\");
            file.SaveAs(path+file.FileName);
            Random m=new Random();
            double temp = m.NextDouble();
            try
            {
                Helper.DBHelper.InsertPhoto(Convert.ToInt32(temp * 1000000), title, file.FileName, type);
                return "1";
            }catch(Exception e){
                return e.Message;
            } 
        }
    }
}