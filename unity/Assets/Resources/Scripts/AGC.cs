using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Huawei.Agconnect;
using Huawei.Agconnect.Auth;
using Huawei.Agconnect.CloudDB;
using Newtonsoft.Json;
using UnityEngine;
using Text = UnityEngine.UI.Text;

public class AGC : MonoBehaviour
{
    // Start is called before the first frame update

    AGConnectCloudDB CloudDB;
    private CloudDBZone _zone;
    [SerializeField] private GameObject scroll;
    [SerializeField] private Text userText;

    async void Start()
    {
        Stream inputStream = new MemoryStream(Resources.Load<TextAsset>("agconnect-services").bytes);
        AGConnectInstance.Initialize(new AGConnectOptionsBuilder()
            .SetInputStream(inputStream).SetPersistPath(new DirectoryInfo(Application.persistentDataPath)));
        CloudDB = AGConnectCloudDB.GetInstance(AGConnectInstance.Instance, AGConnectAuth.Instance);
        string json = Resources.Load<TextAsset>("UnityCloudDB").text;
        ObjectTypeInfo objectTypeInfo = JsonConvert.DeserializeObject<ObjectTypeInfo>(json);
        

        if (AGConnectAuth.Instance.GetCurrentUser() == null)
        {
           await SignIn();
        }
        userText.text += $" {AGConnectAuth.Instance.GetCurrentUser().GetUid()}";
        try
        {
            CloudDB.CreateObjectType(objectTypeInfo);
            Debug.Log("Schema Create Success");
        }
        catch (AGCAuthException ex)
        {
            Debug.LogError("Schema Create Failed: " + ex.ErrorMessage);
        }
        catch (System.Exception ex)
        {
            Debug.LogError("Schema Create Failed: " + ex.Message);
        }
    }

    async Task  SignIn()
    {
       await AGConnectAuth.Instance.SignInAnonymouslyAsync();
       
    }

    public async void OpenCloudDB()
    {
        try
        {
            Debug.Log("Try To Open Zone");
            _zone = await CloudDB.OpenCloudDBZone(new CloudDBZoneConfig("QuickStartDemo"));
            Debug.Log("Open Zone is Successful");
        }
        catch (AGCAuthException ex)
        {
            Debug.LogError("Open Zone Failed: " + ex.ErrorMessage);
        }
        catch (System.Exception ex)
        {
            Debug.LogError("Open Zone Failed: " + ex.Message);
        }
    }

    public async void ExecuteUpsert()
    {
        BookInfo info = new BookInfo
        {
            bookName = "test"
        };
        var result = await _zone.ExecuteUpsert(info);
        Debug.Log($"Upsert count{result}");
    }

    public async void ExecuteDelete()
    {
        BookInfo info = new BookInfo
        {
            bookName = "test"
        };
        var result = await _zone.ExecuteDelete(info);
        Debug.Log($"Delete count{result}");
    }

    public async void ExecuteQuery()
    {
        var result = await _zone.ExecuteQuery(CloudDBZoneQuery<BookInfo>.Where(typeof(BookInfo)));
        var pre = new GameObject("pre");
        var text=pre.AddComponent<Text>();
        text.resizeTextForBestFit = true;
        text.font=Font.CreateDynamicFontFromOSFont("Arial",34);
        text.color=Color.black;
        foreach (var book in result.GetSnapshotObjects())
        {
            var bookObj = Instantiate(pre, scroll.transform);
            bookObj.GetComponent<Text>().text = book.bookName;
        }

        Destroy(pre);
    }
}