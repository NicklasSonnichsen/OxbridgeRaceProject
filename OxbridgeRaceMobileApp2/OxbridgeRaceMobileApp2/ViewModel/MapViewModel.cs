using Newtonsoft.Json;
using OxbridgeRaceMobileApp2.Model;
using OxbridgeRaceMobileApp2.View;
using Plugin.Geolocator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Maps;

namespace OxbridgeRaceMobileApp2.ViewModel
{
   public class MapViewModel : BaseViewModel
    {
        private HttpClient client = new HttpClient();
        private const string URL = @"http://192.168.87.131:3000/gps";
      
        public MapViewModel()
        {
            Map = new Map();
            client = new HttpClient();
            GetCurrentLocation();

            
            //PositionChanged();
        }

        private bool isRunning = true;

        public bool IsRunning
        {
            get { return isRunning; }
            set { isRunning = value; }
        }

        public Pin pinNew = new Pin{ Label="Current Location" };

        public Map Map { get; private set; }
        
        private async void GetCurrentLocation()
        {   
            Map.Pins.Add(pinNew);
            while (IsRunning)
            {
              
                var locator = CrossGeolocator.Current;
                locator.DesiredAccuracy = 0.1;
                // sets position to the current location
                var position = await locator.GetPositionAsync(TimeSpan.FromSeconds(0.01));
                // moving the map to 
                Map.MoveToRegion(MapSpan.FromCenterAndRadius(new Position(position.Latitude, position.Longitude),
                                                             Distance.FromKilometers(0.05)));

                pinNew.Position = new Position(position.Latitude, position.Longitude);

                try
                {
                    string currentTime = DateTime.Now.ToString();
                    
                    var post = new GPSLocation { fld_CrewName = "testHold2", fld_Date = "2020-05-28", fld_Lattitude = position.Latitude, fld_Longitude = position.Longitude };
                    var requestString = JsonConvert.SerializeObject(post);
                    //var content = new StringContent(requestString, Encoding.UTF8, "application/json");
                    var content = new StringContent(requestString, Encoding.UTF8, "application/json");
                    Console.WriteLine("THIS IS CONTENT:  "+content);
                    var response =  await client.PostAsync(URL,content);
                    Console.WriteLine("THE JSON STRING:   " + requestString);
                    //var getResponse = await  client.GetAsync(URL);
                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine("Gps info was send to DB");
                    }
                    else
                    {
                        Console.WriteLine("Something went wrong");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error with sending to server:  "+e.Message);
                    
                }           
                await Task.Delay(1000);
            }
                        
         }

        public ICommand SimpleLogOut => new Command(async () => {

            // navigate to the next page after you have logged in 
            App.Current.MainPage = new LoginView();
            // setting IsRunnign to false so the geolacotor stops recording position
            IsRunning = false;

        });

       
    }
}
