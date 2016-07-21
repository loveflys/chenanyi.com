using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cay.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string id)
        {
            //Helper.DBHelper.DeletePhoto("1001");
            //Helper.DBHelper.UpdateTable("MyPhoto", "ADD", "time CHAR(200)");
            //Helper.DBHelper.InsertPhoto(1001, "胡巴！！", "cay1.JPG", "life");
            //Helper.DBHelper.InsertPhoto(1002, "姥姥", "cay2.JPG", "life");
            //Helper.DBHelper.InsertPhoto(1003, "哇", "cay3.JPG", "life");
            //Helper.DBHelper.InsertPhoto(1004, "生擒小孩", "IMG1.JPG", "biye");
            //Helper.DBHelper.InsertPhoto(1005, "大宝来", "IMG2.JPG", "biye");
            //Helper.DBHelper.InsertPhoto(1006, "喔唷", "IMG3.JPG", "biye");
            //Helper.DBHelper.InsertPhoto(1007, "仨胖子", "IMG4.JPG", "biye");
            //Helper.DBHelper.InsertPhoto(1008, "哈士奇！", "IMG5.JPG", "life");
            //Helper.DBHelper.InsertPhoto(1009, "懒包子必备！", "NEW1.JPG", "life");
            //Helper.DBHelper.InsertPhoto(1010, "小智！", "NEW2.JPG", "life");
            //Helper.DBHelper.InsertPhoto(1011, "羞涩", "NEW3.JPG", "life");
            if (id != "ok")
            {
                bool mobileB = Request.Browser.IsMobileDevice;
                if (mobileB)
                {
                    return View("newWap");
                }
            }
            return View();
        }
        public ActionResult Index2()
        {
            return View();
        }
        public ActionResult Wap() {
            return View();
        }
        public ActionResult newWap()
        {
            return View();
        }
    }
}