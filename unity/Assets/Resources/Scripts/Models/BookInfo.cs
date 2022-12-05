using System;
using System.Collections;
using System.Collections.Generic;
using Huawei.Agconnect.CloudDB;
using UnityEngine;

public class BookInfo : CloudDBZoneObject
{
    public string id{ get; set; }

    public string author{ get; set; }

    public double price{ get; set; }

    public string publisher{ get; set; }

    public DateTime publishTime{ get; set; }

    public bool shadowFlag{ get; set; }

    public string bookName{ get; set; }

    public BookInfo() : base(typeof(BookInfo))
    {
        id = "1";
        publishTime=DateTime.Now;
    }
}
