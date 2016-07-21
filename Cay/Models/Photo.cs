using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cay.Models
{
    public class Photo
    {
            public int pId { set; get; }
            public string Title { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
            public DateTime time { get; set; }
    }
}